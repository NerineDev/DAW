/**
 * app.js – UD6 – DWEC
 *
 * Este archivo demuestra:
 *  1. Acceso a la estructura del DOM (querySelectorAll, getElementById…)
 *  2. Creación y modificación dinámica de elementos (createElement, appendChild…)
 *  3. Asociación de eventos (addEventListener) con los tipos click, change e input
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. ACCESO AL DOM – obtener los productos existentes en la página
    // =========================================================================

    /**
     * NodeList con todos los elementos .producto presentes en el HTML estático.
     * Usamos querySelectorAll para acceder a varios elementos a la vez.
     */
    const productos = document.querySelectorAll('.producto');
    const contenedorControles = document.getElementById('controles');
    const headerFav = document.getElementById('header-fav');

    // Estado interno de la aplicación
    const favoritos = new Set();        // ids de productos marcados como favoritos
    let mostrandoSoloFavoritos = false; // indica si el filtro de favoritos está activo


    // =========================================================================
    // 2. CREACIÓN Y MODIFICACIÓN DINÁMICA DE ELEMENTOS EN EL DOM
    // =========================================================================

    // --- 2a. Contador visual de favoritos (icono + número) -------------------

    const contadorFav = document.createElement('div');
    contadorFav.id = 'contador-fav';
    contadorFav.className = 'contador-fav';
    // innerHTML combina el icono estático con un <span> que actualizaremos
    contadorFav.innerHTML = '❤️ <span id="num-favoritos">0</span> favorito(s)';
    headerFav.appendChild(contadorFav);


    // --- 2b. Formulario de selección de categorías (creado íntegramente en JS) ---

    const formularioFiltro = document.createElement('div');
    formularioFiltro.className = 'filtro-form';

    // Etiqueta para el selector
    const labelCategoria = document.createElement('label');
    labelCategoria.htmlFor = 'filtro-categoria';
    labelCategoria.textContent = 'Categoría:';

    // Elemento <select> con opciones predefinidas
    const selectCategoria = document.createElement('select');
    selectCategoria.id = 'filtro-categoria';

    const opciones = ['Todas', 'Periféricos', 'Pantallas', 'Audio', 'Accesorios', 'Móviles', 'Tablets'];
    opciones.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat === 'Todas' ? '' : cat;
        option.textContent = cat;
        selectCategoria.appendChild(option);
    });

    formularioFiltro.appendChild(labelCategoria);
    formularioFiltro.appendChild(selectCategoria);


    // --- 2c. Campo de búsqueda en tiempo real ----------------------------------

    const labelBusqueda = document.createElement('label');
    labelBusqueda.htmlFor = 'busqueda';
    labelBusqueda.textContent = 'Buscar:';

    const inputBusqueda = document.createElement('input');
    inputBusqueda.type = 'text';
    inputBusqueda.id = 'busqueda';
    inputBusqueda.placeholder = 'Buscar producto...';

    formularioFiltro.appendChild(labelBusqueda);
    formularioFiltro.appendChild(inputBusqueda);


    // --- 2d. Botón "Mostrar Favoritos" ----------------------------------------

    const btnMostrarFav = document.createElement('button');
    btnMostrarFav.id = 'mostrar-favoritos';
    btnMostrarFav.type = 'button';
    btnMostrarFav.textContent = 'Mostrar Favoritos';
    btnMostrarFav.className = 'btn-mostrar-fav';


    // --- Montar todos los controles en el contenedor --------------------------

    const barraAcciones = document.createElement('div');
    barraAcciones.className = 'barra-acciones';
    barraAcciones.appendChild(btnMostrarFav);

    contenedorControles.appendChild(formularioFiltro);
    contenedorControles.appendChild(barraAcciones);

    // Mensaje "sin resultados" creado dinámicamente; permanece oculto hasta que
    // todos los productos queden filtrados fuera de la vista.
    const mensajeSinResultados = document.createElement('p');
    mensajeSinResultados.id = 'sin-resultados';
    mensajeSinResultados.textContent = 'No hay productos que coincidan con tu búsqueda.';
    mensajeSinResultados.style.display = 'none';
    document.getElementById('productos').after(mensajeSinResultados);


    // =========================================================================
    // FUNCIÓN AUXILIAR: aplica todos los filtros activos simultáneamente
    // =========================================================================

    function filtrar() {
        const termino = inputBusqueda.value.toLowerCase().trim();
        const categoriaSeleccionada = selectCategoria.value;
        let visibles = 0;

        productos.forEach(producto => {
            const nombre = producto.dataset.nombre.toLowerCase();
            const categoria = producto.dataset.categoria;
            const esFavorito = favoritos.has(producto.dataset.id);

            const coincideBusqueda = nombre.includes(termino);
            const coincideCategoria = !categoriaSeleccionada || categoria === categoriaSeleccionada;
            const coincideFavorito = !mostrandoSoloFavoritos || esFavorito;

            const visible = coincideBusqueda && coincideCategoria && coincideFavorito;
            producto.style.display = visible ? '' : 'none';
            if (visible) visibles++;
        });

        // Mostrar u ocultar el mensaje de sin resultados
        mensajeSinResultados.style.display = visibles === 0 ? '' : 'none';
    }


    // =========================================================================
    // 3. ASOCIACIÓN DE EVENTOS A ACCIONES
    // =========================================================================

    // --- Evento change en el selector de categorías --------------------------
    /**
     * Se dispara cada vez que el usuario cambia la opción seleccionada.
     * Llama a filtrar() para actualizar la lista de productos visibles.
     */
    selectCategoria.addEventListener('change', filtrar);


    // --- Evento input en el campo de búsqueda ---------------------------------
    /**
     * Se dispara en cada pulsación de teclado, ocultando en tiempo real
     * los productos cuyo nombre no contenga el término escrito.
     */
    inputBusqueda.addEventListener('input', filtrar);


    // --- Evento click en "Mostrar Favoritos" ----------------------------------
    /**
     * Alterna entre ver todos los productos y ver solo los favoritos.
     * Actualiza el texto del botón para indicar el estado activo.
     */
    btnMostrarFav.addEventListener('click', () => {
        mostrandoSoloFavoritos = !mostrandoSoloFavoritos;
        btnMostrarFav.textContent = mostrandoSoloFavoritos ? 'Mostrar Todos' : 'Mostrar Favoritos';
        btnMostrarFav.classList.toggle('activo', mostrandoSoloFavoritos);
        filtrar();
    });


    // --- Evento click en cada botón "Añadir a Favoritos" ----------------------
    /**
     * Se añade un listener individual a cada producto de la lista.
     * Al hacer clic:
     *   - Si el producto NO es favorito → se añade; contador sube.
     *   - Si el producto YA es favorito → se elimina; contador baja.
     * El botón y la tarjeta cambian visualmente para reflejar el estado.
     */
    productos.forEach(producto => {
        const btnFav = producto.querySelector('.btn-fav');
        if (!btnFav) return;

        btnFav.addEventListener('click', () => {
            const id = producto.dataset.id;
            const numFavEl = document.getElementById('num-favoritos');

            if (favoritos.has(id)) {
                // Quitar de favoritos
                favoritos.delete(id);
                btnFav.textContent = 'Añadir a Favoritos';
                btnFav.classList.remove('favorito-activo');
                producto.classList.remove('es-favorito');
            } else {
                // Añadir a favoritos
                favoritos.add(id);
                btnFav.textContent = '❤️ En Favoritos';
                btnFav.classList.add('favorito-activo');
                producto.classList.add('es-favorito');
            }

            // Actualizar el contador visual en el encabezado
            numFavEl.textContent = favoritos.size;

            // Re-filtrar siempre para mantener el mensaje "sin resultados"
            // sincronizado, y para ocultar el producto cuando el modo
            // "solo favoritos" está activo y se acaba de quitar un favorito.
            filtrar();
        });
    });

});
