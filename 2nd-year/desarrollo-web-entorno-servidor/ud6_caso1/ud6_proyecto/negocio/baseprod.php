<?php
/**
 * Clase base para la capa de negocio.
 * Define la estructura común y obliga a implementar el método buscar().
 */
abstract class BaseProd {
  protected $repo;

  public function __construct($repo) {
    $this->repo = $repo;
  }

  /**
   * Busca productos según la lógica de negocio de la clase concreta.
   */
  abstract public function buscar(string $term='', string $orden='desc', string $categoria='', string $idioma='es'): array;
}