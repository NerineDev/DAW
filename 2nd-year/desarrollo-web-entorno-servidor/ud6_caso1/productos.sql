-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2026 at 10:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tienda_ud6`
--

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `nombre_en` varchar(100) DEFAULT NULL,
  `descripcion` text NOT NULL,
  `descripcion_en` text DEFAULT NULL,
  `categoria` varchar(100) NOT NULL,
  `categoria_en` varchar(100) DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `nombre_en`, `descripcion`, `descripcion_en`, `categoria`, `categoria_en`, `precio`, `imagen`, `creado_en`) VALUES
(1, 'Teclado mecánico', 'Mechanical keyboard', 'Teclado con diseño mecánico orientado a escritura y juego', 'Mechanical design keyboard focused on typing and gaming', 'Periféricos', 'Peripherals', 59.90, 'teclado.jpg', '2026-03-08 19:19:22'),
(2, 'Ratón inalámbrico', 'Wireless mouse', 'Ratón inalámbrico ergonómico para uso diario', 'Ergonomic wireless mouse for daily use', 'Periféricos', 'Peripherals', 24.50, 'raton.jpg', '2026-03-08 19:19:22'),
(3, 'Monitor 24\"', '24\" monitor', 'Monitor de 24 pulgadas adecuado para trabajo y contenido multimedia', '24-inch monitor suitable for work and multimedia content', 'Pantallas', 'Displays', 139.00, 'monitor.jpg', '2026-03-08 19:19:22'),
(4, 'USB-C Hub', 'USB-C hub', 'Adaptador multipuerto USB-C para ampliar conexiones', 'Multiport USB-C adapter to expand connectivity', 'Accesorios', 'Accessories', 29.95, 'hub.jpg', '2026-03-08 19:19:22'),
(5, 'Monitor 27\"', '27\" monitor', 'Monitor de 27 pulgadas con resolución Full HD para trabajo y ocio', '27-inch Full HD monitor for work and entertainment', 'Pantallas', 'Displays', 189.00, 'monitor27.jpg', '2026-03-08 19:19:49'),
(6, 'Soporte para portátil', 'Laptop stand', 'Soporte ajustable para mejorar la ergonomía del portátil', 'Adjustable stand to improve laptop ergonomics', 'Accesorios', 'Accessories', 34.90, 'soporte.jpg', '2026-03-08 19:19:49'),
(7, 'Auriculares inalámbricos', 'Wireless headphones', 'Auriculares Bluetooth con sonido estéreo y micrófono integrado', 'Bluetooth headphones with stereo sound and integrated microphone', 'Audio', 'Audio', 79.95, 'auriculares.jpg', '2026-03-08 19:19:49'),
(8, 'Altavoces compactos', 'Compact speakers', 'Pareja de altavoces compactos para escritorio', 'Pair of compact desktop speakers', 'Audio', 'Audio', 45.50, 'altavoces.jpg', '2026-03-08 19:19:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
