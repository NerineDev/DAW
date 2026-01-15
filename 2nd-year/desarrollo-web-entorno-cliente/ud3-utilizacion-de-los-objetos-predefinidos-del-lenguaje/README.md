# DWEC - UD 3
## UTILIZACIÓN DE LOS OBJETOS PREDEFINIDOS DEL LENGUAJE

## CASO PRÁCTICO 1
### INTERACCIÓN DINÁMICA CON LA PÁGINA WEB Y EL USUARIO USANDO OBJETOS PREDEFINIDOS DE JAVASCRIPT

**Alumno/a:** Ana Vertedor 
**Fecha:** 15/01/2026


Para cumplir con los requerimientos de la tarea, he desarrollado una página web que implementa un formulario de registro de usuarios. 
La página permite introducir datos, validarlos en el lado del cliente y mostrar mensajes informativos sin necesidad de recargarla.

Además, he utilizado objetos predefinidos de JavaScript para gestionar eventos, almacenar información en el navegador y facilitar la depuración del código.


### Funcionalidades principales

- Validación de campos obligatorios.
- Validación del nombre de usuario mediante longitud mínima y expresión regular.
- Validación de nombre y apellido con formato correcto (mayúscula inicial).
- Validación de contraseñas:
  - Formato seguro mediante expresión regular.
  - Comprobación de coincidencia entre ambas contraseñas.
- Validación de edad (mayor de 18 años) usando el objeto `Date`.
- Validación de correo electrónico y confirmación del mismo.
- Visualización de errores de forma individual junto a cada campo.
- Resaltado visual de campos con errores mediante CSS.
- Mostrar / ocultar contraseña mediante checkbox (mejora de usabilidad).


### Uso de JavaScript

- Manejo de eventos del DOM (`submit`, `change`).
- Uso del objeto `Date` para el cálculo de edad y registro de fecha.
- Uso de `localStorage` para:
  - Guardar datos del usuario tras el registro.
  - Recuperar datos al recargar la página.
- Uso de `console.log` para depuración y trazabilidad.
- Simulación del envío correcto del formulario.


### Estructura del proyecto

- `index.html` → estructura del formulario.
- `styles.css` → estilos visuales y maquetación.
- `script.js` → lógica de validación y comportamiento del formulario.


### Observaciones

El envío del formulario es **simulado**, mostrando un mensaje de confirmación y redirigiendo a la misma página tras el registro correcto.

