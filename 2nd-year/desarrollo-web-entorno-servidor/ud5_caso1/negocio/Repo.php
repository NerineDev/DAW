<?php
/**
 * Clase que simula un repositorio de productos.
 * Permite obtener y buscar productos en una colección interna.
 */
class Repo {
    private $productos = [];

    public function __construct() {
        // Simulación de productos en el "repositorio"
        $this->productos = [
            ["id" => 1, "nombre" => "Camiseta", "precio" => 19.99],
            ["id" => 2, "nombre" => "Pantalón", "precio" => 49.99],
            ["id" => 3, "nombre" => "Zapatos", "precio" => 89.99],
            ["id" => 4, "nombre" => "Gorra", "precio" => 14.99],
        ];
    }

    /**
     * Devuelve todos los productos.
     */
    public function getAll() {
        return $this->productos;
    }
}
