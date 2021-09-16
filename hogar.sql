-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 15-09-2021 a las 00:46:49
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
-- Estructura de tabla para la tabla `gastos`
--

DROP TABLE IF EXISTS `gastos`;
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_individuo` int(11) NOT NULL,
  `gasto` int(11) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `gastos`
--

INSERT INTO `gastos` (`id`, `id_individuo`, `gasto`, `categoria`, `fecha`) VALUES
(2, 23, 4242, 'carniceria', '2021-09-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hogar`
--

DROP TABLE IF EXISTS `hogar`;
CREATE TABLE IF NOT EXISTS `hogar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(80) NOT NULL,
  `altura` int(11) NOT NULL,
  `alquiler` int(11) NOT NULL,
  `cantidad_integrantes` int(11) NOT NULL,
  `estado_de_pago` varchar(20) DEFAULT NULL,
  `id_admin` int(11) DEFAULT NULL,
  `id_admin2` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hogar`
--

INSERT INTO `hogar` (`id`, `calle`, `altura`, `alquiler`, `cantidad_integrantes`, `estado_de_pago`, `id_admin`, `id_admin2`) VALUES
(17, 'BARTOLOME MITRE', 1371, 25000, 4, NULL, 28, NULL),
(16, 'CERRITO', 1185, 25000, 4, NULL, 23, NULL);

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
  `id_domicilio` int(11) DEFAULT NULL,
  `admin` int(11) NOT NULL DEFAULT '0',
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `inquilino`
--

INSERT INTO `inquilino` (`id`, `documento`, `nombre`, `apellido`, `email`, `id_domicilio`, `admin`, `password`) VALUES
(23, 36212682, 'Diego', 'Villegas', 'kiquino@gmail.com', 16, 1, '81dc9bdb52d04dc20036dbd8313ed055'),
(24, 36212382, 'Juan', 'Santoro', 'juanpe.santoro@gmail.com', 16, 0, '81dc9bdb52d04dc20036dbd8313ed055'),
(25, 35030293, 'Julian', 'Luchelli', 'Jl@gmail.com', 16, 0, '81dc9bdb52d04dc20036dbd8313ed055'),
(28, 1234567, 'Isa', 'Bel', 'kiquino@gmail.com', 17, 0, '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(80) NOT NULL,
  `fecha_pago` date NOT NULL,
  `monto` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `id_domicilio` varchar(20) NOT NULL,
  `gasto` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `id_domicilio`, `gasto`) VALUES
(2, 'Gas', '16', 1234);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
