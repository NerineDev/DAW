<?php
require_once __DIR__ . '/baseprod.php';

/**
 * Clase ProdFiltro
 * Variante de negocio que aplica una ordenación por precio.
 */
class ProdFiltro extends BaseProd {

  /**
  * Sobrescribe el método buscar() para aplicar una ordenación adicional.
  * En este caso, permite ordenar los resultados por precio
  * en orden ascendente o descendente.
  */
  public function buscar(string $term=''): array {
    // Limpieza del término de búsqueda
    $term = trim($term ?? '');

    // Primero obtenemos los resultados normales del repositorio
    $resultados = $this->repo->buscar($term);

    // Se obtiene el parámetro 'orden' de la URL.
    // Si no existe, por defecto se ordena de mayor a menor.
    $orden = $_GET['orden'] ?? 'desc';

    /**
    * Se ordena el array de resultados por precio.
    * - asc  => de menor a mayor
    * - desc => de mayor a menor
    */
    usort($resultados, function($a, $b) use ($orden) {

      $priceA = floatval($a['price'] ?? 0);
      $priceB = floatval($b['price'] ?? 0);

      if ($orden === 'asc') {
        return $priceA <=> $priceB;
      } else {
        return $priceB <=> $priceA;
      }
    });

    // Se devuelven los resultados ya ordenados
    return $resultados;
  }
}