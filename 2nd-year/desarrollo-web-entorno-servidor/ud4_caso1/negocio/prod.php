<?php
class Prod {
  private $repo;
  public function __construct($repo) { $this->repo = $repo; }

  public function buscar(string $term=''): array {
    $term = trim($term ?? '');
    if ($term!=='' && mb_strlen($term)<2) return [];
    return $this->repo->buscar($term);
  }
}
