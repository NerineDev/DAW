<?php
// Incluimos las clases de la tienda de videojuegos
require_once __DIR__ . '/ModeloTienda.php';

// Creamos un catálogo variado de videojuegos
$articulos = [
    new Videojuego(1, "Zelda: Tears of the Kingdom", 59.99, 10, "Switch", "Aventura"),
    new Videojuego(2, "God of War: Ragnarok", 69.99, 5, "PS5", "Acción"),
    new Videojuego(3, "Halo Infinite", 49.99, 8, "Xbox", "Shooter"),
    new Videojuego(4, "Mario Kart 8 Deluxe", 44.99, 12, "Switch", "Carreras"),
    new Videojuego(5, "Spider-Man 2", 69.99, 3, "PS5", "Acción"),
    new Videojuego(6, "Forza Horizon 5", 54.99, 7, "Xbox", "Carreras"),
];

$tienda = new Tienda($articulos);

// Búsqueda dinámica
$termino = isset($_GET['buscar']) ? $_GET['buscar'] : '';
$consola = isset($_GET['consola']) ? $_GET['consola'] : '';
$resultados = $tienda->buscar($termino, $consola);

// Ejemplo de descuento: aplicar 10% a todos los juegos de PS5
$tienda->aplicarDescuentoConsola("PS5", 10);

// Prueba de venta de stock
$mensajeStock = '';
if (isset($_GET['vender']) && isset($_GET['id'])) {
    foreach ($articulos as $art) {
        if ($art->getId() == $_GET['id']) {
            if ($art->vender(1)) {
                $mensajeStock = "¡Venta realizada! Quedan " . $art->getStock() . " unidades.";
            } else {
                $mensajeStock = "No hay stock suficiente.";
            }
        }
    }
}

// Demostración de principios POO
$ejemplo = $articulos[0];
$infoEncapsulacion = $ejemplo->getNombre();
$infoHerencia = ($ejemplo instanceof Articulo) ? "Sí" : "No";
$infoPolimorfismo = $ejemplo->getTipo();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Demo POO - Búsqueda de Productos</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2em; }
        table { border-collapse: collapse; width: 50%; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background: #f0f0f0; }
    </style>
</head>
<body>
    <h1>Tienda de Videojuegos</h1>
    <!-- Explicación de POO eliminada por petición del usuario -->
    <form method="get">
        <label for="buscar">Buscar por nombre:</label>
        <input type="text" name="buscar" id="buscar" value="<?php echo htmlspecialchars($termino); ?>">
        <label for="consola">Consola:</label>
        <select name="consola" id="consola">
            <option value="">Todas</option>
            <option value="Switch" <?php if($consola=="Switch") echo "selected"; ?>>Switch</option>
            <option value="PS5" <?php if($consola=="PS5") echo "selected"; ?>>PS5</option>
            <option value="Xbox" <?php if($consola=="Xbox") echo "selected"; ?>>Xbox</option>
        </select>
        <button type="submit">Buscar</button>
    </form>
    <?php if ($mensajeStock): ?>
        <p style="color:green;"><b><?php echo $mensajeStock; ?></b></p>
    <?php endif; ?>
    <br>
    <table>
        <tr><th>ID</th><th>Nombre</th><th>Consola</th><th>Género</th><th>Precio (€)</th><th>Stock</th><th>Acción</th></tr>
        <?php foreach ($resultados as $art): ?>
            <tr>
                <td><?php echo $art->getId(); ?></td>
                <td><?php echo htmlspecialchars($art->getNombre()); ?></td>
                <td><?php echo ($art instanceof Videojuego) ? $art->getConsola() : '-'; ?></td>
                <td><?php echo ($art instanceof Videojuego) ? $art->getGenero() : '-'; ?></td>
                <td><?php echo number_format($art->getPrecio(), 2); ?></td>
                <td><?php echo $art->getStock(); ?></td>
                <td>
                    <form method="get" style="display:inline">
                        <input type="hidden" name="buscar" value="<?php echo htmlspecialchars($termino); ?>">
                        <input type="hidden" name="consola" value="<?php echo htmlspecialchars($consola); ?>">
                        <input type="hidden" name="id" value="<?php echo $art->getId(); ?>">
                        <button type="submit" name="vender" value="1" <?php if($art->getStock()==0) echo 'disabled'; ?>>Vender 1</button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
        <?php if (empty($resultados)): ?>
            <tr><td colspan="7">No se encontraron artículos.</td></tr>
        <?php endif; ?>
    </table>
    <!-- Pie de página eliminado por petición del usuario -->
</body>
</html>
