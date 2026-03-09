<?php
/**
 * Clase abstracta que representa un artículo genérico de la tienda.
 * Demuestra herencia y polimorfismo.
 */
abstract class Articulo {
    protected $id;
    protected $nombre;
    protected $precio;
    protected $stock;

    public function __construct($id, $nombre, $precio, $stock) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->stock = $stock;
    }
    // Getters
    public function getId() { return $this->id; }
    public function getNombre() { return $this->nombre; }
    public function getPrecio() { return $this->precio; }
    public function getStock() { return $this->stock; }
    // Métodos abstractos
    abstract public function getTipo(): string;
    abstract public function getInfoExtra(): string;
    // Método para aplicar descuento
    public function aplicarDescuento($porcentaje) {
        if ($porcentaje > 0 && $porcentaje < 100) {
            $this->precio *= (1 - $porcentaje / 100);
        }
    }
    // Método para vender unidades
    public function vender($cantidad) {
        if ($cantidad > 0 && $cantidad <= $this->stock) {
            $this->stock -= $cantidad;
            return true;
        }
        return false;
    }
}

/**
 * Clase que representa un videojuego para una consola específica.
 */
class Videojuego extends Articulo {
    private $consola;
    private $genero;

    public function __construct($id, $nombre, $precio, $stock, $consola, $genero) {
        parent::__construct($id, $nombre, $precio, $stock);
        $this->consola = $consola;
        $this->genero = $genero;
    }
    public function getTipo(): string {
        return "Videojuego";
    }
    public function getInfoExtra(): string {
        return "Consola: $this->consola, Género: $this->genero";
    }
    public function getConsola() { return $this->consola; }
    public function getGenero() { return $this->genero; }
}

/**
 * Clase de negocio para gestionar el catálogo de la tienda.
 */
class Tienda {
    private $articulos = [];
    public function __construct($articulos) {
        $this->articulos = $articulos;
    }
    /**
     * Busca artículos por nombre o consola.
     */
    public function buscar($termino = '', $consola = ''): array {
        $resultados = [];
        foreach ($this->articulos as $art) {
            if ((empty($termino) || stripos($art->getNombre(), $termino) !== false)
                && (empty($consola) || ($art instanceof Videojuego && $art->getConsola() === $consola))) {
                $resultados[] = $art;
            }
        }
        return $resultados;
    }
    /**
     * Aplica descuento a todos los artículos de una consola.
     */
    public function aplicarDescuentoConsola($consola, $porcentaje) {
        foreach ($this->articulos as $art) {
            if ($art instanceof Videojuego && $art->getConsola() === $consola) {
                $art->aplicarDescuento($porcentaje);
            }
        }
    }
}
