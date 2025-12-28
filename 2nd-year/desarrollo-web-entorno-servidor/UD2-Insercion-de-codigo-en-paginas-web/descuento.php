<?php

if (isset($_GET['precio']) && isset($_GET['descuento'])) {

    $precioOriginal = $_GET['precio'];
    $porcentajeDescuento = $_GET['descuento'];

    $cantidadDescuento = $precioOriginal * ($porcentajeDescuento / 100);
    $precioFinal = $precioOriginal - $cantidadDescuento;

    echo "Precio original: " . number_format($precioOriginal, 2, ",", ".") . " €<br>";
    echo "Descuento aplicado: $porcentajeDescuento %<br>";
    echo "Precio final: " . number_format($precioFinal, 2, ",", ".") . " €<br>";

    if ($porcentajeDescuento > 50) {
        echo "<br><strong style='color:red;'>¡Atención! El descuento es mayor del 50%.</strong>";
    }

} else {
    echo "No has enviado los datos correctamente.";
}
