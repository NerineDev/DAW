# Documentación del proyecto

## Gestión de incidentes en tiempo real

## 1. Introducción

Este proyecto desarrolla una interfaz web para la gestión de incidentes en un centro de emergencias. La aplicación permite registrar nuevos incidentes desde un formulario, mostrar una lista dinámica de incidentes, diferenciar visualmente los incidentes activos y resueltos, cargar datos históricos desde un archivo XML y simular actualizaciones en tiempo real mediante una estructura basada en WebSockets.

El objetivo principal es aplicar mecanismos de comunicación asíncrona en el entorno cliente y trabajar con distintos formatos de datos, concretamente HTML, CSS, JSON y XML. Además, el código JavaScript está documentado con JSDoc y se incluyen pruebas unitarias y funcionales para comprobar el funcionamiento de las partes principales del proyecto.

## 2. Estructura del proyecto

El proyecto se organiza en varias carpetas para separar claramente la estructura HTML, los estilos, la lógica JavaScript, los datos externos y las pruebas.

```text
UD7_DWEC/
├── README.md
├── documentacion.md
├── index.html
├── css/
│   └── styles.css
├── data/
│   └── incidentes-historicos.xml
├── js/
│   └── app.js
└── tests/
    ├── tests.html
    └── tests.js
```

### Archivos principales

- `index.html`: contiene la estructura principal de la interfaz y el formulario para registrar incidentes.
- `css/styles.css`: define los estilos visuales de la aplicación y diferencia los incidentes activos de los resueltos.
- `js/app.js`: contiene la lógica principal de la aplicación.
- `data/incidentes-historicos.xml`: almacena incidentes históricos en formato XML.
- `tests/tests.html`: página desde la que se ejecutan las pruebas.
- `tests/tests.js`: archivo con las pruebas unitarias y funcionales.
- `README.md`: ofrece una explicación breve del proyecto para GitHub.
- `documentacion.md`: recoge una explicación más completa del desarrollo realizado.

## 3. Diseño de la interfaz

La interfaz está pensada para un panel de gestión de emergencias. Incluye una zona de formulario para registrar nuevos incidentes y una zona de listado donde se muestran los incidentes existentes.

El formulario permite introducir información básica del incidente, como el título, la ubicación, la prioridad, el estado y la descripción. Esta información se utiliza para crear un nuevo objeto de incidente dentro de la aplicación.

La lista de incidentes se actualiza dinámicamente mediante JavaScript. Cada incidente se representa como una tarjeta o bloque visual, de forma que el operador pueda consultar rápidamente su información principal.

## 4. Estilos CSS

El archivo `styles.css` define la apariencia general de la aplicación. Se utilizan estilos diferenciados para que los incidentes activos y resueltos sean fáciles de reconocer.

Los incidentes activos se destacan visualmente para indicar que todavía requieren atención. Los incidentes resueltos se muestran con un aspecto diferente, de forma que el usuario pueda distinguirlos rápidamente.

Esta separación visual mejora la usabilidad del panel, ya que en un contexto de emergencias es importante identificar de forma clara qué incidencias siguen pendientes y cuáles ya han sido gestionadas.

## 5. Registro de incidentes con JSON

Cuando el usuario completa el formulario y registra un nuevo incidente, JavaScript recoge los datos introducidos y crea un objeto con la información del incidente.

Después, ese objeto puede serializarse en formato JSON mediante `JSON.stringify()`. En una aplicación real, este JSON sería el formato adecuado para enviar los datos al servidor, ya que es ligero, fácil de leer y muy utilizado en aplicaciones web.

Ejemplo conceptual del formato JSON utilizado:

```json
{
  "id": 1,
  "title": "Accidente de tráfico",
  "location": "Avenida principal",
  "priority": "alta",
  "status": "activo",
  "description": "Colisión entre dos vehículos"
}
```

El uso de JSON permite representar los datos de forma estructurada y facilita la comunicación entre cliente y servidor.

## 6. Actualización dinámica mediante WebSockets

El proyecto incluye una estructura preparada para trabajar con WebSockets. Los WebSockets permiten mantener una conexión abierta entre el cliente y el servidor, de forma que el servidor pueda enviar información al navegador sin que el usuario tenga que recargar la página.

En un sistema real de emergencias, esto permitiría que varios operadores vieran los nuevos incidentes o los cambios de estado casi al instante.

En este caso práctico no se incluye un servidor backend real, por lo que el comportamiento WebSocket se simula localmente. Esta simulación permite demostrar el funcionamiento esperado desde el lado cliente sin depender de una infraestructura externa.

La interfaz muestra de forma clara que se está usando un modo de simulación WebSocket. Esto evita confusiones y deja claro que la lógica está preparada para una conexión real, aunque el proyecto presentado se centra en el entorno cliente.

## 7. Carga de incidentes históricos desde XML

La aplicación también permite cargar incidentes históricos desde un archivo XML externo. Para ello se utiliza `fetch()` para solicitar el archivo y `DOMParser` para convertir el texto XML en un documento que JavaScript pueda recorrer.

Este apartado demuestra el uso de un formato de datos distinto a JSON. XML sigue siendo habitual en integraciones con sistemas antiguos o externos, por lo que resulta útil conocer cómo leerlo y transformarlo desde JavaScript.

Ejemplo conceptual de un incidente en XML:

```xml
<incidente>
  <titulo>Incendio en vivienda</titulo>
  <ubicacion>Calle Norte</ubicacion>
  <prioridad>alta</prioridad>
  <estado>activo</estado>
  <descripcion>Aviso por humo en una vivienda.</descripcion>
</incidente>
```

Una vez procesados los datos XML, los incidentes se incorporan a la lista de la aplicación y se muestran en la interfaz igual que los incidentes registrados desde el formulario.

## 8. Documentación con JSDoc

Las funciones principales del archivo JavaScript están documentadas mediante JSDoc. Esta documentación permite explicar qué hace cada función, qué parámetros recibe y qué valor devuelve.

El uso de JSDoc mejora la legibilidad del código y facilita su mantenimiento. También ayuda a que otros desarrolladores puedan entender la lógica del proyecto con mayor rapidez.

Un ejemplo de documentación JSDoc sería:

```js
/**
 * Creates a new incident object using the provided form data.
 * @param {Object} formData - Data collected from the incident form.
 * @returns {Object} New incident object.
 */
```

En proyectos colaborativos, este tipo de documentación es especialmente útil porque reduce la dependencia de explicaciones externas y deja la información técnica junto al propio código.

## 9. Pruebas unitarias y funcionales

El proyecto incluye una página de pruebas formada por `tests/tests.html` y `tests/tests.js`.

Las pruebas comprueban distintas partes de la aplicación, entre ellas:

- creación correcta de incidentes;
- conversión de incidentes a JSON;
- procesamiento de datos XML;
- actualización de la lista de incidentes;
- cambio de estado entre activo y resuelto;
- representación visual de incidentes activos y resueltos.

Las pruebas unitarias se centran en funciones concretas del código. Las pruebas funcionales comprueban comportamientos más cercanos al uso real de la aplicación, como la actualización visual de la interfaz.

## 10. Ejecución del proyecto

Para ejecutar correctamente el proyecto se recomienda utilizar un servidor local. Esto es importante porque algunos navegadores bloquean la carga de archivos externos, como XML, cuando el HTML se abre directamente desde el sistema de archivos.

La forma recomendada de ejecución es mediante la extensión Live Server de Visual Studio Code.

Pasos:

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Ejecutar `index.html` con Live Server.
3. Registrar nuevos incidentes desde el formulario.
4. Cargar los incidentes históricos desde XML.
5. Abrir `tests/tests.html` con Live Server para ejecutar las pruebas.

## 11. Recursos consultados

Para desarrollar el proyecto se han utilizado los contenidos de la unidad y documentación técnica relacionada con las tecnologías aplicadas.

Recursos principales:

- MDN Web Docs: documentación sobre `fetch()`.
- MDN Web Docs: documentación sobre `WebSocket`.
- MDN Web Docs: documentación sobre `DOMParser`.
- Documentación oficial de JSDoc.
- Material de la unidad didáctica sobre comunicación asíncrona y formatos de datos.

## 12. Conclusión

Este proyecto demuestra cómo una aplicación web puede gestionar datos dinámicamente desde el lado cliente. La interfaz permite registrar nuevos incidentes, transformarlos a JSON, mostrar cambios en pantalla sin recargar la página y cargar información histórica desde XML.

Aunque el proyecto no incluye un servidor real, la simulación WebSocket permite representar el funcionamiento esperado en una aplicación de emergencias. En un entorno de producción, esta estructura podría conectarse a un servidor WebSocket real para compartir incidentes entre distintos operadores y equipos móviles en tiempo real.

La separación de archivos, el uso de comentarios, la documentación JSDoc y la inclusión de pruebas hacen que el proyecto sea más claro, mantenible y fácil de revisar.