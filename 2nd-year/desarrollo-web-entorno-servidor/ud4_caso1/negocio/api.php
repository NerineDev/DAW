<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__.'/../datos/repo.php';
require_once __DIR__.'/prod.php';

$repo = new Repo();
$prod = new Prod($repo);
$search = $_GET['search'] ?? '';

echo json_encode(
  $prod->buscar($search),
  JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
);
