<?php session_start(); ?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Best Team Home</title>
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
        <section class="izquierda">
            <figure>
                <img src="./IMG/jugadores.jpg" alt="Imagen de jugadores" width="400" height="600">
            </figure>
        </section>
        <section class="derecha">
            <article>
                <h1 id="home_title"></h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos veritatis voluptatum repudiandae, commodi consequatur dolorem at laudantium eaque nostrum doloremque sequi quibusdam voluptatibus voluptate molestias id impedit molestiae. Rerum, molestiae?</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam laborum at, dignissimos ea amet odio et perspiciatis inventore possimus, rem adipisci praesentium nisi minima, illo sapiente provident laboriosam maxime enim.</p>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque eum non quas saepe minus earum praesentium? Esse molestiae modi, sit est omnis architecto itaque iure! Hic asperiores sunt omnis veritatis.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui dolor mollitia minus hic placeat quo obcaecati esse veritatis deserunt, praesentium, ea, fuga culpa suscipit alias cum dolorum illum quibusdam corrupti.</p>
            </article>
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
            <a href="https://facebook.com" target="_blank"><img src="./IMG/facebook.png" class="facebook"></a>
            <a href="https://instagram.com" target="_blank"><img src="./IMG/instagram.png" class="instagram"></a>
            <a href="https://x.com"target="_blank"><img src="./IMG/x.png" class="x"></a>
        </div>
    </footer>
    <script src="./script.js"></script>
    <script src="./i18n.js"></script>
</body>
</html>