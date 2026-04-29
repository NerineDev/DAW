# UD7 DWEC — Real-Time Incident Management / *Gestión de Incidentes en Tiempo Real*

## English

This project is a small front-end web application developed for the **Client-Side Web Development** module. It simulates a real-time incident management panel for emergency operators.

The application allows users to:

- register new incidents using a web form;
- serialize incident data in JSON format;
- display incidents dynamically in the interface;
- simulate real-time updates through a WebSocket-based structure;
- load historical incidents from an external XML file;
- mark incidents as active or resolved;
- run unit and functional tests from a dedicated test page.

The project focuses on asynchronous communication, DOM manipulation, data formats and code documentation using JSDoc.

## *Español*

*Este proyecto es una pequeña aplicación web front-end desarrollada para el módulo de **Desarrollo Web en Entorno Cliente**. Simula un panel de gestión de incidentes en tiempo real para operadores de emergencias.*

*La aplicación permite:*

- *registrar nuevos incidentes mediante un formulario web;*
- *serializar los datos de los incidentes en formato JSON;*
- *mostrar los incidentes dinámicamente en la interfaz;*
- *simular actualizaciones en tiempo real mediante una estructura basada en WebSockets;*
- *cargar incidentes históricos desde un archivo XML externo;*
-* marcar incidentes como activos o resueltos;*
- *ejecutar pruebas unitarias y funcionales desde una página específica.*

*El proyecto trabaja la comunicación asíncrona, la manipulación del DOM, el uso de distintos formatos de datos y la documentación del código mediante JSDoc.*

---

## Project structure / *Estructura del proyecto*

```text
UD7_DWEC/
├── README.md
├── documentacion.md (Español)
├── documentation.mc (English)
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
---

## Main files / *Archivos principales*

| File | Description |
|---|---|
| `index.html` | Main interface of the incident management panel. / *Interfaz principal del panel de gestión de incidentes.*|
| `css/styles.css` | Visual styles for the application, including active and resolved incident states. / *Estilos visuales para la aplicación, incluyendo estados de incidentes activos y resueltos.*|
| `js/app.js` | Main JavaScript logic: incident creation, JSON handling, WebSocket simulation, XML loading and DOM updates. / *Lógica principal de JavaScript: creación de incidentes, procesamiento de JSON, simulación de WebSocket, carga de XML y actualizaciones del DOM.*|
| `data/incidentes-historicos.xml` | External XML file used to load historical incidents. / *Archivo XML externo utilizado para cargar incidentes históricos.*|
| `tests/tests.html` | Page used to run the project tests. / *Esta página se utilizaba para ejecutar las pruebas del proyecto.*|
| `tests/tests.js` | Unit and functional tests. / *Pruebas unitarias y funcionales.*|

---

## Features / *Funcionalidades*

### JSON incident registration / *Registro de incidentes con JSON*

When the user submits the form, the application creates an incident object and serializes it using `JSON.stringify()`. In a real system, this JSON data would be sent to the server.

*Cuando el usuario envía el formulario, la aplicación crea un objeto de incidente y lo serializa mediante `JSON.stringify()`. En un sistema real, esos datos JSON se enviarían al servidor.*

### WebSocket-based real-time updates / Actualización en tiempo real basada en WebSockets

The application includes a WebSocket-oriented structure to represent how incidents would be received in real time. Since this is a front-end academic project without a real backend server, the WebSocket behavior is simulated locally.

*La aplicación incluye una estructura basada en WebSockets para representar cómo se recibirían incidentes en tiempo real. Como se trata de un proyecto académico front-end sin servidor backend real, el comportamiento WebSocket se simula localmente.*

### XML historical data loading / Carga de datos históricos en XML

Historical incidents are loaded from an XML file using `fetch()` and parsed with `DOMParser`.

*Los incidentes históricos se cargan desde un archivo XML mediante `fetch()` y se procesan con `DOMParser`.*

### Active and resolved states / Estados activo y resuelto

Incidents can be displayed as active or resolved. CSS classes are used to visually distinguish each state.

*Los incidentes pueden mostrarse como activos o resueltos. Se utilizan clases CSS para diferenciar visualmente cada estado.*

### Tests / Pruebas

The project includes unit and functional tests in the `tests` folder. These tests check incident creation, JSON conversion, XML parsing, status changes and visual rendering.

*El proyecto incluye pruebas unitarias y funcionales dentro de la carpeta `tests`. Estas pruebas comprueban la creación de incidentes, la conversión a JSON, el procesamiento de XML, los cambios de estado y la representación visual.*

---

## How to run / *Cómo ejecutar*

Because the project loads an external XML file, it should be opened through a local server.

Recommended option:

1. Open the project folder in Visual Studio Code.
2. Install or enable the Live Server extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. To run the tests, open `tests/tests.html` with Live Server.

*Debido a que el proyecto carga un archivo XML externo, se recomienda abrirlo mediante un servidor local.*

*Opción recomendada:*

*1. Abrir la carpeta del proyecto en Visual Studio Code.*
*2. Instalar o activar la extensión Live Server.*
*3. Hacer clic derecho sobre `index.html`.*
*4. Seleccionar **Open with Live Server**.*
*5. Para ejecutar las pruebas, abrir `tests/tests.html` con Live Server.*

---

## Technologies used / *Tecnologías utilizadas*

- HTML5
- CSS3
- JavaScript
- JSON
- XML
- WebSocket structure/simulation - *Estructura/simulación de WebSocket*
- AJAX with `fetch()`
- DOMParser
- JSDoc
- Unit and functional testing with plain JavaScript - *Pruebas unitarias y funcionales con JavaScript puro*

---

## Notes / *Notas*

This project does not include a real backend server. The WebSocket behavior is simulated locally to demonstrate how real-time updates would work in a client-side environment.

*Este proyecto no incluye un servidor backend real. El comportamiento WebSocket se simula localmente para demostrar cómo funcionarían las actualizaciones en tiempo real dentro del entorno cliente.*
