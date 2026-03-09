<?php
require_once __DIR__ . '/conexion.php';

/**
 * Capa de acceso a datos para la tabla productos.
 * Expone operaciones CRUD con sentencias preparadas.
 */
class Repo {
    private PDO $db;
    private bool $soportaIngles = false;

    public function __construct(?PDO $db = null) {
        global $conexion;
        $this->db = $db ?? $conexion;
        $this->soportaIngles = $this->comprobarColumnasIngles();
    }

    private function comprobarColumnasIngles(): bool {
        try {
            // Verifica si existen columnas opcionales de traducción en la tabla productos.
            $sql = "SELECT COUNT(*) AS total
                    FROM information_schema.COLUMNS
                    WHERE TABLE_SCHEMA = DATABASE()
                      AND TABLE_NAME = 'productos'
                      AND COLUMN_NAME IN ('nombre_en', 'descripcion_en', 'categoria_en')";
            $stmt = $this->db->query($sql);
            $row = $stmt->fetch();
            return ((int)($row['total'] ?? 0)) === 3;
        } catch (Throwable $e) {
            return false;
        }
    }

    /**
     * Devuelve todos los productos o los productos filtrados por término.
     * Los campos para el frontend se normalizan a: id, nombre, descripcion, categoria, precio, imagen.
     */
    public function buscar(string $term = '', string $orden = 'desc', string $categoria = '', string $idioma = 'es'): array {
        // Normalización de entrada para evitar espacios sobrantes en filtros.
        $term = trim($term);
        $categoria = trim($categoria);
        $ordenSql = strtolower($orden) === 'asc' ? 'ASC' : 'DESC';
        $usarIngles = $this->soportaIngles && strtolower($idioma) === 'en';

        // Selección dinámica de columnas (ES por defecto, EN con respaldo si existe traducción).
        $campoNombre = $usarIngles ? "IFNULL(NULLIF(nombre_en, ''), nombre)" : 'nombre';
        $campoDescripcion = $usarIngles ? "IFNULL(NULLIF(descripcion_en, ''), descripcion)" : 'descripcion';
        $campoCategoria = $usarIngles ? "IFNULL(NULLIF(categoria_en, ''), categoria)" : 'categoria';

        $where = [];
        $params = [];

        if ($term !== '') {
            // Búsqueda por coincidencia parcial en nombre, categoría o descripción.
            $where[] = "({$campoNombre} LIKE :termNombre OR {$campoCategoria} LIKE :termCategoria OR {$campoDescripcion} LIKE :termDescripcion)";
            $like = '%' . $term . '%';
            $params[':termNombre'] = $like;
            $params[':termCategoria'] = $like;
            $params[':termDescripcion'] = $like;
        }

        if ($categoria !== '') {
            // Filtro exacto de categoría cuando el usuario selecciona una opción concreta.
            $where[] = "{$campoCategoria} = :categoriaFiltro";
            $params[':categoriaFiltro'] = $categoria;
        }

        $sql = "SELECT
                    id,
                    {$campoNombre} AS nombre,
                    {$campoDescripcion} AS descripcion,
                    {$campoCategoria} AS categoria,
                    precio,
                    imagen,
                    creado_en
                FROM productos
                ORDER BY precio {$ordenSql}";

        if (!empty($where)) {
            // Inserta condiciones WHERE antes del ORDER BY para mantener una única plantilla SQL.
            $sql = str_replace('ORDER BY', 'WHERE ' . implode(' AND ', $where) . ' ORDER BY', $sql);
        }

        $stmt = $this->db->prepare($sql);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value, PDO::PARAM_STR);
        }
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function obtenerCategorias(string $idioma = 'es'): array {
        // Devuelve categorías únicas para poblar filtros del frontend.
        $usarIngles = $this->soportaIngles && strtolower($idioma) === 'en';
        $campoCategoria = $usarIngles ? "IFNULL(NULLIF(categoria_en, ''), categoria)" : 'categoria';
        $stmt = $this->db->query("SELECT DISTINCT {$campoCategoria} AS categoria FROM productos ORDER BY {$campoCategoria} ASC");
        $rows = $stmt->fetchAll();
        return array_values(array_map(fn($row) => (string)$row['categoria'], $rows));
    }

    public function crear(array $data): int {
        // Inserta producto nuevo y, si aplica, sus campos de traducción.
        if ($this->soportaIngles) {
            $sql = "INSERT INTO productos (nombre, descripcion, categoria, precio, imagen, nombre_en, descripcion_en, categoria_en)
                    VALUES (:nombre, :descripcion, :categoria, :precio, :imagen, :nombre_en, :descripcion_en, :categoria_en)";
        } else {
            $sql = "INSERT INTO productos (nombre, descripcion, categoria, precio, imagen)
                    VALUES (:nombre, :descripcion, :categoria, :precio, :imagen)";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':nombre', $data['nombre']);
        $stmt->bindValue(':descripcion', $data['descripcion']);
        $stmt->bindValue(':categoria', $data['categoria']);
        $stmt->bindValue(':precio', $data['precio']);
        if (($data['imagen'] ?? null) === null || $data['imagen'] === '') {
            // Si no se aporta imagen se guarda NULL para mantener consistencia con el frontend.
            $stmt->bindValue(':imagen', null, PDO::PARAM_NULL);
        } else {
            $stmt->bindValue(':imagen', $data['imagen'], PDO::PARAM_STR);
        }
        if ($this->soportaIngles) {
            $stmt->bindValue(':nombre_en', $data['nombre_en'] ?? null);
            $stmt->bindValue(':descripcion_en', $data['descripcion_en'] ?? null);
            $stmt->bindValue(':categoria_en', $data['categoria_en'] ?? null);
        }
        $stmt->execute();

        return (int)$this->db->lastInsertId();
    }

    public function actualizar(int $id, array $data): bool {
        // Actualiza producto existente por ID, incluyendo traducciones cuando están disponibles.
        if ($this->soportaIngles) {
            $setSql = [
                'nombre = :nombre',
                'descripcion = :descripcion',
                'categoria = :categoria',
                'precio = :precio',
                'imagen = :imagen',
            ];
            if (array_key_exists('nombre_en', $data)) {
                $setSql[] = 'nombre_en = :nombre_en';
            }
            if (array_key_exists('descripcion_en', $data)) {
                $setSql[] = 'descripcion_en = :descripcion_en';
            }
            if (array_key_exists('categoria_en', $data)) {
                $setSql[] = 'categoria_en = :categoria_en';
            }
            $sql = "UPDATE productos SET " . implode(', ', $setSql) . " WHERE id = :id";
        } else {
            $sql = "UPDATE productos
                    SET nombre = :nombre,
                        descripcion = :descripcion,
                        categoria = :categoria,
                        precio = :precio,
                        imagen = :imagen
                    WHERE id = :id";
        }

        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->bindValue(':nombre', $data['nombre']);
        $stmt->bindValue(':descripcion', $data['descripcion']);
        $stmt->bindValue(':categoria', $data['categoria']);
        $stmt->bindValue(':precio', $data['precio']);
        if (($data['imagen'] ?? null) === null || $data['imagen'] === '') {
            // Permite limpiar la imagen (valor NULL) si el usuario deja el campo vacío.
            $stmt->bindValue(':imagen', null, PDO::PARAM_NULL);
        } else {
            $stmt->bindValue(':imagen', $data['imagen'], PDO::PARAM_STR);
        }
        if ($this->soportaIngles) {
            if (array_key_exists('nombre_en', $data)) {
                $stmt->bindValue(':nombre_en', $data['nombre_en']);
            }
            if (array_key_exists('descripcion_en', $data)) {
                $stmt->bindValue(':descripcion_en', $data['descripcion_en']);
            }
            if (array_key_exists('categoria_en', $data)) {
                $stmt->bindValue(':categoria_en', $data['categoria_en']);
            }
        }
        return $stmt->execute();
    }

    public function eliminar(int $id): bool {
        // Eliminación física del registro de producto por clave primaria.
        $stmt = $this->db->prepare('DELETE FROM productos WHERE id = :id');
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function obtenerPorId(int $id, string $idioma = 'es'): ?array {
        // Consulta puntual para devolver el estado final de un producto tras crear/actualizar.
        $usarIngles = $this->soportaIngles && strtolower($idioma) === 'en';
        $campoNombre = $usarIngles ? "IFNULL(NULLIF(nombre_en, ''), nombre)" : 'nombre';
        $campoDescripcion = $usarIngles ? "IFNULL(NULLIF(descripcion_en, ''), descripcion)" : 'descripcion';
        $campoCategoria = $usarIngles ? "IFNULL(NULLIF(categoria_en, ''), categoria)" : 'categoria';

        $stmt = $this->db->prepare("SELECT
                                        id,
                                        {$campoNombre} AS nombre,
                                        {$campoDescripcion} AS descripcion,
                                        {$campoCategoria} AS categoria,
                                        precio,
                                        imagen,
                                        creado_en
                                    FROM productos
                                    WHERE id = :id");
        $stmt->bindValue(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $row = $stmt->fetch();
        return $row ?: null;
    }
}
