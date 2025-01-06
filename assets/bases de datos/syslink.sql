-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-01-2025 a las 17:30:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `syslink`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afiliados`
--

CREATE TABLE `afiliados` (
  `af_id` int(11) NOT NULL,
  `af_nombre` varchar(50) NOT NULL,
  `af_apellidos` varchar(50) NOT NULL,
  `af_provincia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `afiliados`
--

INSERT INTO `afiliados` (`af_id`, `af_nombre`, `af_apellidos`, `af_provincia`) VALUES
(1, 'Manolo', 'García Nuez', 'Valencia'),
(2, 'Pedro', 'Gutiérrez Martín', 'Madrid'),
(3, 'Dionisio', 'Vargas Escobar', 'Barcelona'),
(6, 'Juan', 'Pérez López', 'Madrid'),
(7, 'María', 'García Fernández', 'Barcelona'),
(8, 'Antonio', 'Rodríguez Martínez', 'Valencia'),
(9, 'Laura', 'Hernández Gómez', 'Sevilla'),
(10, 'Carlos', 'Sánchez Ruiz', 'Málaga'),
(11, 'Sofía', 'Ramírez Torres', 'Bilbao'),
(12, 'Luis', 'Martínez Castro', 'Zaragoza'),
(13, 'Carmen', 'López Morales', 'Granada'),
(14, 'Javier', 'González Ortiz', 'Alicante'),
(15, 'Isabel', 'Díaz Romero', 'Valladolid');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `afiliados_servicios`
--

CREATE TABLE `afiliados_servicios` (
  `as_af_id` int(11) NOT NULL,
  `as_serv_id` int(11) NOT NULL,
  `as_precio` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `afiliados_servicios`
--

INSERT INTO `afiliados_servicios` (`as_af_id`, `as_serv_id`, `as_precio`) VALUES
(1, 1, 39.99),
(2, 2, 20.00),
(3, 3, 15.00),
(15, 7, 40.00),
(10, 4, 10.00),
(13, 11, 39.00),
(11, 12, 67.99),
(12, 9, 35.00),
(10, 8, 20.00),
(7, 5, 17.00),
(6, 10, 5.00),
(14, 13, 50.00),
(9, 5, 15.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `serv_id` int(11) NOT NULL,
  `serv_nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`serv_id`, `serv_nombre`) VALUES
(1, 'Reparacion de procesadores'),
(2, 'Antivirus'),
(3, 'Actualización de drivers'),
(4, 'Reparación de periféricos'),
(5, 'Mantenimiento de equipos'),
(7, 'Instalación de sistemas operativos'),
(8, 'Limpieza de virus y malware'),
(9, 'Recuperación de datos'),
(10, 'Configuración de redes'),
(11, 'Soporte técnico remoto'),
(12, 'Montaje de ordenadores a medida'),
(13, 'Optimización del rendimiento del sistema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(11) NOT NULL,
  `usu_nombre` varchar(50) NOT NULL,
  `usu_apellidos` varchar(50) NOT NULL,
  `usu_password` varchar(50) NOT NULL,
  `usu_dni` varchar(9) NOT NULL,
  `usu_domicilio` varchar(100) NOT NULL,
  `usu_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_nombre`, `usu_apellidos`, `usu_password`, `usu_dni`, `usu_domicilio`, `usu_admin`) VALUES
(1, 'Claudia', 'Candelas Oviedo', 'claudia', '11111111R', 'calle falsa, 1', 1),
(2, 'Eduardo Daniel', 'Franco', 'eduardo', '22222222T', 'calle falsa, 2', 1),
(3, 'Maria', 'Chaparro Caballero', 'maria', '33333333V', 'calle falsa, 3', 1),
(4, 'Julio', 'López Andrómeda', 'julio', '44444444F', 'calle falsa cliente, 24', 0),
(5, 'Julia', 'Perez', 'Riesco', '55555555K', 'calle falsa cliente, 5', 0),
(6, 'Mercedes', 'Arganda Mayoral', 'mercedes', '66666666L', 'calle falsa cliente, 6', 0),
(7, 'Javier', 'Soriano Mordan', 'javier', '77777777R', 'calle falsa cliente, 7', 0),
(8, 'Juan', 'Blazquez Ruiz', 'juan', '88888888M', 'calle falsa cliente, 8', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_servicios`
--

CREATE TABLE `usuarios_servicios` (
  `us_usu_id` int(11) NOT NULL,
  `us_serv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios_servicios`
--

INSERT INTO `usuarios_servicios` (`us_usu_id`, `us_serv_id`) VALUES
(4, 1),
(7, 2),
(1, 2),
(4, 1),
(8, 7),
(6, 11),
(6, 9);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `afiliados`
--
ALTER TABLE `afiliados`
  ADD PRIMARY KEY (`af_id`);

--
-- Indices de la tabla `afiliados_servicios`
--
ALTER TABLE `afiliados_servicios`
  ADD KEY `r_afi_afiliado` (`as_af_id`),
  ADD KEY `r_service_servicio_afiliado` (`as_serv_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`serv_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`);

--
-- Indices de la tabla `usuarios_servicios`
--
ALTER TABLE `usuarios_servicios`
  ADD KEY `r_user_usuario` (`us_usu_id`),
  ADD KEY `r_service_servicio` (`us_serv_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `afiliados`
--
ALTER TABLE `afiliados`
  MODIFY `af_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `serv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `afiliados_servicios`
--
ALTER TABLE `afiliados_servicios`
  ADD CONSTRAINT `r_afi_afiliado` FOREIGN KEY (`as_af_id`) REFERENCES `afiliados` (`af_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `r_service_servicio_afiliado` FOREIGN KEY (`as_serv_id`) REFERENCES `servicios` (`serv_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_servicios`
--
ALTER TABLE `usuarios_servicios`
  ADD CONSTRAINT `r_service_servicio` FOREIGN KEY (`us_serv_id`) REFERENCES `servicios` (`serv_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `r_user_usuario` FOREIGN KEY (`us_usu_id`) REFERENCES `usuarios` (`usu_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
