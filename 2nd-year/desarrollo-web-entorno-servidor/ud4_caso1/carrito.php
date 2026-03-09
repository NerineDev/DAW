<?php
session_start();
if (!isset($_SESSION['cart'])) {
	$_SESSION['cart'] = [];
}

// Remove from cart
if (isset($_POST['remove_from_cart'])) {
	$productId = intval($_POST['product_id'] ?? 0);
	if ($productId > 0 && isset($_SESSION['cart'][$productId])) {
		unset($_SESSION['cart'][$productId]);
	}
}

require_once __DIR__.'/datos/repo.php';
$repo = new Repo();
$products = $repo->buscar("");
$cartItems = [];
foreach ($products as $p) {
	if (isset($_SESSION['cart'][$p['id']])) {
		$cartItems[] = $p + ['qty' => $_SESSION['cart'][$p['id']]];
	}
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Carrito</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<h1>Carrito de la compra</h1>
	<?php if (empty($cartItems)): ?>
		<p>El carrito está vacío.</p>
	<?php else: ?>
		<ul>
		<?php foreach ($cartItems as $item): ?>
			<li>
				<?= htmlspecialchars($item['name']) ?> (x<?= intval($item['qty']) ?>) - <?= number_format($item['price'],2) ?> €
				<form method="post" style="display:inline">
					<input type="hidden" name="product_id" value="<?= intval($item['id']) ?>">
					<button type="submit" name="remove_from_cart">Quitar</button>
				</form>
			</li>
		<?php endforeach; ?>
		</ul>
	<?php endif; ?>
	<a href="index.php">Volver al catálogo</a>
</body>
</html>
