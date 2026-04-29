(function () {
  'use strict';

  const results = [];
  const { IncidentApp } = window;

  function test(name, assertion) {
    try {
      assertion();
      results.push({ name, ok: true });
    } catch (error) {
      results.push({ name, ok: false, error: error.message });
    }
  }

  function assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  function renderResults() {
    const list = document.querySelector('#testResults');

    list.innerHTML = results.map((result) => `
      <li class="incident-card ${result.ok ? 'resolved' : ''}">
        <header>
          <h3>${result.ok ? 'OK' : 'FALLO'} - ${result.name}</h3>
          <span class="badge ${result.ok ? 'status-resolved' : 'status-active'}">
            ${result.ok ? 'superada' : 'revisar'}
          </span>
        </header>
        <p>${result.error || 'La comprobación se ejecutó correctamente.'}</p>
      </li>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    test('createIncident completa datos por defecto', () => {
      const incident = IncidentApp.createIncident({ title: 'Aviso médico' });

      assert(incident.title === 'Aviso médico', 'No respeta el título recibido.');
      assert(incident.status === 'activo', 'El estado por defecto debe ser activo.');
      assert(incident.priority === 'media', 'La prioridad por defecto debe ser media.');
    });

    test('serializeIncidentToJson genera JSON válido', () => {
      const incident = IncidentApp.createIncident({ title: 'Incendio', location: 'Centro' });
      const parsed = JSON.parse(IncidentApp.serializeIncidentToJson(incident));

      assert(parsed.title === 'Incendio', 'El JSON no conserva el título.');
      assert(parsed.location === 'Centro', 'El JSON no conserva la ubicación.');
    });

    test('parseIncidentsXml transforma XML en incidentes', () => {
      const xml = `
        <incidentes>
          <incidente>
            <id>x1</id>
            <titulo>Prueba XML</titulo>
            <ubicacion>Base Norte</ubicacion>
            <prioridad>alta</prioridad>
            <estado>resuelto</estado>
            <descripcion>Histórico importado</descripcion>
            <fecha>2026-04-28T12:00:00</fecha>
          </incidente>
        </incidentes>
      `;
      const documentXml = new DOMParser().parseFromString(xml, 'application/xml');
      const incidents = IncidentApp.parseIncidentsXml(documentXml);

      assert(incidents.length === 1, 'Debe importar un incidente.');
      assert(incidents[0].status === 'resuelto', 'Debe conservar el estado resuelto.');
    });

    test('upsertIncident evita duplicados y actualiza estado', () => {
      const collection = [];
      const active = IncidentApp.createIncident({ id: 'same-id', title: 'Activo' });
      const resolved = IncidentApp.createIncident({ id: 'same-id', title: 'Activo', status: 'resuelto' });

      IncidentApp.upsertIncident(collection, active);
      IncidentApp.upsertIncident(collection, resolved);

      assert(collection.length === 1, 'No debe duplicar incidentes con el mismo id.');
      assert(collection[0].status === 'resuelto', 'Debe actualizar el estado del incidente.');
    });

    test('toggleIncidentStatus permite cerrar y reabrir incidentes', () => {
      const collection = [IncidentApp.createIncident({ id: 'toggle-id', title: 'Cambio de estado' })];

      IncidentApp.toggleIncidentStatus(collection, 'toggle-id');
      assert(collection[0].status === 'resuelto', 'Debe marcar el incidente como resuelto.');

      IncidentApp.toggleIncidentStatus(collection, 'toggle-id');
      assert(collection[0].status === 'activo', 'Debe permitir reabrir el incidente.');
    });

    test('renderIncidents pinta activos y resueltos con clases diferentes', () => {
      const list = document.createElement('ul');
      const active = IncidentApp.createIncident({ id: 'a', title: 'Activo' });
      const resolved = IncidentApp.createIncident({ id: 'r', title: 'Resuelto', status: 'resuelto' });

      IncidentApp.renderIncidents([active, resolved], list);

      assert(list.querySelectorAll('.incident-card').length === 2, 'Debe pintar dos tarjetas.');
      assert(list.querySelectorAll('.incident-card.resolved').length === 1, 'Debe marcar una tarjeta resuelta.');
    });

    renderResults();
  });
})();
