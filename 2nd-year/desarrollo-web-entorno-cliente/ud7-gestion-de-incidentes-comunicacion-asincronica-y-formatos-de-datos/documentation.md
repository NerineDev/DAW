# Project Documentation

## Real-Time Incident Management

## 1. Introduction

This project develops a web interface for managing incidents in an emergency response centre. The application allows operators to register new incidents through a form, display a dynamic list of incidents, visually distinguish active and resolved incidents, load historical data from an XML file, and simulate real-time updates through a WebSocket-based structure.

The main goal is to apply asynchronous communication mechanisms on the client side and work with different data formats, specifically HTML, CSS, JSON and XML. In addition, the JavaScript code is documented with JSDoc and the project includes unit and functional tests to check the behaviour of the main parts of the application.

## 2. Project Structure

The project is organised into several folders to clearly separate the HTML structure, visual styles, JavaScript logic, external data and tests.

```text
UD7_DWEC/
├── README.md
├── documentacion.md
├── documentation.md
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

### Main Files

- `index.html`: contains the main interface and the form used to register incidents.
- `css/styles.css`: defines the visual styles of the application and distinguishes active incidents from resolved ones.
- `js/app.js`: contains the main logic of the application.
- `data/incidentes-historicos.xml`: stores historical incidents in XML format.
- `tests/tests.html`: page used to run the tests.
- `tests/tests.js`: file containing the unit and functional tests.
- `README.md`: provides a short bilingual explanation of the project for GitHub.
- `documentacion.md`: contains the full Spanish documentation.
- `documentation.md`: contains the full English documentation.

## 3. Interface Design

The interface is designed as an emergency incident management panel. It includes a form area for registering new incidents and a list area where existing incidents are displayed.

The form allows the operator to enter basic incident information, such as title, location, priority, status and description. This information is then used to create a new incident object inside the application.

The incident list is updated dynamically using JavaScript. Each incident is represented as a visual card or block, allowing the operator to quickly review its main information.

## 4. CSS Styles

The `styles.css` file defines the overall appearance of the application. Different styles are used so that active and resolved incidents can be easily identified.

Active incidents are visually highlighted to show that they still require attention. Resolved incidents are displayed with a different appearance, allowing the user to quickly distinguish them from pending incidents.

This visual separation improves the usability of the panel, since in an emergency context it is important to clearly identify which incidents are still active and which ones have already been handled.

## 5. Incident Registration with JSON

When the user completes the form and registers a new incident, JavaScript collects the entered data and creates an object containing the incident information.

This object can then be serialized into JSON format using `JSON.stringify()`. In a real application, this JSON would be the appropriate format for sending the data to the server, because it is lightweight, easy to read and widely used in web applications.

Conceptual example of the JSON format used:

```json
{
  "id": 1,
  "title": "Traffic accident",
  "location": "Main Avenue",
  "priority": "high",
  "status": "active",
  "description": "Collision between two vehicles"
}
```

Using JSON allows the data to be represented in a structured way and makes communication between client and server easier.

## 6. Dynamic Updates with WebSockets

The project includes a structure prepared to work with WebSockets. WebSockets allow an open connection to be maintained between the client and the server, so the server can send information to the browser without requiring the user to reload the page.

In a real emergency system, this would allow several operators to see new incidents or status changes almost instantly.

This practical case does not include a real backend server, so the WebSocket behaviour is simulated locally. This simulation demonstrates the expected client-side behaviour without depending on external infrastructure.

The interface clearly shows that WebSocket simulation mode is being used. This avoids confusion and makes it clear that the logic is prepared for a real connection, even though the submitted project focuses on the client-side environment.

## 7. Loading Historical Incidents from XML

The application also allows historical incidents to be loaded from an external XML file. To do this, `fetch()` is used to request the file and `DOMParser` is used to convert the XML text into a document that JavaScript can process.

This section demonstrates the use of a data format different from JSON. XML is still common in integrations with older or external systems, so it is useful to know how to read and transform it from JavaScript.

Conceptual example of an incident in XML:

```xml
<incidente>
  <titulo>House fire</titulo>
  <ubicacion>North Street</ubicacion>
  <prioridad>high</prioridad>
  <estado>active</estado>
  <descripcion>Smoke warning in a residential building.</descripcion>
</incidente>
```

Once the XML data has been processed, the incidents are added to the application list and displayed in the interface in the same way as incidents registered through the form.

## 8. JSDoc Documentation

The main functions in the JavaScript file are documented using JSDoc. This documentation explains what each function does, what parameters it receives and what value it returns.

Using JSDoc improves code readability and makes maintenance easier. It also helps other developers understand the project logic more quickly.

An example of JSDoc documentation would be:

```js
/**
 * Creates a new incident object using the provided form data.
 * @param {Object} formData - Data collected from the incident form.
 * @returns {Object} New incident object.
 */
```

In collaborative projects, this type of documentation is especially useful because it reduces the need for external explanations and keeps the technical information close to the actual code.

## 9. Unit and Functional Tests

The project includes a testing page made up of `tests/tests.html` and `tests/tests.js`.

The tests check different parts of the application, including:

- correct incident creation;
- incident conversion to JSON;
- XML data processing;
- incident list updates;
- status changes between active and resolved;
- visual rendering of active and resolved incidents.

Unit tests focus on specific functions in the code. Functional tests check behaviours that are closer to real application usage, such as visual interface updates.

## 10. Running the Project

To run the project correctly, it is recommended to use a local server. This is important because some browsers block the loading of external files, such as XML files, when the HTML file is opened directly from the file system.

The recommended way to run the project is by using the Live Server extension in Visual Studio Code.

Steps:

1. Open the project folder in Visual Studio Code.
2. Run `index.html` with Live Server.
3. Register new incidents using the form.
4. Load the historical incidents from XML.
5. Open `tests/tests.html` with Live Server to run the tests.

## 11. Resources Consulted

The project was developed using the unit materials and technical documentation related to the technologies applied.

Main resources:

- MDN Web Docs: documentation about `fetch()`.
- MDN Web Docs: documentation about `WebSocket`.
- MDN Web Docs: documentation about `DOMParser`.
- Official JSDoc documentation.
- Unit material about asynchronous communication and data formats.

## 12. Conclusion

This project demonstrates how a web application can manage data dynamically on the client side. The interface allows users to register new incidents, transform them into JSON, display changes on screen without reloading the page and load historical information from XML.

Although the project does not include a real server, the WebSocket simulation represents the expected behaviour in an emergency application. In a production environment, this structure could be connected to a real WebSocket server to share incidents between different operators and mobile teams in real time.

The separation of files, use of comments, JSDoc documentation and inclusion of tests make the project clearer, more maintainable and easier to review.
