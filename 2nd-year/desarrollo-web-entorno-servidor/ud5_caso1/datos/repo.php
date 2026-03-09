<?php
/**
 * Clase Repo
 * Se encarga de almacenar los datos de los productos y realizar búsquedas.
 * Actúa como capa de acceso a datos dentro de la aplicación.
 */
class Repo {
  private $data = [
    ['id'=>1,'name'=>'Teclado mecánico','price'=>59.90,'category'=>'Periféricos'],
    ['id'=>2,'name'=>'Ratón inalámbrico','price'=>24.50,'category'=>'Periféricos'],
    ['id'=>3,'name'=>'Monitor 24"','price'=>139.00,'category'=>'Pantallas'],
    ['id'=>4,'name'=>'USB-C Hub','price'=>29.95,'category'=>'Accesorios'],
  ];

  /**
   * Busca productos por nombre o categoría.
   * Si el término de búsqueda está vacío, devuelve todos los productos.
   */
  public function buscar(string $term): array {
    $term = mb_strtolower(trim($term));
    if ($term === '') return $this->data;
    return array_values(array_filter($this->data, fn($p)=>
      str_contains(mb_strtolower($p['name']),$term) ||
      str_contains(mb_strtolower($p['category']),$term)
    ));
  }
}
