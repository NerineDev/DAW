<?php
$articles = [
    [
        "title" => "Análisis Where Winds Meet, el 'free to play' más ambicioso del momento (PS5, PC)",
        "category" => "MMORPG",
        "date" => "2025-11-12",
        "img" => "./IMG/where-winds-meet.webp",
        "content" => "Las desarrolladoras chinas pisan fuerte, y esto es algo que ya no resulta extraño. Su importancia en el sector de juegos para móviles está más que demostrado, y ahora apuestan de manera seria en consolas y PC con vistas a entrar en el mercado global (véase el caso de Genshin Impact y el resto de RPGs de Hoyoverse, o el éxito de crítica y ventas Black Myth: Wukong)."
    ],
    [
        "title" => "Análisis de Black Desert Online (2025): ¿Sigue valiendo la pena el 'grind'?",
        "category" => "MMORPG",
        "date" => "2025-12-27",
        "img" => "./IMG/black-desert-online.jpg",
        "content" => "Tras casi una década en el mercado, el título de Pearl Abyss se mantiene como el referente visual de los MMORPG gracias a su reciente actualización de texturas y su inigualable sistema de combate en tiempo real. Aunque la curva de aprendizaje para nuevos usuarios sigue siendo pronunciada, las mejoras en la calidad de vida y el nuevo contenido de la región de Seul en 2025 ofrecen una experiencia más accesible y profunda que nunca. Es un título indispensable para quienes buscan un mundo abierto persistente donde la libertad de progresión y las profesiones son tan importantes como la batalla."
    ],
    [
        "title" => "9 R.I.P.: Romance y terror psicológico en el mundo de los espíritus. Análisis",
        "category" => "Novela Visual",
        "date" => "2025-12-26",
        "img" => "./IMG/9rip.jpg",
        "content" => "Esta novela visual de Idea Factory se ha consolidado en 2025 como una de las experiencias más atmosféricas del género otome en Nintendo Switch. A través de una narrativa que entrelaza leyendas urbanas japonesas con una búsqueda personal de identidad, el juego destaca por su impecable dirección artística y una banda sonora envolvente que acentúa los momentos de tensión. Aunque el ritmo de sus rutas puede ser irregular, la profundidad de sus personajes sobrenaturales y su enfoque en temas maduros como el duelo lo convierten en un título fascinante para quienes buscan una historia emocional con un toque oscuro."
    ],
    [
        "title" => "Neon Clash: Echoes of the Lost. Un intenso drama criminal bajo luces de neón. Análisis",
        "category" => "Novela Visual",
        "date" => "2025-12-25",
        "img" => "./IMG/neon-clash.webp",
        "content" => "¡Regalo de navidad de la desarrolladora Voltage! Hoy ha salido Neon Clash: Echoes of the Lost. Este título redefine el concepto de aventura 'outlaw' al sumergir al jugador en las peligrosas guerras de mafias de la ciudad futurista de Kumyo. Con una protagonista con carácter y un elenco de voces de primer nivel, el juego logra un equilibrio perfecto entre la intriga política y el romance adulto. Su estética ciberpunk y su vibrante banda sonora, compuesta por veteranos de la industria, elevan una trama cruda donde las decisiones morales tienen un peso real en el destino de los bajos fondos. Es una propuesta sólida y refrescante para los fans de las historias de acción y suspense."
    ]
];
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Búsqueda de Artículos</title>
    <link rel="stylesheet" href="./styles_new.css">

</head>
<body>
<div class="page">
<h1>Catálogo de Reseñas de Videojuegos</h1>
<form method="GET" action="index.php">
   <input type="hidden" name="doSearch" value="1">   
  <label>
    Palabra clave:
    <input type="text" name="keyword" value="<?= htmlspecialchars($_GET['keyword'] ?? '') ?>">
  </label>

  <label>
    Categoría:
    <select name="category">
      <option value="">Todas</option>
      <option value="MMORPG" <?= (($_GET['category'] ?? '') === 'MMORPG') ? 'selected' : '' ?>>MMORPG</option>
      <option value="Novela Visual" <?= (($_GET['category'] ?? '') === 'Novela Visual') ? 'selected' : '' ?>>Novela Visual</option>
    </select>
  </label>

  <button type="submit">Buscar</button>
</form>

<?php
$hasSearch = isset($_GET['doSearch']) && $_GET['doSearch'] === '1';

$filteredArticles = [];

foreach ($articles as $article) {
    $match = true;

    if (!empty($_GET['keyword'])) {
        $kw = trim($_GET['keyword']);
        if (
            stripos($article['title'], $kw) === false &&
            stripos($article['content'], $kw) === false
        ) {
            $match = false;
        }
    }

    if (!empty($_GET['category'])) {
        if ($article['category'] !== $_GET['category']) {
            $match = false;
        }
    }

    if ($match) {
        $filteredArticles[] = $article;
    }
}
?>

<?php if (!$hasSearch): ?>
    <br>
    <p class="hint">Usa el buscador para ver resultados.</p>

<?php else: ?>

    <?php if (empty($filteredArticles)): ?>
        <br>
        <p class="no-results">No se han encontrado artículos con los criterios seleccionados.</p>
    <?php else: ?>
        <?php foreach ($filteredArticles as $article): ?>
            <article>
                <h2><?= htmlspecialchars($article['title']) ?></h2>

            <?php if (!empty($article['img'])): ?>
                <img
                    src="<?= htmlspecialchars($article['img']) ?>"
                    alt="<?= htmlspecialchars($article['title']) ?>"
                >
            <?php endif; ?>

            <p><strong>Categoría:</strong> <?= htmlspecialchars($article['category']) ?></p>
            <p><strong>Fecha:</strong> <?= htmlspecialchars($article['date']) ?></p>
            <p><?= htmlspecialchars($article['content']) ?></p>

            </article>
        <?php endforeach; ?>

    <?php endif; ?>

<?php endif; ?>
  </div>
</body>
</html>
