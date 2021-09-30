-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 30, 2021 at 08:20 PM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hogar`
--

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

DROP TABLE IF EXISTS `compra`;
CREATE TABLE IF NOT EXISTS `compra` (
  `fecha` date DEFAULT NULL,
  `id_inquilino` int(11) NOT NULL,
  `id_compra` int(11) NOT NULL,
  PRIMARY KEY (`id_inquilino`,`id_compra`),
  KEY `id_compra` (`id_compra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`fecha`, `id_inquilino`, `id_compra`) VALUES
('2021-09-01', 23, 2);

-- --------------------------------------------------------

--
-- Table structure for table `gastos`
--

DROP TABLE IF EXISTS `gastos`;
CREATE TABLE IF NOT EXISTS `gastos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `valor` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `gastos`
--

INSERT INTO `gastos` (`id`, `nombre`, `valor`) VALUES
(2, 'mayonesa', 4242),
(4, 'papas', 300);

-- --------------------------------------------------------

--
-- Table structure for table `hogar`
--

DROP TABLE IF EXISTS `hogar`;
CREATE TABLE IF NOT EXISTS `hogar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(80) NOT NULL,
  `altura` int(11) NOT NULL,
  `alquiler` int(11) NOT NULL,
  `id_admin` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hogar`
--

INSERT INTO `hogar` (`id`, `calle`, `altura`, `alquiler`, `id_admin`) VALUES
(16, 'CERRITO', 1185, 25000, 23),
(17, 'BARTOLOME MITRE', 1371, 25000, 28);

-- --------------------------------------------------------

--
-- Table structure for table `inquilino`
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
  PRIMARY KEY (`id`),
  KEY `id_domicilio` (`id_domicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inquilino`
--

INSERT INTO `inquilino` (`id`, `documento`, `nombre`, `apellido`, `email`, `id_domicilio`, `admin`, `password`) VALUES
(23, 36212682, 'Diego', 'Villegas', 'kiquino@gmail.com', 16, 1, '81dc9bdb52d04dc20036dbd8313ed055'),
(24, 36212382, 'Juan', 'Santoro', 'juanpe.santoro@gmail.com', 16, 0, '81dc9bdb52d04dc20036dbd8313ed055'),
(25, 35030293, 'Julian', 'Luchelli', 'Jl@gmail.com', 16, 0, '81dc9bdb52d04dc20036dbd8313ed055'),
(28, 1234567, 'Isa', 'Bel', 'kiquino@gmail.com', 17, 0, '81dc9bdb52d04dc20036dbd8313ed055');

-- --------------------------------------------------------

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_pago` date NOT NULL,
  `id_inquilino` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_inquilino` (`id_inquilino`),
  KEY `id_servicio` (`id_servicio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pago_mes`
--

DROP TABLE IF EXISTS `pago_mes`;
CREATE TABLE IF NOT EXISTS `pago_mes` (
  `id` int(11) NOT NULL,
  `id_domicilio` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_domicilio` (`id_domicilio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `valor` int(11) NOT NULL,
  `id_domicilio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `test` (`id_domicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `servicios`
--

INSERT INTO `servicios` (`id`, `nombre`, `valor`, `id_domicilio`) VALUES
(2, 'Gas', 1234, 16);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`id_compra`) REFERENCES `gastos` (`id`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`id_inquilino`) REFERENCES `inquilino` (`id`);

--
-- Constraints for table `inquilino`
--
ALTER TABLE `inquilino`
  ADD CONSTRAINT `inquilino_ibfk_1` FOREIGN KEY (`id_domicilio`) REFERENCES `hogar` (`id`);

--
-- Constraints for table `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_inquilino`) REFERENCES `inquilino` (`id`),
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id`);

--
-- Constraints for table `pago_mes`
--
ALTER TABLE `pago_mes`
  ADD CONSTRAINT `pago_mes_ibfk_1` FOREIGN KEY (`id_domicilio`) REFERENCES `hogar` (`id`);

--
-- Constraints for table `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `test` FOREIGN KEY (`id_domicilio`) REFERENCES `hogar` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
