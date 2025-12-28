document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario_descuento");
    const resultado = document.getElementById("resultado_descuento");
    const Limpiar = document.getElementById("Limpiar"); 

    if (!formulario || !resultado || !Limpiar) return;

    formulario.addEventListener("submit", async (event) => {
        event.preventDefault();

        const datos = new FormData(formulario);
        const query = new URLSearchParams(datos).toString();

        try {
            const respuesta = await fetch("descuento.php?" + query);
            const contenido = await respuesta.text();
            resultado.innerHTML = contenido;

            Limpiar.style.display = "block"; // Muestra el botón Limpiar cuando hay resultado
        } catch (error) {
            resultado.innerHTML = "<p>Error al calcular el descuento.</p>";
        }
    });

    // Evento del botón Limpiar
    Limpiar.addEventListener("click", () => {
        formulario.reset(); // vacía los campos del formulario
        resultado.innerHTML = ""; //Borra el mensaje de resultado
        Limpiar.style.display = "none"; // Oculta el botón Limpiar cuando se limpia el formulario
    });
});
