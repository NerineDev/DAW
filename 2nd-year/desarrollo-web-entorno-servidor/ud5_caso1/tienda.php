<?php
session_start();
// Iniciar carrito si no existe
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Acción para añadir al carrito
if (isset($_POST['add_to_cart'])) {
    $productId = intval($_POST['product_id'] ?? 0);
    if ($productId > 0) {
        if (!isset($_SESSION['cart'][$productId])) {
            $_SESSION['cart'][$productId] = 1;
        } else {
            $_SESSION['cart'][$productId]++;
        }
    }
}

// Acción para eliminar del carrito
if (isset($_POST['remove_from_cart'])) {
    $productId = intval($_POST['product_id'] ?? 0);
    if ($productId > 0 && isset($_SESSION['cart'][$productId])) {
        unset($_SESSION['cart'][$productId]);
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Team Shop</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="./IMG/logo.png" alt="Best Team Logo">
        </div>
        <div class="menu">
            <nav>
                <ul class="menu_principal">
                    <li><a id="nav_index"href="index.php"></a></li>
                    <li><a id="nav_sobre" href="sobre.php"></a></li>
                    <li><a id="nav_noticias" href="noticias.php"></a></li>
                    <li><a id="nav_tienda" href="tienda.php"></a></li>
                </ul>
            </nav>
        </div>
<div class="header-actions">

    <button id="lang_toggle" type="button"></button>

    <div class="cart-header">
        <span class="cart-icon">🛒</span>
        <span class="cart-count">
            <?php echo array_sum($_SESSION['cart'] ?? []); ?>
        </span>

<div class="cart-dropdown">
<?php
if (empty($_SESSION['cart'])) {
    echo "<p id='cart_empty'></p>";
} else {
    require_once __DIR__ . "/datos/repo.php";
    $repo = new Repo();
    $products = $repo->buscar("");

    echo "<p id='cart_products_label'></p><ul>";

    foreach ($products as $p) {
        $id = $p['id'];
        if (isset($_SESSION['cart'][$id])) {
            $qty = $_SESSION['cart'][$id];
            echo "<li>"
                . htmlspecialchars($p['name'])
                . " (x$qty)"
                . "</li>";
        }
    }

    echo "</ul>";
    echo "<a href='carrito.php' id='cart_view'></a>";
}
?>
</div>

    </div>

</div>


    </header>
    <main class="home">

        <!-- Carrito -->
        <section class="seccion-carrito">
            <h2 id="cart_title"></h2>
            <?php
            if (empty($_SESSION['cart'])) {
                echo '<p id="cart_main_empty">El carrito está vacío.</p>';
            } else {
                // Carga datos de productos
                require_once __DIR__.'/datos/repo.php';
                $repo = new Repo();
                $products = $repo->buscar("");
                $cartItems = [];
                foreach ($products as $p) {
                    if (isset($_SESSION['cart'][$p['id']])) {
                        $cartItems[] = $p + ['qty' => $_SESSION['cart'][$p['id']]];
                    }
                }
                echo '<ul class="articulos-carrito">';
                foreach ($cartItems as $item) {
                    echo '<li>';
                    echo '<div class="cart-item-nombre">'
                        . htmlspecialchars($item['name'])
                        . ' (x'.intval($item['qty']).')'
                        . '</div>';

                    echo '<div class="cart-item-linea">';
                    echo '<span class="cart-precio">'
                        . number_format($item['price'],2)
                        . ' €</span>';

                    echo '<form method="post" class="inline-form">
                            <input type="hidden" name="product_id" value="'.intval($item['id']).'">
                            <button id="cart_remove_btn" type="submit" class="main-btn" name="remove_from_cart">Quitar</button>
                        </form>';
                    echo '</div>';

                    echo '</li>';
                }
                echo '</ul>';
            }
            ?>
        </section>
        <section class="izquierda">
            <figure>
                <img src="./IMG/jugadores.jpg" width="350">
            </figure>
        </section>
        <section class="derecha">

        <h1 id="catalog_title"></h1>
        <?php
            // Obtener estado del filtro y ordenación desde URL
            $modo = $_GET['modo'] ?? 'normal';
            $orden = $_GET['orden'] ?? '';
            $hayFiltro = ($modo === 'filtro');
            $ordenSiguiente = ($orden === 'asc') ? 'desc' : 'asc';
            $linkModoNormal = "tienda.php?modo=normal&orden=" . urlencode($orden);
            $linkModoFiltro = "tienda.php?modo=filtro&orden=" . urlencode($orden);
        ?>
        <div class="modo-box">
            <div class="filter-left">
                <span id="filter_info"></span>
            </div>
            <div class="filter-center">
                <a href="<?= $linkModoNormal ?>" id="clear_filter" class="<?= $hayFiltro ? '' : 'disabled' ?>"></a>
            </div>
            <div class="filter-right">
                <label for="order_select" id="order_label">Ordenar por precio:</label>
                <select id="order_select" class="order-select">
                    <option value="" <?= ($orden !== 'asc' && $orden !== 'desc') ? 'selected' : '' ?> id="order_opt_default">-</option>
                    <option value="asc" <?= ($orden === 'asc') ? 'selected' : '' ?> id="order_opt_asc">Menor a mayor</option>
                    <option value="desc" <?= ($orden === 'desc') ? 'selected' : '' ?> id="order_opt_desc">Mayor a menor</option>
                </select>
            </div>
        </div>

        <script>
            (function(){
                const sel = document.getElementById('order_select');
                if (!sel) return;
                function getIdioma() {
                    return localStorage.getItem('idioma') || 'es';
                }
                function updateFilterUI(hayFiltro) {
                    const idioma = getIdioma();
                    const dict = {
                        es: { con: 'con filtro', sin: 'sin filtro' },
                        en: { con: 'with filter', sin: 'no filter' }
                    };
                    const filterInfo = document.getElementById('filter_info');
                    const clearFilter = document.getElementById('clear_filter');
                    if (filterInfo) filterInfo.textContent = hayFiltro ? dict[idioma].con : dict[idioma].sin;
                    if (clearFilter) {
                        const t = window.translations && window.translations[idioma] && window.translations[idioma].clear_filter;
                        clearFilter.textContent = t || (idioma === 'en' ? 'Clear filter' : 'Quitar filtro');
                        if (hayFiltro) clearFilter.classList.remove('disabled');
                        else clearFilter.classList.add('disabled');
                    }
                }
                sel.addEventListener('change', () => {
                    let hayFiltro = false;
                    if (sel.value) {
                        hayFiltro = true;
                        if (typeof buscar === "function") buscar();
                    } else {
                        hayFiltro = false;
                        if (typeof buscar === "function") buscar();
                    }
                    updateFilterUI(hayFiltro);
                });
                if (sel.value === "") {
                    sel.selectedIndex = 0;
                }
                // Actualización de la UI al cambiar el idioma
                window.addEventListener('storage', function() {
                    const hayFiltro = !!sel.value;
                    updateFilterUI(hayFiltro);
                });
                // Actualización inicial de la UI
                updateFilterUI(!!sel.value);
            })();
        </script>
            <article class="buscador">
                <label id="buscar_label"></label>
                <input id="search" type="text" placeholder="inserta producto"/>
    <br><br>
    <button id="buscar"></button>
            </article>
            <div class="resultados">
                <h2 id="resultados_title"></h2>
                <ul id="listado"></ul>
                <p id="estado" class="test"></p>
            </div>
        </section>

    </main>
    <footer>
        <div class="datos_contacto">
            <h3 id="footer_contact"></h3>
            <p id="footer_address"></p>
        </div>
        <div class="menu_secundario">
            <nav>
                <h3 id="footer_other_links"></h3>
                <ul class="bottommenu">
                    <li id="footer_link1"></li>
                    <li id="footer_link2"></li>
                    <li id="footer_link3"></li>
                </ul>
            </nav>
        </div>
        <div class="redes_sociales">
            <a href="https://facebook.com" target="_blank"><img class= "facebook"src="./IMG/facebook.png" class="facebook"></a>
            <a href="https://instagram.com" target="_blank"><img class= "instagram" src="./IMG/instagram.png" class="instagram"></a>
            <a href="https://x.com"target="_blank"><img class= "x" src="./IMG/x.png" class="x"></a>
        </div>
    </footer>
    <script src="./script.js"></script>
    <script src="./i18n.js"></script>
</body>
</html>