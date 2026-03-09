const $search = document.getElementById('search');
const $buscar = document.getElementById('buscar');
const $ul = document.getElementById('listado');
const $estado = document.getElementById('estado');

async function buscar() {
  $estado.textContent = 'Buscando...';
  $ul.innerHTML = '';
  const term = encodeURIComponent(($search.value || '').trim());
  try {
    const res = await fetch(`negocio/api.php?search=${term}`);
    if (!res.ok) throw new Error('Error en la API');
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      $estado.textContent = 'Sin resultados.';
      return;
    }
    data.forEach(p => {
      const li = document.createElement('li');
      const price = typeof p.price === 'number' ? p.price.toFixed(2) : p.price;
      li.innerHTML = `
  <div class="producto-nombre">
    ${p.name} — ${p.category} — ${price} €
  </div>

  <form method="post" class="inline-form">
    <input type="hidden" name="product_id" value="${p.id}">
    <button type="submit" name="add_to_cart">Añadir al carrito</button>
  </form>
`;

      $ul.appendChild(li);
    });
    $estado.textContent = `${data.length} resultado(s).`;
  } catch (e) {
    console.error(e);
    $estado.textContent = 'Ha ocurrido un error consultando la API.';
  }
}

if ($buscar && $search) {
  $buscar.addEventListener('click', buscar);
  $search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscar();
  });
}


const langBtn = document.getElementById("lang_toggle");

if (langBtn) {
  let idioma = localStorage.getItem("idioma") || "es";
  langBtn.textContent = idioma.toUpperCase();

  langBtn.addEventListener("click", () => {
    idioma = idioma === "es" ? "en" : "es";
    localStorage.setItem("idioma", idioma);
    langBtn.textContent = idioma.toUpperCase();
    location.reload();
  });
}

// Mostrar resultados al cargar la página (tienda.php)
if ($ul && $estado && $search && $buscar) {
  buscar();
}

