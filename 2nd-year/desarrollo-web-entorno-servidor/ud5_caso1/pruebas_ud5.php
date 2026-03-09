<?php
require_once __DIR__ . '/datos/repo.php';
require_once __DIR__ . '/negocio/prod.php';
require_once __DIR__ . '/negocio/prodfiltro.php';

$repo = new Repo();

$prodNormal = new Prod($repo);
$prodFiltro = new ProdFiltro($repo);

function assertTrue(string $label, bool $cond): void {
  echo ($cond ? "[OK] " : "[FAIL] ") . $label . "\n";
}

function prices(array $arr): array {
  return array_map(fn($p) => floatval($p['price'] ?? 0), $arr);
}

function isAsc(array $nums): bool {
  for ($i=1; $i<count($nums); $i++) if ($nums[$i] < $nums[$i-1]) return false;
  return true;
}

function isDesc(array $nums): bool {
  for ($i=1; $i<count($nums); $i++) if ($nums[$i] > $nums[$i-1]) return false;
  return true;
}

echo "<pre>";
echo "== PRUEBAS UD5 ==\n\n";

echo "-- Demostración explícita de polimorfismo (misma interfaz, distinto comportamiento) --\n";

$servicios = [$prodNormal, $prodFiltro];

foreach ($servicios as $servicio) {
  $res = $servicio->buscar("");
  assertTrue(get_class($servicio) . " responde a buscar() y devuelve array", is_array($res));
  assertTrue(get_class($servicio) . " devuelve al menos 1 resultado", count($res) >= 1);
}

echo "\n";

echo "\n-- ProdFiltro: pruebas de ordenación por precio (asc/desc) --\n";

/* ASC */
$_GET['orden'] = 'asc';
$asc = $prodFiltro->buscar("");
$ascPrices = prices($asc);
assertTrue("orden=asc devuelve precios en orden ascendente", isAsc($ascPrices));
echo "ASC sample: " . implode(", ", array_slice($ascPrices, 0, 8)) . "\n\n";

/* DESC */
$_GET['orden'] = 'desc';
$desc = $prodFiltro->buscar("");
$descPrices = prices($desc);
assertTrue("orden=desc devuelve precios en orden descendente", isDesc($descPrices));
echo "DESC sample: " . implode(", ", array_slice($descPrices, 0, 8)) . "\n\n";

/* Inválido => debería comportarse como DESC */
$_GET['orden'] = 'invalido';
$inv = $prodFiltro->buscar("");
$invPrices = prices($inv);
assertTrue("orden inválido se comporta como desc", isDesc($invPrices));
echo "INVALID sample: " . implode(", ", array_slice($invPrices, 0, 8)) . "\n\n";

/* Sin orden => por defecto desc en tu clase */
unset($_GET['orden']);
$def = $prodFiltro->buscar("");
$defPrices = prices($def);
assertTrue("sin orden => por defecto desc", isDesc($defPrices));
echo "DEFAULT sample: " . implode(", ", array_slice($defPrices, 0, 8)) . "\n";