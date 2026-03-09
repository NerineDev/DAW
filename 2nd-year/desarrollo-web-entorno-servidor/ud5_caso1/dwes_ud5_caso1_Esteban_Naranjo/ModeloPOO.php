<?php
/**
 * Clase que representa un producto de la tienda.
 * Demuestra encapsulación (propiedades privadas y getters/setters).
 */
class Producto {
    private $id;
    private $nombre;
    private $precio;

    /**
     * Constructor de Producto.
     */
    public function __construct($id, $nombre, $precio) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->precio = $precio;
    }
    // Getters
    public function getId() { return $this->id; }
    public function getNombre() { return $this->nombre; }
    public function getPrecio() { return $this->precio; }
}

/**
 * Clase abstracta para lógica de negocio (herencia y polimorfismo).
 */
abstract class BaseProd {
    abstract public function buscar(string $term = ''): array;
}

/**
 * Clase concreta que hereda de BaseProd y busca productos.
 */
class ProdNegocio extends BaseProd {
    private $productos;
    public function __construct($productos) {
        $this->productos = $productos;
    }
    /**
     * Busca productos por nombre (polimorfismo: implementación concreta).
     */
    public function buscar(string $term = ''): array {
        $resultados = [];
        foreach ($this->productos as $producto) {
            // Condicional: filtra por término
            if ($term === '' || stripos($producto->getNombre(), $term) !== false) {
                $resultados[] = $producto;
            }
        }
        return $resultados;
    }
}
