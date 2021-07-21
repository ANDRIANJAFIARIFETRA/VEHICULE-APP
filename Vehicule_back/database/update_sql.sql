-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 21, 2021 at 10:17 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicule`
--

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `code_cat` varchar(50) NOT NULL,
  `libelle_cat` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`code_cat`, `libelle_cat`) VALUES
('44', '4x4'),
('BACHE', 'Baché'),
('BUS', 'Bus'),
('CAMION', 'Camion'),
('CAMIONNTT', 'Camionnette'),
('DROUES', 'Deux Roues'),
('ENGIN', 'Engin'),
('FOURGON', 'Fourgon'),
('MINIBUS', 'Mini-bus'),
('PICKUP', 'Pick-up'),
('PLAISIR', 'Plaisir'),
('TRACTEUR', 'Tracteur'),
('VFML', 'Familiale');

-- --------------------------------------------------------

--
-- Table structure for table `marque`
--

CREATE TABLE `marque` (
  `code_marque` varchar(50) NOT NULL,
  `libelle_marque` varchar(150) NOT NULL,
  `img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `marque`
--

INSERT INTO `marque` (`code_marque`, `libelle_marque`, `img`) VALUES
('DAF', 'DAF', 'DAF-logo-EEBC131CD1-seeklogo.com.png'),
('FIAT', 'FIAT', 'fiat-750x410.jpg'),
('FORD', 'Ford', 'ford-750x410.jpg'),
('HYUNDAY', 'Hyunday', 'hyundai.jpg'),
('IVECO', 'Iveco', 'Iveco-Logo.png'),
('MAZDA', 'Mazda', 'mazda-750x410.jpg'),
('MERCEDESS', 'Mercedess', 'mercedes-750x410.jpg'),
('NISSAN', 'Nissan', 'nissan-750x410.jpg'),
('OPEL', 'Opel', 'opel-750x410.jpg'),
('PEGEOT', 'Peugeot ', 'peugeot-750x410.jpg'),
('RENAULT', 'Renault', 'renault-750x410.jpg'),
('SCANIA', 'Scania  ', 'Scania-Logo.png'),
('TOYOTA', 'Toyota', 'toyota-750x410.jpg'),
('VLKSWGN', 'VolksWagen', 'volkswagen-750x410.jpg'),
('VOLVO', 'Volvo', 'volvo-750x410.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `vehicule`
--

CREATE TABLE `vehicule` (
  `code_vehicule` varchar(50) NOT NULL,
  `libelle_vehicule` varchar(150) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `code_cat_fk` varchar(50) NOT NULL,
  `code_marque_fk` varchar(50) NOT NULL,
  `desc_vehicule` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicule`
--

INSERT INTO `vehicule` (`code_vehicule`, `libelle_vehicule`, `photo`, `code_cat_fk`, `code_marque_fk`, `desc_vehicule`) VALUES
('VHCL-001', 'DAF XF FT XF 105 Space Cab St 7.5 N', 'dax-xf-105.jpg', 'TRACTEUR', 'DAF', 'DAF XF de couleur Jaune moutard '),
('VHCL-002', 'Volvo FH 16 460', '1162_663544426943.jpg', 'TRACTEUR', 'VOLVO', 'Belle Volvo de couleur noir '),
('VHCL-003', 'Actross Mercedess', 'S7-gamme--mercedes-actros.jpg', 'TRACTEUR', 'MERCEDESS', 'Belle Actrosse de couleur grenat'),
('VHCL-004', 'Scania S 730', 'unnamed.jpg', 'TRACTEUR', 'SCANIA', 'Scania S 730 Highline'),
('VHCL-005', 'Scania R 480 ', 'Scania_R480_Highline.jpeg', 'TRACTEUR', 'SCANIA', 'Scania R Streamline  de couleur gris rose teinté'),
('VHCL-006', 'DAF XF Euro ', 'daf-xf-530-fts-nordic-edition,27232abd.jpg', 'TRACTEUR', 'DAF', 'Daf xf Occasion Europe, couleur Blanche'),
('VHCL-007', 'IVECO Stralis AD 440', 'iveco-stralis-4X2.jpg', 'TRACTEUR', 'IVECO', 'Injection à rampe commune - gestion électronique de l’injection - filtre à combustible principal multi-filtration');

-- --------------------------------------------------------

--
-- Stand-in structure for view `vehicule_view`
-- (See below for the actual view)
--
CREATE TABLE `vehicule_view` (
`code_vehicule` varchar(50)
,`libelle_vehicule` varchar(150)
,`photo` varchar(255)
,`libelle_marque` varchar(150)
,`code_marque_fk` varchar(50)
,`img_marque` varchar(255)
,`code_cat_fk` varchar(50)
,`libelle_cat` varchar(150)
,`desc_vehicule` text
);

-- --------------------------------------------------------

--
-- Structure for view `vehicule_view`
--
DROP TABLE IF EXISTS `vehicule_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vehicule_view`  AS   (select `vh`.`code_vehicule` AS `code_vehicule`,`vh`.`libelle_vehicule` AS `libelle_vehicule`,`vh`.`photo` AS `photo`,`mq`.`libelle_marque` AS `libelle_marque`,`mq`.`code_marque` AS `code_marque_fk`,`mq`.`img` AS `img_marque`,`ct`.`code_cat` AS `code_cat_fk`,`ct`.`libelle_cat` AS `libelle_cat`,`vh`.`desc_vehicule` AS `desc_vehicule` from ((`vehicule` `vh` join `marque` `mq` on(`mq`.`code_marque` = `vh`.`code_marque_fk`)) join `categorie` `ct` on(`ct`.`code_cat` = `vh`.`code_cat_fk`)) order by `vh`.`code_vehicule`)  ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`code_cat`);

--
-- Indexes for table `marque`
--
ALTER TABLE `marque`
  ADD PRIMARY KEY (`code_marque`);

--
-- Indexes for table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`code_vehicule`) USING BTREE,
  ADD KEY `code_marque_fk` (`code_marque_fk`) USING BTREE,
  ADD KEY `code_cat_fk` (`code_cat_fk`) USING BTREE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
