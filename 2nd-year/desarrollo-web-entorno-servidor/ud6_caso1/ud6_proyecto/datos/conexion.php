<?php
/**
 * Conexión PDO centralizada para el proyecto.
 * Usa MySQL local de XAMPP y la base de datos ya creada por el usuario.
 */

$host = '127.0.0.1';
$dbname = 'tienda_ud6';
$user = 'root';
$pass = '';

$dsn = "mysql:host={$host};dbname={$dbname};charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $conexion = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    http_response_code(500);
    die('Error de conexión a la base de datos: ' . $e->getMessage());
}
