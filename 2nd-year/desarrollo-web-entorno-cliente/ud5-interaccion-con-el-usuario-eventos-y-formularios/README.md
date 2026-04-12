# DWEC - UD5
## Validación de formularios web y documentación con JavaScript

**Alumno/a:** Ana Vertedor  
**Fecha:** 07/03/2026

## Descripción

Proyecto de formulario de inscripción para cursos online con validación en tiempo real usando JavaScript y expresiones regulares.

Se implementa:
- Validación básica HTML5 en correo y contraseña.
- Validación detallada en JavaScript para todos los campos del formulario.
- Gestión de eventos `submit`, `focus`, `blur` e `input`.
- Retroalimentación visual y mensajes de error por campo.
- Comprobaciones de coincidencia para correo y contraseña repetidos.
- Comprobación simulada de duplicidad para usuario, correo y teléfono en frontend (solo demo local).
- Verificación de mayoría de edad (18+) a partir de la fecha de nacimiento.
- Conservación temporal y recuperación de datos no sensibles con `localStorage` mientras la persona usuaria interactúa con el formulario.
- Pruebas unitarias con Jest.
- Documentación del código con JSDoc.

## Campos del formulario

- Nombre de usuario (`usuario`)
- Nombre (`nombre`)
- Apellido (`apellido`)
- Fecha de nacimiento (`fecha-nacimiento`)
- Correo electrónico (`email`)
- Repetición de correo electrónico (`email2`)
- Código de país (`codigo-pais`) mediante desplegable
- Teléfono internacional (`telefono`), ejemplo de formato: `600123456`
- Contraseña (`contrasena`)
- Repetición de contraseña (`contrasena2`)

## Reglas de validación (JavaScript + RegExp)

- **Usuario:** mínimo 5 caracteres, sin espacios, solo letras, números, `_` o `.`.
- **Nombre y apellido:** solo letras y primera letra en mayúscula.
- **Fecha de nacimiento:** la persona usuaria debe tener 18 años o más.
- **Correo:** patrón general de email válido.
- **Repetición de correo:** debe coincidir con el correo principal.
- **Duplicidad simulada:** usuario, correo y teléfono se validan contra un registro local de ejemplo.
- **Teléfono:** validación según código de país seleccionado.
	- Con `+34`: 9 dígitos, inicio en `6`, `7`, `8` o `9`.
	- Otros códigos: validación genérica de `9` o `10` dígitos.
	- Se admiten separadores visuales (`espacio` o `guion`).
- **Contraseña:** mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial.
- **Repetición de contraseña:** debe coincidir con la contraseña principal.

## Decisiones de implementación

- **Validación:** se combina la validación básica de HTML5 con validaciones más completas en JavaScript y retroalimentación en tiempo real.
- **Teléfono internacional:** se separa el código de país en un desplegable para reducir errores de entrada y hacer más clara la validación del número.
- **Envío del formulario:** se simula un envío asíncrono mediante una promesa, como aproximación a un flujo de trabajo con `fetch`.

## Estructura del proyecto

- `index.html` -> formulario y estructura principal.
- `styles.css` -> estilos visuales y estados de validación/foco.
- `validadores.js` -> funciones de validación reutilizables (con JSDoc).
- `script.js` -> eventos de formulario, validación en tiempo real y envío.
- `validadores.test.js` -> pruebas unitarias con Jest.

## Pruebas unitarias con Jest

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar tests:

```bash
npm test
```

Las pruebas comprueban los casos principales de éxito y error de las funciones de validación.

## Documentación JSDoc

La documentación se genera a partir de los comentarios incluidos en el código.

Para regenerarla:

```bash
npm run docs
```

Archivo principal generado: docs/index.html.

## Comandos de verificación 

Para comprobar el funcionamiento de las pruebas y de la documentación:

```bash
npm install
npm test
npm run docs
```

Con estos comandos se puede:

- ejecutar las pruebas unitarias con Jest
- generar la documentación con JSDoc en la carpeta docs/


## Observaciones

El envío del formulario es simulado. Al completarse correctamente, se muestra un mensaje de confirmación, se limpian los datos guardados temporalmente y el formulario vuelve a mostrarse en blanco.

La comprobación de duplicidad de usuario, correo y teléfono también es simulada en frontend mediante datos locales de ejemplo.

La validación internacional fuera de +34 se resuelve mediante una aproximación genérica de 9 o 10 dígitos, suficiente para el contexto de esta práctica.
