/**
 * @fileoverview Gestión del formulario con validación en tiempo real y envío asíncrono simulado.
 */

const formulario = document.getElementById('formulario-registro');
const mensajeFormulario = document.getElementById('mensaje-formulario');

const campos = {
    usuario: document.getElementById('usuario'),
    nombre: document.getElementById('nombre'),
    apellido: document.getElementById('apellido'),
    fechaNacimiento: document.getElementById('fecha-nacimiento'),
    codigoPais: document.getElementById('codigo-pais'),
    email: document.getElementById('email'),
    email2: document.getElementById('email2'),
    telefono: document.getElementById('telefono'),
    contrasena: document.getElementById('contrasena'),
    contrasena2: document.getElementById('contrasena2')
};

const nodosError = {
    usuario: document.getElementById('error-usuario'),
    nombre: document.getElementById('error-nombre'),
    apellido: document.getElementById('error-apellido'),
    fechaNacimiento: document.getElementById('error-fecha-nacimiento'),
    email: document.getElementById('error-email'),
    email2: document.getElementById('error-email2'),
    telefono: document.getElementById('error-telefono'),
    contrasena: document.getElementById('error-contrasena'),
    contrasena2: document.getElementById('error-contrasena2')
};

const mensajesError = {
    usuario: 'Debe tener al menos 5 caracteres y solo letras, números, "_" o ".".',
    nombre: 'Solo letras y primera letra en mayúscula.',
    apellido: 'Solo letras y primera letra en mayúscula.',
    fechaNacimiento: 'Debes ser mayor de 18 años para registrarte.',
    email: 'El correo no tiene un formato válido.',
    email2: 'Los correos no coinciden.',
    telefono: 'Con +34: 9 dígitos empezando por 6, 7, 8 o 9. Otros prefijos: 9 o 10 dígitos.',
    contrasena: 'Mínimo 8 caracteres con mayúscula, minúscula, número y símbolo.',
    contrasena2: 'Las contraseñas no coinciden.'
};

const clavesAlmacenamiento = {
    usuario: 'usuarioRegistro',
    nombre: 'nombreRegistro',
    apellido: 'apellidoRegistro',
    email: 'emailRegistro',
    telefono: 'telefonoRegistro'
};

// ****MEDIDA TEMPORAL DE PRUEBAS: SIMULAR USUARIOS/CORREOS YA REGISTRADOS SOLO EN FRONTEND.****
// En el proyecto final lo sustituiré por validación real en backend + base de datos.
const CLAVE_REGISTROS_SIMULADOS = 'registrosSimulados';

const interruptores = {
    contrasena1: document.getElementById('ver-contrasena'),
    contrasena2: document.getElementById('ver-contrasena2')
};

/**
 * Obtener el listado de registros simulados para comprobaciones de duplicidad.
 * @returns {Array<{usuario:string,email:string,telefono:string}>} Registros simulados almacenados.
 */
function obtenerRegistrosSimulados() {
    const texto = localStorage.getItem(CLAVE_REGISTROS_SIMULADOS);

    if (!texto) {
        return [];
    }

    try {
        const datos = JSON.parse(texto);
        return Array.isArray(datos) ? datos : [];
    } catch {
        return [];
    }
}

/**
 * Guardar un nuevo registro simulado para futuras comprobaciones de duplicidad.
 * @param {{usuario:string,email:string,telefono:string}} registro Registro a persistir.
 */
function guardarRegistroSimulado(registro) {
    const registros = obtenerRegistrosSimulados();
    const telefonoNormalizado = validadores.normalizarTelefono(String(registro.telefono || '').trim());

    registros.push({
        usuario: String(registro.usuario || '').trim().toLowerCase(),
        email: String(registro.email || '').trim().toLowerCase(),
        telefono: telefonoNormalizado
    });
    localStorage.setItem(CLAVE_REGISTROS_SIMULADOS, JSON.stringify(registros));
}

/**
 * Comprobar si el usuario ya existe en el registro simulado.
 * @param {string} usuario Usuario a comprobar.
 * @returns {boolean} `true` si el usuario ya existe.
 */
function existeUsuarioSimulado(usuario) {
    const usuarioNormalizado = String(usuario).trim().toLowerCase();
    return obtenerRegistrosSimulados().some((registro) => registro.usuario === usuarioNormalizado);
}

/**
 * Comprobar si el correo ya existe en el registro simulado.
 * @param {string} email Correo a comprobar.
 * @returns {boolean} `true` si el correo ya existe.
 */
function existeEmailSimulado(email) {
    const emailNormalizado = String(email).trim().toLowerCase();
    return obtenerRegistrosSimulados().some((registro) => registro.email === emailNormalizado);
}

/**
 * Comprobar si el teléfono ya existe en el registro simulado.
 * @param {string} telefono Teléfono a comprobar.
 * @returns {boolean} `true` si el teléfono ya existe.
 */
function existeTelefonoSimulado(telefono) {
    const telefonoNormalizado = validadores.normalizarTelefono(String(telefono).trim());
    return obtenerRegistrosSimulados().some((registro) => registro.telefono === telefonoNormalizado);
}

/**
 * Validar un campo según su regla.
 * @param {'usuario'|'nombre'|'apellido'|'fechaNacimiento'|'codigoPais'|'email'|'email2'|'telefono'|'contrasena'|'contrasena2'} clave Clave del campo a validar.
 * @returns {boolean} `true` si el campo es válido.
 */
function validarCampo(clave) {
    const campo = campos[clave];
    if (!campo) {
        return false;
    }

    const valor = campo.value.trim();

    let esValido = false;
    let mensaje = mensajesError[clave];

    switch (clave) {
    case 'usuario':
        esValido = validadores.esUsuarioValido(valor);
        if (!valor) {
            mensaje = 'Este campo es obligatorio.';
        } else if (esValido && existeUsuarioSimulado(valor)) {
            esValido = false;
            mensaje = 'Este nombre de usuario ya está en uso.'; //simulación local de duplicidad. 
        }
        break;
    case 'nombre':
        esValido = validadores.esPalabraPersonaValida(valor);
        if (!valor) {
            mensaje = 'Este campo es obligatorio.';
        }
        break;
    case 'apellido':
        esValido = validadores.esPalabraPersonaValida(valor);
        if (!valor) {
            mensaje = 'Este campo es obligatorio.';
        }
        break;
    case 'fechaNacimiento':
        if (!valor) {
            esValido = false;
            mensaje = 'La fecha de nacimiento es obligatoria.';
        } else {
            esValido = validadores.esFechaMayorDeEdad(valor);
            mensaje = esValido ? '' : 'Debes ser mayor de 18 años para registrarte.';
        }
        break;
    case 'codigoPais':
        esValido = Boolean(valor);
        if (!esValido) {
            mensaje = 'Debes seleccionar un código de país.';
        }
        break;
    case 'email':
        esValido = validadores.esCorreoValido(valor);
        if (!valor) {
            mensaje = 'Este campo es obligatorio.';
        } else if (esValido && existeEmailSimulado(valor)) {
            esValido = false;
            mensaje = 'Este correo electrónico ya está en uso.'; //simulación local de duplicidad. 
        }
        break;
    case 'email2':
        if (!valor) {
            esValido = false;
            mensaje = 'Debes repetir el correo electrónico.';
        } else if (!validadores.esCorreoValido(valor)) {
            esValido = false;
            mensaje = 'El correo repetido no tiene un formato válido.';
        } else {
            esValido = validadores.sonValoresIguales(valor, campos.email.value);
            mensaje = esValido ? '' : 'Los correos no coinciden.';
        }
        break;
    case 'telefono':
        esValido = validadores.esTelefonoPorCodigo(campos.codigoPais.value, valor);
        if (!valor) {
            mensaje = 'Este campo es obligatorio.';
        } else if (!campos.codigoPais.value) {
            mensaje = 'Debes seleccionar un código de país.';
        } else if (esValido && existeTelefonoSimulado(valor)) {
            esValido = false;
            mensaje = 'Este número de teléfono ya está en uso.'; //simulación local de duplicidad.
        } else if (!esValido && campos.codigoPais.value === '+34') {
            mensaje = 'El número debe tener 9 dígitos y empezar por 6, 7, 8 o 9.';
        } else if (!esValido) {
            mensaje = 'El número debe tener 9 o 10 dígitos.';
        }
        break;
    case 'contrasena':
        esValido = validadores.esContrasenaValida(valor);
        if (!valor) {
            mensaje = 'Este campo es obligatorio.';
        }
        break;
    case 'contrasena2':
        if (!valor) {
            esValido = false;
            mensaje = 'Debes repetir la contraseña.';
        } else {
            esValido = validadores.sonValoresIguales(valor, campos.contrasena.value);
            mensaje = esValido ? '' : 'Las contraseñas no coinciden.';
        }
        break;
    default:
        esValido = false;
    }

    const nodoError = nodosError[clave];
    if (nodoError) {
        nodoError.textContent = esValido ? '' : mensaje;
    }
    campo.classList.toggle('entrada-error', !esValido);

    return esValido;
}

/**
 * Simular un envío asíncrono con Promesa (estilo Fetch API).
 * @param {{usuario:string,nombre:string,apellido:string,fechaNacimiento:string,email:string,email2:string,telefono:string,contrasena:string,contrasena2:string}} datosFormulario Datos del formulario.
 * @returns {Promise<{ok:boolean}>} Resultado del envío simulado.
 */
function enviarConFetchSimulado(datosFormulario) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('ultimoRegistro', JSON.stringify({
                ...datosFormulario,
                date: new Date().toISOString()
            }));
            resolve({ ok: true });
        }, 500);
    });
}

/**
 * Recuperar datos no sensibles guardados previamente.
 */
function precargarDesdeAlmacenamiento() {
    Object.entries(clavesAlmacenamiento).forEach(([claveCampo, claveGuardado]) => {
        const valorGuardado = localStorage.getItem(claveGuardado);
        if (valorGuardado && campos[claveCampo]) {
            campos[claveCampo].value = valorGuardado;
        }
    });
}

/**
 * Configurar los toggles para mostrar/ocultar contraseñas.
 */
function inicializarInterruptoresContrasena() {
    if (interruptores.contrasena1 && campos.contrasena) {
        interruptores.contrasena1.addEventListener('change', function () {
            campos.contrasena.type = this.checked ? 'text' : 'password';
        });
    }

    if (interruptores.contrasena2 && campos.contrasena2) {
        interruptores.contrasena2.addEventListener('change', function () {
            campos.contrasena2.type = this.checked ? 'text' : 'password';
        });
    }
}

/**
 * Inicializar listeners del formulario.
 */
function inicializarFormulario() {
    precargarDesdeAlmacenamiento();
    inicializarInterruptoresContrasena();

    Object.keys(campos).forEach((clave) => {
        const campo = campos[clave];

        if (!campo) {
            return;
        }

        campo.addEventListener('input', () => {
            validarCampo(clave);

            if (clave === 'email') {
                validarCampo('email2');
            }

            if (clave === 'codigoPais') {
                validarCampo('telefono');
            }

            if (clave === 'contrasena') {
                validarCampo('contrasena2');
            }
        });

        campo.addEventListener('focus', () => {
            campo.classList.add('entrada-enfocada');
        });

        campo.addEventListener('blur', () => {
            campo.classList.remove('entrada-enfocada');
            validarCampo(clave);
        });
    });

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const claves = Object.keys(campos);
        const formularioValido = claves.every((clave) => validarCampo(clave));

        if (!formularioValido) {
            mensajeFormulario.textContent = 'Corrige los errores antes de enviar el formulario.';
            mensajeFormulario.classList.remove('mensaje-exito');
            mensajeFormulario.classList.add('mensaje-error');
            return;
        }

        const datosEnvio = {
            usuario: campos.usuario.value.trim(),
            nombre: campos.nombre.value.trim(),
            apellido: campos.apellido.value.trim(),
            fechaNacimiento: campos.fechaNacimiento.value,
            codigoPais: campos.codigoPais.value,
            email: campos.email.value.trim(),
            email2: campos.email2.value.trim(),
            telefono: campos.telefono.value.trim(),
            contrasena: campos.contrasena.value,
            contrasena2: campos.contrasena2.value
        };

        const respuesta = await enviarConFetchSimulado(datosEnvio);

        if (respuesta.ok) {
            guardarRegistroSimulado({
                usuario: datosEnvio.usuario,
                email: datosEnvio.email,
                telefono: datosEnvio.telefono
            });

            localStorage.setItem(clavesAlmacenamiento.usuario, datosEnvio.usuario);
            localStorage.setItem(clavesAlmacenamiento.nombre, datosEnvio.nombre);
            localStorage.setItem(clavesAlmacenamiento.apellido, datosEnvio.apellido);
            localStorage.setItem(clavesAlmacenamiento.email, datosEnvio.email);
            localStorage.setItem(clavesAlmacenamiento.telefono, datosEnvio.telefono);

            mensajeFormulario.textContent = 'Registro enviado correctamente (modo asíncrono simulado). Redirigiendo...';
            mensajeFormulario.classList.remove('mensaje-error');
            mensajeFormulario.classList.add('mensaje-exito');
            formulario.reset();

            Object.values(clavesAlmacenamiento).forEach((claveGuardado) => {
                localStorage.removeItem(claveGuardado);
            });

            setTimeout(() => {
                window.location.href = window.location.pathname;
            }, 900);
        }
    });
}

inicializarFormulario();
