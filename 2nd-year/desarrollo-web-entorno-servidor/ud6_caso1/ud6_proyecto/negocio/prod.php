<?php
require_once __DIR__ . '/baseprod.php';

/**
 * Clase Prod
 * Implementa la lógica de negocio para la búsqueda de productos.
 */
class Prod extends BaseProd {

  /**
   * Busca productos aplicando una regla mínima:
   * si el término existe y tiene menos de 2 caracteres, devuelve un array vacío.
   */

  public function buscar(string $term='', string $orden='desc', string $categoria='', string $idioma='es'): array {
    $term = trim($term ?? '');
    if ($term!=='' && mb_strlen($term)<2) return [];
    return $this->repo->buscar($term, $orden, $categoria, $idioma);
  }
}
