<?php
// API principal de productos.
// Expone operaciones de listado, creación, actualización y eliminación con respuesta JSON.
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../datos/repo.php';
require_once __DIR__ . '/prod.php';
require_once __DIR__ . '/prodfiltro.php';

function jsonResponse(array $payload, int $status = 200): void {
  // Función auxiliar común para devolver respuestas JSON homogéneas.
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  exit;
}

function getInputData(): array {
  // Soporta payload POST tanto en form-data como en JSON crudo.
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST)) {
      return $_POST;
    }

    $raw = file_get_contents('php://input');
    if (!$raw) return [];
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
  }

  return $_GET;
}

function validateProductData(array $data): array {
  // Validación de negocio y sanitización básica de campos de producto.
  $nombre = trim((string)($data['nombre'] ?? ''));
  $descripcion = trim((string)($data['descripcion'] ?? ''));
  $categoria = trim((string)($data['categoria'] ?? ''));
  $precioRaw = $data['precio'] ?? '';
  $imagen = trim((string)($data['imagen'] ?? ''));

  if ($nombre === '' || mb_strlen($nombre) < 2 || mb_strlen($nombre) > 100) {
    return ['ok' => false, 'message' => 'Nombre inválido (2-100 caracteres).'];
  }
  if ($descripcion === '' || mb_strlen($descripcion) < 5) {
    return ['ok' => false, 'message' => 'Descripción inválida (mínimo 5 caracteres).'];
  }
  if ($categoria === '' || mb_strlen($categoria) > 100) {
    return ['ok' => false, 'message' => 'Categoría inválida (1-100 caracteres).'];
  }
  if (!is_numeric($precioRaw) || (float)$precioRaw < 0) {
    return ['ok' => false, 'message' => 'Precio inválido (número >= 0).'];
  }
  if ($imagen !== '' && !preg_match('/^[a-zA-Z0-9._-]+$/', $imagen)) {
    return ['ok' => false, 'message' => 'Imagen inválida (solo nombre de archivo).'];
  }

  $cleanData = [
    'nombre' => $nombre,
    'descripcion' => $descripcion,
    'categoria' => $categoria,
    'precio' => number_format((float)$precioRaw, 2, '.', ''),
    'imagen' => $imagen === '' ? null : $imagen,
  ];

  if (array_key_exists('nombre_en', $data)) {
    $cleanData['nombre_en'] = trim((string)$data['nombre_en']);
  }
  if (array_key_exists('descripcion_en', $data)) {
    $cleanData['descripcion_en'] = trim((string)$data['descripcion_en']);
  }
  if (array_key_exists('categoria_en', $data)) {
    $cleanData['categoria_en'] = trim((string)$data['categoria_en']);
  }

  return [
    'ok' => true,
    'data' => $cleanData,
  ];
}

try {
  $repo = new Repo();
  $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
  $input = getInputData();

  if ($method === 'GET') {
    // Rama de consulta: listado completo, búsqueda, filtros y categorías.
    $idioma = strtolower(trim((string)($input['idioma'] ?? ($input['lang'] ?? 'es'))));
    if ($idioma !== 'en') $idioma = 'es';

    $accion = strtolower((string)($input['accion'] ?? ($input['action'] ?? '')));
    if ($accion === 'categorias' || $accion === 'categories') {
      // Endpoint auxiliar para poblar el selector de categorías.
      jsonResponse(['ok' => true, 'data' => $repo->obtenerCategorias($idioma)]);
    }

    $modo = $input['modo'] ?? 'normal';
    $search = (string)($input['buscar'] ?? ($input['search'] ?? ''));
    $orden = (string)($input['orden'] ?? 'desc');
    $categoria = trim((string)($input['categoria'] ?? ''));
    $prod = ($modo === 'filtro') ? new ProdFiltro($repo) : new Prod($repo);
    $resultados = $prod->buscar($search, $orden, $categoria, $idioma);
    jsonResponse(['ok' => true, 'data' => $resultados]);
  }

  if ($method === 'POST') {
    // Rama de mutación: crear, actualizar y eliminar registros.
    $accion = strtolower((string)($input['accion'] ?? ($input['action'] ?? '')));
    $idioma = strtolower(trim((string)($input['idioma'] ?? ($input['lang'] ?? 'es'))));
    if ($idioma !== 'en') $idioma = 'es';

    if ($accion === 'crear' || $accion === 'create') {
      // Alta de producto con validación previa.
      $validation = validateProductData($input);
      if (!$validation['ok']) {
        jsonResponse(['ok' => false, 'message' => $validation['message']], 422);
      }

      $newId = $repo->crear($validation['data']);
      $nuevo = $repo->obtenerPorId($newId, $idioma);
      jsonResponse(['ok' => true, 'message' => 'Producto creado.', 'data' => $nuevo], 201);
    }

    if ($accion === 'actualizar' || $accion === 'update') {
      // Edición de producto existente por ID.
      $id = (int)($input['id'] ?? 0);
      if ($id <= 0) {
        jsonResponse(['ok' => false, 'message' => 'ID inválido.'], 422);
      }

      $validation = validateProductData($input);
      if (!$validation['ok']) {
        jsonResponse(['ok' => false, 'message' => $validation['message']], 422);
      }

      $repo->actualizar($id, $validation['data']);
      $actualizado = $repo->obtenerPorId($id, $idioma);
      jsonResponse(['ok' => true, 'message' => 'Producto actualizado.', 'data' => $actualizado]);
    }

    if ($accion === 'eliminar' || $accion === 'delete') {
      // Baja de producto por ID.
      $id = (int)($input['id'] ?? 0);
      if ($id <= 0) {
        jsonResponse(['ok' => false, 'message' => 'ID inválido.'], 422);
      }

      $repo->eliminar($id);
      jsonResponse(['ok' => true, 'message' => 'Producto eliminado.']);
    }

    jsonResponse(['ok' => false, 'message' => 'Acción no soportada.'], 400);
  }

  jsonResponse(['ok' => false, 'message' => 'Método no permitido.'], 405);
} catch (Throwable $e) {
  jsonResponse(['ok' => false, 'message' => 'Error de servidor: ' . $e->getMessage()], 500);
}
