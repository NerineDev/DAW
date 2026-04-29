(function (global) {
  'use strict';

  const INCIDENT_STATUS = {
    ACTIVE: 'activo',
    RESOLVED: 'resuelto'
  };

  const incidents = [];
  let socket = null;

  /**
   * Crea un identificador único sencillo para los incidentes nuevos.
   * @returns {string} Identificador con prefijo temporal.
   */
  function createIncidentId() {
    return `inc-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Normaliza los datos de un incidente y completa valores por defecto.
   * @param {Partial<Incident>} data Datos recibidos desde formulario, XML o WebSocket.
   * @returns {Incident} Incidente listo para mostrarse y enviarse como JSON.
   */
  function createIncident(data) {
    return {
      id: data.id || createIncidentId(),
      title: data.title || data.titulo || 'Incidente sin título',
      location: data.location || data.ubicacion || 'Ubicación no indicada',
      priority: data.priority || data.prioridad || 'media',
      status: data.status || data.estado || INCIDENT_STATUS.ACTIVE,
      description: data.description || data.descripcion || '',
      createdAt: data.createdAt || data.fecha || new Date().toISOString()
    };
  }

  /**
   * Convierte un incidente en JSON, formato habitual para enviar datos al servidor.
   * @param {Incident} incident Incidente que se quiere enviar.
   * @returns {string} Cadena JSON.
   */
  function serializeIncidentToJson(incident) {
    return JSON.stringify(incident);
  }

  /**
   * Inserta o actualiza un incidente dentro de una colección.
   * @param {Incident[]} collection Lista de incidentes.
   * @param {Incident} incident Incidente nuevo o actualizado.
   * @returns {Incident[]} La misma lista actualizada.
   */
  function upsertIncident(collection, incident) {
    const index = collection.findIndex((item) => item.id === incident.id);

    if (index >= 0) {
      collection[index] = incident;
      return collection;
    }

    collection.unshift(incident);
    return collection;
  }

  /**
   * Alterna el estado de un incidente entre activo y resuelto.
   * @param {Incident[]} collection Lista de incidentes.
   * @param {string} incidentId Identificador del incidente.
   * @returns {Incident|null} Incidente actualizado o null si no existe.
   */
  function toggleIncidentStatus(collection, incidentId) {
    const incident = collection.find((item) => item.id === incidentId);

    if (!incident) {
      return null;
    }

    incident.status = incident.status === INCIDENT_STATUS.RESOLVED
      ? INCIDENT_STATUS.ACTIVE
      : INCIDENT_STATUS.RESOLVED;

    return incident;
  }

  /**
   * Transforma un documento XML en una lista de incidentes.
   * @param {Document} xmlDocument Documento XML cargado mediante AJAX/fetch.
   * @returns {Incident[]} Lista de incidentes históricos.
   */
  function parseIncidentsXml(xmlDocument) {
    return Array.from(xmlDocument.querySelectorAll('incidente')).map((node) => createIncident({
      id: getNodeText(node, 'id'),
      title: getNodeText(node, 'titulo'),
      location: getNodeText(node, 'ubicacion'),
      priority: getNodeText(node, 'prioridad'),
      status: getNodeText(node, 'estado'),
      description: getNodeText(node, 'descripcion'),
      createdAt: getNodeText(node, 'fecha')
    }));
  }

  /**
   * Lee texto de un nodo hijo XML evitando errores si falta la etiqueta.
   * @param {Element} node Nodo padre.
   * @param {string} selector Nombre de la etiqueta hija.
   * @returns {string} Texto encontrado o cadena vacía.
   */
  function getNodeText(node, selector) {
    const child = node.querySelector(selector);
    return child ? child.textContent.trim() : '';
  }

  /**
   * Carga incidentes históricos desde un archivo XML externo mediante fetch.
   * @param {string} url Ruta del recurso XML.
   * @returns {Promise<Incident[]>} Incidentes importados.
   */
  async function loadHistoricalIncidents(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`No se pudo cargar el XML histórico: ${response.status}`);
    }

    const xmlText = await response.text();
    const xmlDocument = new DOMParser().parseFromString(xmlText, 'application/xml');

    return parseIncidentsXml(xmlDocument);
  }

  /**
   * Escapa texto antes de insertarlo en HTML para evitar inyección de contenido.
   * @param {string} value Texto original.
   * @returns {string} Texto seguro para HTML.
   */
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    })[char]);
  }

  /**
   * Pinta la lista de incidentes en la interfaz.
   * @param {Incident[]} collection Incidentes a mostrar.
   * @param {HTMLElement} listElement Elemento UL donde se dibuja la lista.
   * @returns {void}
   */
  function renderIncidents(collection, listElement) {
    if (!collection.length) {
      listElement.innerHTML = '<li class="empty-state">Todavía no hay incidentes registrados.</li>';
      return;
    }

    listElement.innerHTML = collection.map((incident) => {
      const isResolved = incident.status === INCIDENT_STATUS.RESOLVED;
      const statusClass = isResolved ? 'status-resolved' : 'status-active';
      const cardClass = isResolved ? 'incident-card resolved' : 'incident-card';

      return `
        <li class="${cardClass}" data-id="${escapeHtml(incident.id)}">
          <header>
            <h3>${escapeHtml(incident.title)}</h3>
            <span class="badge ${statusClass}">${escapeHtml(incident.status)}</span>
          </header>
          <p>${escapeHtml(incident.description || 'Sin descripción adicional.')}</p>
          <p class="incident-meta">
            <span>Ubicación: ${escapeHtml(incident.location)}</span>
            <span>Prioridad: ${escapeHtml(incident.priority)}</span>
            <span>Fecha: ${escapeHtml(formatDate(incident.createdAt))}</span>
          </p>
          <button class="status-button" type="button" data-action="toggle-status" data-id="${escapeHtml(incident.id)}">
            ${isResolved ? 'Reabrir incidente' : 'Marcar resuelto'}
          </button>
        </li>
      `;
    }).join('');
  }

  /**
   * Da formato legible a una fecha ISO.
   * @param {string} isoDate Fecha original.
   * @returns {string} Fecha formateada o texto original si no es válida.
   */
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    return Number.isNaN(date.getTime()) ? isoDate : date.toLocaleString('es-ES');
  }

  /**
   * Envía un incidente por WebSocket. Si no hay conexión real, simula la recepción.
   * @param {Incident} incident Incidente que se envía al servidor.
   * @param {(incident: Incident) => void} onIncoming Callback para actualizar la UI.
   * @returns {void}
   */
  function sendIncident(incident, onIncoming) {
    const message = serializeIncidentToJson(incident);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      return;
    }

    setTimeout(() => onIncoming(incident), 250);
  }

  /**
   * Inicializa el WebSocket que escucharía actualizaciones del servidor.
   * @param {(incident: Incident) => void} onIncoming Callback para eventos recibidos.
   * @param {HTMLElement} statusElement Elemento donde se muestra el estado de conexión.
   * @returns {void}
   */
  function initWebSocket(onIncoming, statusElement) {
    if (!('WebSocket' in global)) {
      statusElement.textContent = 'Modo simulación WebSocket';
      return;
    }

    try {
      socket = new WebSocket('ws://localhost:8080/incidentes');
    } catch (error) {
      statusElement.textContent = 'Modo simulación WebSocket';
      return;
    }

    socket.addEventListener('open', () => {
      statusElement.textContent = 'WebSocket conectado';
    });

    socket.addEventListener('message', (event) => {
      const incident = createIncident(JSON.parse(event.data));
      onIncoming(incident);
    });

    socket.addEventListener('close', () => {
      statusElement.textContent = 'Modo simulación WebSocket';
    });

    socket.addEventListener('error', () => {
      statusElement.textContent = 'Modo simulación WebSocket';
    });
  }

  /**
   * Conecta eventos del DOM con la lógica de incidentes.
   * @returns {void}
   */
  function initApp() {
    const form = document.querySelector('#incidentForm');
    const list = document.querySelector('#incidentList');
    const historyButton = document.querySelector('#loadHistoryButton');
    const status = document.querySelector('#connectionStatus');

    if (!form || !list || !historyButton || !status) {
      return;
    }

    const updateInterface = (incident) => {
      upsertIncident(incidents, incident);
      renderIncidents(incidents, list);
    };

    renderIncidents(incidents, list);
    initWebSocket(updateInterface, status);

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const incident = createIncident({
        title: formData.get('title'),
        location: formData.get('location'),
        priority: formData.get('priority'),
        description: formData.get('description')
      });

      sendIncident(incident, updateInterface);
      form.reset();
    });

    list.addEventListener('click', (event) => {
      const button = event.target.closest('[data-action="toggle-status"]');

      if (!button) {
        return;
      }

      const updatedIncident = toggleIncidentStatus(incidents, button.dataset.id);

      if (updatedIncident) {
        sendIncident(updatedIncident, updateInterface);
        renderIncidents(incidents, list);
      }
    });

    historyButton.addEventListener('click', async () => {
      historyButton.disabled = true;
      historyButton.textContent = 'Cargando...';

      try {
        const historicalIncidents = await loadHistoricalIncidents('data/incidentes-historicos.xml');
        historicalIncidents.forEach(updateInterface);
      } catch (error) {
        console.error(error.message);
      } finally {
        historyButton.disabled = false;
        historyButton.textContent = 'Cargar histórico';
      }
    });
  }

  global.IncidentApp = {
    INCIDENT_STATUS,
    createIncident,
    escapeHtml,
    loadHistoricalIncidents,
    parseIncidentsXml,
    renderIncidents,
    serializeIncidentToJson,
    toggleIncidentStatus,
    upsertIncident
  };

  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initApp);
  }
})(window);

/**
 * @typedef {Object} Incident
 * @property {string} id Identificador único.
 * @property {string} title Título visible del incidente.
 * @property {string} location Ubicación donde ocurre el incidente.
 * @property {string} priority Prioridad: alta, media o baja.
 * @property {string} status Estado: activo o resuelto.
 * @property {string} description Descripción operativa.
 * @property {string} createdAt Fecha de creación en formato ISO.
 */
