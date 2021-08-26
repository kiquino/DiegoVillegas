-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-08-2021 a las 20:43:04
-- Versión del servidor: 5.7.31
-- Versión de PHP: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `hogar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inquilino`
--

DROP TABLE IF EXISTS `inquilino`;
CREATE TABLE IF NOT EXISTS `inquilino` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documento` int(20) NOT NULL,
  `nombre` varchar(80) NOT NULL,
  `apellido` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inquilino`
--

INSERT INTO `inquilino` (`id`, `documento`, `nombre`, `apellido`, `email`, `password`) VALUES
(1, 36212382, 'Jose', 'Santos', 'santos@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(3, 11223344, 'Pipa', 'Tata', 'pita@tata.com', 'd93591bdf7860e1e4ee2fca799911215'),
(4, 1, 'Bruno', 'Diaz', 'bd@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055'),
(5, 1234, 'Diego', 'Villegas', 'Villegas', '81dc9bdb52d04dc20036dbd8313ed055'),
(8, 123455, 'ej', 'ej', 'ej', '81dc9bdb52d04dc20036dbd8313ed055'),
(7, 123455, 'ej', 'ej', 'ej', '81dc9bdb52d04dc20036dbd8313ed055');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
