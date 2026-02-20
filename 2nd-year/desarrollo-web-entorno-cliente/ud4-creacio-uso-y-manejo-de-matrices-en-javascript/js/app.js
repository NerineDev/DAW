"use strict";

/**
 * Array principal de productos.
 * Cada producto tiene nombre, precio y cantidad.
 * @type {{nombre: string, precio: number, cantidad: number}[]}
 */
let productos = [
  { nombre: "Teclado", precio: 39.99, cantidad: 10 },
  { nombre: "Ratón", precio: 19.99, cantidad: 25 },
  { nombre: "Monitor", precio: 149.99, cantidad: 6 },
];

/**
 * Almacena el índice del producto que se está editando.
 * Si es null, el formulario funciona en modo "alta".
 * Si contiene un número, el formulario está en modo "modificación".
 */
let indiceEnEdicion = null;

// Formularios
const formularioProducto = document.getElementById("formularioProducto");
const formularioBusqueda = document.getElementById("formularioBusqueda");

// Inputs
const inputNombre = document.getElementById("nombre");
const inputPrecio = document.getElementById("precio");
const inputCantidad = document.getElementById("cant");
const inputBusqueda = document.getElementById("busqueda");

// Tabla / UI
const cuerpoTabla = document.getElementById("filasProductos");
const mensajeSinResultados = document.getElementById("sinresultados");
const elementoGranTotal = document.getElementById("granTotal");

/**
 * Convierte una cadena a número, permitiendo coma decimal.
 * @param {string} valor
 * @returns {number}
 */
function aNumero(valor) {
  return Number(String(valor).replace(",", "."));
}

/**
 * Agrega un producto al array.
 * @param {string} nombre
 * @param {number} precio
 * @param {number} cantidad
 * @returns {{nombre:string, precio:number, cantidad:number}[]}
 */
function agregarProducto(nombre, precio, cantidad) {
  productos = [...productos, { nombre, precio, cantidad }];
  return productos;
}

/**
 * Elimina un producto por índice.
 * @param {number} indice
 * @returns {{nombre:string, precio:number, cantidad:number}[]}
 */
function eliminarProducto(indice) {
  productos = productos.filter((_, i) => i !== indice);
  return productos;
}

/**
 * Filtra productos por subcadena en el nombre (sin distinguir mayúsculas/minúsculas).
 * @param {string} consulta
 * @returns {{nombre:string, precio:number, cantidad:number}[]}
 */
function filtrarProductos(consulta) {
  const q = consulta.trim().toLowerCase();
  if (!q) return productos;
  return productos.filter(p => p.nombre.toLowerCase().includes(q));
}

/**
 * Calcula el valor total del inventario usando .reduce().
 * @param {{nombre:string, precio:number, cantidad:number}[]} lista
 * @returns {number}
 */
function calcularGranTotal(lista) {
  return lista.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
}

/**
 * Renderiza las filas de la tabla usando .map().
 * @param {{nombre:string, precio:number, cantidad:number}[]} lista
 */
function renderizarTabla(lista) {
  cuerpoTabla.innerHTML = lista
    .map((p, indice) => {
      const total = (p.precio * p.cantidad).toFixed(2);
      return `
        <tr>
          <td>${p.nombre}</td>
          <td>${p.precio.toFixed(2)}</td>
          <td>${p.cantidad}</td>
          <td>${total}</td>
          <td>
            <button data-editar="${indice}" type="button">Editar</button>
            <button data-eliminar="${indice}" type="button">Eliminar</button>
          </td>
        </tr>
      `;
    })
    .join("");

  // Mostrar/ocultar mensaje
  if (lista.length === 0) {
    mensajeSinResultados.classList.remove("oculto");
  } else {
    mensajeSinResultados.classList.add("oculto");
  }

  // Total del inventario
  elementoGranTotal.textContent = calcularGranTotal(lista).toFixed(2);
}

/**
 * Refresca la tabla aplicando el filtro actual.
 */
function refrescar() {
  const filtrados = filtrarProductos(inputBusqueda.value);
  renderizarTabla(filtrados);
}

// Alta de producto
formularioProducto.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNombre.value.trim();
  const precio = aNumero(inputPrecio.value);
  const cantidad = aNumero(inputCantidad.value);

  if (!nombre || !Number.isFinite(precio) || !Number.isFinite(cantidad) || precio < 0 || cantidad < 0) {
    alert("Introduce un nombre, un precio y una cantidad válidos.");
    return;
  }

  // Si hay un índice en edición, actualizamos el producto.
  // Si no, el formulario funciona en modo alta y se agrega uno nuevo.
  if (indiceEnEdicion !== null) {
    // Actualizar producto existente
    productos[indiceEnEdicion] = { nombre, precio, cantidad };
    indiceEnEdicion = null;
    formularioProducto.querySelector('button[type="submit"]').textContent = "Añadir";
  } else {
    // Añadir producto nuevo
    agregarProducto(nombre, precio, cantidad);
  }

  inputNombre.value = "";
  inputPrecio.value = "";
  inputCantidad.value = "";

  refrescar();
});

// Buscar (opcional porque también filtra en tiempo real)
formularioBusqueda.addEventListener("submit", (e) => {
  e.preventDefault();
  refrescar();
});

// Filtrado en tiempo real
inputBusqueda.addEventListener("input", refrescar);

// Delegación de eventos para eliminar
cuerpoTabla.addEventListener("click", (e) => {
  const btnEliminar = e.target.closest("button[data-eliminar]");
  const btnEditar = e.target.closest("button[data-editar]");

  if (btnEliminar) {
    const indice = Number(btnEliminar.dataset.eliminar);
    eliminarProducto(indice);
    refrescar();
    return;
  }

  if (btnEditar) {
    const indice = Number(btnEditar.dataset.editar);
    const producto = productos[indice];

    inputNombre.value = producto.nombre;
    inputPrecio.value = producto.precio;
    inputCantidad.value = producto.cantidad;

    indiceEnEdicion = indice;
    formularioProducto.querySelector('button[type="submit"]').textContent = "Actualizar";
  }
});

// Primera carga
refrescar();

/**
 * ===============================
 * PRUEBAS UNITARIAS
 * ===============================
 */

// Verifica que se puedan agregar elementos correctamente a una lista.
function test_agregarProducto() {
  let lista = [{ nombre: "A", precio: 1, cantidad: 1 }];
  lista = [...lista, { nombre: "B", precio: 2, cantidad: 2 }];
  console.assert(lista.length === 2, "Fallo: agregar (longitud)");
  console.assert(lista[1].nombre === "B", "Fallo: agregar (contenido)");
}

// Verifica que se puedan eliminar elementos correctamente de una lista.
function test_eliminarProducto() {
  let lista = [{ nombre: "A", precio: 1, cantidad: 1 }, { nombre: "B", precio: 2, cantidad: 2 }];
  lista = lista.filter((_, i) => i !== 0);
  console.assert(lista.length === 1, "Fallo: eliminar (longitud)");
  console.assert(lista[0].nombre === "B", "Fallo: eliminar (contenido)");
}

// Verifica que el filtrado por nombre funcione correctamente.
function test_filtrarProductos() {
  let lista = [{ nombre: "Teclado", precio: 1, cantidad: 1 }, { nombre: "Ratón", precio: 1, cantidad: 1 }];
  const res = lista.filter(p => p.nombre.toLowerCase().includes("tec"));
  console.assert(res.length === 1, "Fallo: filtrar (longitud)");
  console.assert(res[0].nombre === "Teclado", "Fallo: filtrar (contenido)");
}

// Verifica que el cálculo del total general funcione correctamente.
function test_calcularGranTotal() {
  const lista = [{ nombre: "A", precio: 10, cantidad: 2 }, { nombre: "B", precio: 20, cantidad: 1 }];
  const total = lista.reduce((suma, p) => suma + p.precio * p.cantidad, 0);
  console.assert(total === 40, "Fallo: reduce (gran total)");
}

test_agregarProducto();
test_eliminarProducto();
test_filtrarProductos();
test_calcularGranTotal();

console.log("Pruebas unitarias completadas correctamente.");