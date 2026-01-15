

/* =========================
   LOGICA DEL FORMULARIO
========================== */


// Uso del objeto Date
const fechaActual = new Date();

// Registro de fecha para depuración y trazabilidad
console.log("Fecha actual:", fechaActual);


// Guarda la fecha del registro para futuras referencias en el almacenamiento local del navegador (localStorage)
localStorage.setItem("ultimaVisita", fechaActual.toString());

// Recuperar datos almacenados (si existen)
document.addEventListener("DOMContentLoaded", function () {
    const emailGuardado = localStorage.getItem("emailRegistro");
    const usuarioGuardado = localStorage.getItem("usuarioRegistro");

    if (emailGuardado) {
        document.getElementById("email").value = emailGuardado;
    }

    if (usuarioGuardado) {
        document.getElementById("usuario").value = usuarioGuardado;
    }
});


// Mostrar / ocultar contraseñas (mejora de usabilidad)
const pass1 = document.getElementById('password');
const pass2 = document.getElementById('password2');

const toggle1 = document.getElementById('ver-pass');
const toggle2 = document.getElementById('ver-pass2');

if (toggle1 && pass1) {
    toggle1.addEventListener('change', function () {
        pass1.type = this.checked ? 'text' : 'password';
    });
}

if (toggle2 && pass2) {
    toggle2.addEventListener('change', function () {
        pass2.type = this.checked ? 'text' : 'password';
    });
}
// Manejo del envío del formulario

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let errores = [];

    /* =========================
       VALIDACIÓN USUARIO
    ========================== */
    
    // Comprobación nombre de usuario
    const usuarioInput = document.getElementById("usuario");
    const usuario = usuarioInput.value.trim();
    const errorUsuario = document.getElementById("error-usuario");

    // Reseteo de errores previos
    errorUsuario.innerText = "";
    usuarioInput.classList.remove("error-input");

    // Longitud mínima
    if (usuario.length < 5) {
        errores.push("Usuario demasiado corto");
        errorUsuario.innerText = "Debe tener al menos 5 caracteres";
        usuarioInput.classList.add("error-input");
    }
    else if (usuario.includes(" ")) {
        errores.push("Usuario con espacios");
        errorUsuario.innerText = "No puede contener espacios";
        usuarioInput.classList.add("error-input");
    }
    else {
        const patronUsuario = /^[a-zA-Z0-9_.]+$/;
    if (!patronUsuario.test(usuario)) {
        errores.push("Usuario con caracteres inválidos");
        errorUsuario.innerText = "Solo letras, números, '_' o '.'";
        usuarioInput.classList.add("error-input");
        }
    }
    

    // Validación nombre y apellido
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido");
    const errorNombre = document.getElementById("error-nombre");
    const errorApellido = document.getElementById("error-apellido");

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();

    // Reseteo de errores previos
    errorNombre.innerText = "";
    errorApellido.innerText = "";
    nombreInput.classList.remove("error-input");
    apellidoInput.classList.remove("error-input");

    // Patrón: palabras con mayúscula inicial separadas por espacios
    const patronNombre = /^[A-Z][a-z]+( [A-Z][a-z]+)*$/;

    if (!patronNombre.test(nombre)) {
        errores.push("Nombre inválido");
        errorNombre.innerText = "Solo letras, 1ª mayúscula";
        nombreInput.classList.add("error-input");
    }

    if (!patronNombre.test(apellido)) {
        errores.push("Apellido inválido");
        errorApellido.innerText = "Solo letras, 1ª mayúscula";
        apellidoInput.classList.add("error-input");
    }


    // Validación de contraseñas
    const passwordInput = document.getElementById("password");
    const password2Input = document.getElementById("password2");
    const errorPassword = document.getElementById("error-password");
    const errorPassword2 = document.getElementById("error-password2");

    const password = passwordInput.value;
    const password2 = password2Input.value;

    // Reseteo de errores previos
    errorPassword.innerText = "";
    errorPassword2.innerText = "";
    passwordInput.classList.remove("error-input");
    password2Input.classList.remove("error-input");

    // Formato de contraseña
    const patronPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!patronPassword.test(password)) {
        errores.push("Formato de contraseña inválido");
        errorPassword.innerText = "Mín. 8, mayúscula, minúscula, número y especial";
        passwordInput.classList.add("error-input");
    }

    // Las contraseñas deben coincidir
    if (password !== password2) {
        errores.push("Las contraseñas no coinciden");
        errorPassword2.innerText = "Las contraseñas no coinciden";
        password2Input.classList.add("error-input");
    }

    // Validación de edad (18+)
    const fechaNacimientoInput = document.getElementById("fecha-nacimiento");
    const errorFecha = document.getElementById("error-fecha-nacimiento");
    const fechaNacimiento = fechaNacimientoInput.value;

    // Reseteo de errores previos
    errorFecha.innerText = "";
    fechaNacimientoInput.classList.remove("error-input");

    if (!fechaNacimiento) {
        errores.push("Fecha de nacimiento vacía");
        errorFecha.innerText = "Este campo es obligatorio";
        fechaNacimientoInput.classList.add("error-input");
    } else {
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            errores.push("Menor de edad");
            errorFecha.innerText = "Debes ser mayor de 18 años para registrarte.";
            fechaNacimientoInput.classList.add("error-input");
        }
    }

    // Validación de correo electrónico
    const emailInput = document.getElementById("email");
    const email2Input = document.getElementById("email2");
    const errorEmail = document.getElementById("error-email");
    const errorEmail2 = document.getElementById("error-email2");

    const email = emailInput.value.trim();
    const email2 = email2Input.value.trim();
    
    // reset
    errorEmail.innerText = "";
    errorEmail2.innerText = "";
    emailInput.classList.remove("error-input");
    email2Input.classList.remove("error-input");

    // patrón básico de email (suficiente para el assignment)
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patronEmail.test(email)) {
        errores.push("Email inválido");
        errorEmail.innerText = "Formato de correo no válido";
        emailInput.classList.add("error-input");
    }

    if (email !== email2) {
        errores.push("Emails no coinciden");
        errorEmail2.innerText = "Los correos no coinciden";
        email2Input.classList.add("error-input");
    }

    // Mostrar errores o éxito
    if (errores.length > 0) {
        return;
    }

    // Guardar datos del registro en localStorage
    localStorage.setItem("emailRegistro", email);
    localStorage.setItem("usuarioRegistro", usuario);


    // Si todo es correcto:
    alert('¡Registro realizado con éxito!\nPor favor, revisa tu correo electrónico para validar tu cuenta.');
    document.getElementById('registerForm').reset();
    window.location.href = window.location.pathname;; // Recarga la página actual
    console.log("Formulario enviado correctamente (simulado)"); 

});
