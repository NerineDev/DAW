/**
 * @fileoverview Funciones de validación reutilizables para el formulario de inscripción.
 * Las funciones se usan tanto en navegador como en pruebas unitarias (Jest).
 */
(function (globalScope) {
    const PATRONES = {
        usuario: /^[a-zA-Z0-9_.]+$/,
        palabraPersona: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?: [A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)*$/,
        nombreCompleto: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/,
        correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        telefonoInterno: /^[0-9\s-]+$/,
        contrasena: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/
    };

    /**
     * Normaliza un número de teléfono eliminando separadores visuales.
     * @param {string} telefono Número introducido por la persona usuaria.
     * @returns {string} Teléfono solo con dígitos.
     */
    function normalizarTelefono(telefono) {
        return String(telefono).replace(/[\s-]/g, '');
    }

    /**
     * Comprueba si un nombre de usuario cumple el formato requerido.
     * Debe tener al menos 5 caracteres y no contener espacios.
     * @param {string} value Nombre de usuario.
     * @returns {boolean} `true` si es válido.
     */
    function esUsuarioValido(value) {
        const valorNormalizado = String(value).trim();
        return valorNormalizado.length >= 5 && PATRONES.usuario.test(valorNormalizado) && !valorNormalizado.includes(' ');
    }

    /**
     * Comprueba si un nombre o apellido está en formato correcto.
     * @param {string} value Nombre o apellido.
     * @returns {boolean} `true` si empieza por mayúscula y contiene solo letras.
     */
    function esPalabraPersonaValida(value) {
        return PATRONES.palabraPersona.test(String(value).trim());
    }

    /**
     * Comprueba si un nombre completo es válido.
     * @param {string} value Nombre introducido por la persona usuaria.
     * @returns {boolean} `true` si tiene al menos dos palabras y solo contiene letras.
     */
    function esNombreCompletoValido(value) {
        return PATRONES.nombreCompleto.test(String(value).trim());
    }

    /**
     * Comprueba si un email tiene formato válido.
     * @param {string} value Correo introducido por la persona usuaria.
     * @returns {boolean} `true` si cumple el formato de email.
     */
    function esCorreoValido(value) {
        return PATRONES.correo.test(String(value).trim());
    }

     /**
      * Comprueba si un teléfono está en formato internacional español.
      * Ejemplos válidos: `+34 600123456`, `+34 600-123-456`, `+34 712 345 678`, `+34 912345678`.
      * Esta validación comprueba el formato y el bloque inicial español (6, 7, 8 o 9),
      * pero no puede verificar la asignación real del número sin backend o servicio externo.
      * @param {string} value Teléfono introducido por la persona usuaria.
      * @returns {boolean} `true` si cumple el patrón solicitado.
      */

    function esTelefonoValido(value) {
        const texto = String(value || '').trim();
        const coincidencia = texto.match(/^\+34\s?(.*)$/);

        if (!coincidencia) {
            return false;
        }

        return esTelefonoPorCodigo('+34', coincidencia[1]);
    }

    /**
     * Valida un teléfono en función del prefijo internacional seleccionado.
     * - Si el prefijo es +34, aplica reglas españolas (inicio 6/7/8/9 y 9 dígitos).
     * - Para otros prefijos, aplica validación genérica de 9 o 10 dígitos.
     * @param {string} codigoPais Prefijo internacional (por ejemplo, +34).
     * @param {string} telefono Número nacional sin prefijo.
     * @returns {boolean} `true` si el número cumple la regla correspondiente.
     */
    function esTelefonoPorCodigo(codigoPais, telefono) {
        const codigo = String(codigoPais || '').trim();
        const valor = String(telefono || '').trim();

        if (!codigo || !valor || !PATRONES.telefonoInterno.test(valor)) {
            return false;
        }

        const telefonoNormalizado = normalizarTelefono(valor);

        if (codigo === '+34') {
            return /^[6789]\d{8}$/.test(telefonoNormalizado);
        }

        return /^\d{9,10}$/.test(telefonoNormalizado);
    }

    /**
     * Comprueba la fortaleza de una contraseña.
     * Requisitos: 8+ caracteres, mayúscula, minúscula, número y carácter especial.
     * @param {string} value Contraseña introducida por la persona usuaria.
     * @returns {boolean} `true` si cumple todos los requisitos de seguridad.
     */
    function esContrasenaValida(value) {
        return PATRONES.contrasena.test(String(value));
    }

    /**
     * Comprueba si la persona usuaria es mayor de edad (18+).
     * @param {string} value Fecha en formato yyyy-mm-dd.
     * @returns {boolean} `true` si la fecha es válida y la edad es mayor o igual a 18.
     */
    function esFechaMayorDeEdad(value) {
        if (!value) {
            return false;
        }

        const fechaNacimiento = new Date(value);
        if (Number.isNaN(fechaNacimiento.getTime())) {
            return false;
        }

        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const diferenciaMes = hoy.getMonth() - fechaNacimiento.getMonth();

        if (diferenciaMes < 0 || (diferenciaMes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
            edad -= 1;
        }

        return edad >= 18;
    }

    /**
     * Comprueba si dos valores son iguales tras normalizar espacios laterales.
     * @param {string} izquierda Primer valor.
     * @param {string} derecha Segundo valor.
     * @returns {boolean} `true` si ambos valores coinciden.
     */
    function sonValoresIguales(izquierda, derecha) {
        return String(izquierda).trim() === String(derecha).trim();
    }

    const api = {
        PATRONES,
        normalizarTelefono,
        esUsuarioValido,
        esPalabraPersonaValida,
        esNombreCompletoValido,
        esCorreoValido,
        esTelefonoValido,
        esTelefonoPorCodigo,
        esContrasenaValida,
        esFechaMayorDeEdad,
        sonValoresIguales
    };

    /* istanbul ignore next: esta parte cambia según el entorno (Node o navegador) */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    globalScope.validadores = api;
})(globalThis);
