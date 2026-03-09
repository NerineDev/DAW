<?php
session_start();
if (isset($_POST['lang'], $_POST['theme'])) {
    setcookie('lang', $_POST['lang'], time()+60*60*24*30);
    setcookie('theme', $_POST['theme'], time()+60*60*24*30);
    echo "<script>localStorage.setItem('lang', '" . $_POST['lang'] . "');localStorage.setItem('theme', '" . $_POST['theme'] . "');location.href='preferencias.php';</script>";
    exit;
}
$lang = $_COOKIE['lang'] ?? 'es';
$theme = $_COOKIE['theme'] ?? 'light';
?><!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <title>Preferencias</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body class="<?= $theme ?>">
<h1>Preferencias</h1>
<form method="post">
    Idioma: <select name="lang">
        <option value="es"<?= $lang=='es'?' selected':'' ?>>Español</option>
        <option value="en"<?= $lang=='en'?' selected':'' ?>>English</option>
    </select>
    Tema: <select name="theme">
        <option value="light"<?= $theme=='light'?' selected':'' ?>>Claro</option>
        <option value="dark"<?= $theme=='dark'?' selected':'' ?>>Oscuro</option>
    </select>
    <button type="submit">Guardar</button>
</form>
<p><a href="productos.php">Productos</a> | <a href="carrito.php">Carrito</a></p>
<script>
window.addEventListener('DOMContentLoaded', function() {
    var lang = localStorage.getItem('lang');
    var theme = localStorage.getItem('theme');
    if (lang) document.documentElement.lang = lang;
    if (theme) document.body.className = theme;
});
</script>
</body>
</html>
