<?php
require_once __DIR__ . '/../negocio/baseprod.php';
require_once __DIR__ . '/../negocio/Repo.php';

/**
 * Clase concreta de negocio que implementa la búsqueda de productos.
 * Hereda de BaseProd y aplica polimorfismo en el método buscar.
 */
class ProdNegocio extends BaseProd {
    /**
     * Busca productos cuyo nombre contenga el término indicado (no sensible a mayúsculas/minúsculas).
     * Si el término está vacío, devuelve todos los productos.
     */
    public function buscar(string $term = ''): array {
        $resultados = [];
        foreach ($this->repo->getAll() as $producto) {
            // Condicional: filtra por término si se proporciona
            if ($term === '' || stripos($producto['nombre'], $term) !== false) {
                $resultados[] = $producto;
            }
        }
        return $resultados;
    }
}
