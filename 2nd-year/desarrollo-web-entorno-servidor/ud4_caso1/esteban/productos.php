<?php
session_start();
$products = [
    1 => 'Producto A',
    2 => 'Producto B',
    3 => 'Producto C'
];
if (isset($_GET['add'])) {
    $id = (int)$_GET['add'];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    header('Location: productos.php?added=' . $id);
    exit;
}
$lang = $_COOKIE['lang'] ?? 'es';
$theme = $_COOKIE['theme'] ?? 'light';
?><!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <title>Tienda</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="<?= $theme ?>">
<nav>
    <a href="productos.php">Productos/Carrito</a> |
    <a href="preferencias.php">Preferencias</a> |
    <a href="index.php">Inicio</a>
</nav>
<h1>Productos</h1>
<ul>
<?php foreach ($products as $id => $name): ?>
    <li><?= $name ?> <a href="?add=<?= $id ?>">Agregar</a></li>
<?php endforeach; ?>
</ul>
<?php if (isset($_GET['added']) && isset($products[(int)$_GET['added']])): ?>
    <p style="color:green;">Producto añadido: <?= $products[(int)$_GET['added']] ?></p>
<?php endif; ?>
<h2>Carrito</h2>
<ul>
<?php if (!empty($_SESSION['cart'])): foreach ($_SESSION['cart'] as $id => $qty): ?>
    <li><?= $products[$id] ?> x <?= $qty ?></li>
<?php endforeach; else: ?>
    <li>Vacío</li>
<?php endif; ?>
</ul>
</body>
</html>
