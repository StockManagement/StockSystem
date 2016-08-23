CREATE DATABASE  IF NOT EXISTS `stock` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `stock`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 52.27.246.251    Database: stock
-- ------------------------------------------------------
-- Server version	5.5.50-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `item_size`
--

DROP TABLE IF EXISTS `item_size`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_size` (
  `iditem_size` int(11) NOT NULL AUTO_INCREMENT,
  `item_size_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `item_size_height` float DEFAULT NULL,
  `height_unit_id` int(11) NOT NULL,
  `item_size_length` float DEFAULT NULL,
  `length_unit_id` int(11) NOT NULL,
  `item_size_width` float DEFAULT NULL,
  `width_unit_id` int(11) NOT NULL,
  `item_size_weight` float DEFAULT NULL,
  `weight_unit_id` int(11) NOT NULL,
  PRIMARY KEY (`iditem_size`),
  UNIQUE KEY `height_unit_id_UNIQUE` (`height_unit_id`),
  UNIQUE KEY `length_unit_id_UNIQUE` (`length_unit_id`),
  UNIQUE KEY `width_unit_id_UNIQUE` (`width_unit_id`),
  UNIQUE KEY `weight_unit_id_UNIQUE` (`weight_unit_id`),
  CONSTRAINT `height_unit_id_fk` FOREIGN KEY (`height_unit_id`) REFERENCES `height_unit` (`idheight_unit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `weight_unit_id_fk` FOREIGN KEY (`weight_unit_id`) REFERENCES `weight_unit` (`idweight_unit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `width_unit_id_fk` FOREIGN KEY (`width_unit_id`) REFERENCES `width_unit` (`idwidth_unit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `length_unit_id_fk` FOREIGN KEY (`length_unit_id`) REFERENCES `length_unit` (`idlength_unit`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_size`
--

LOCK TABLES `item_size` WRITE;
/*!40000 ALTER TABLE `item_size` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_size` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-23 11:42:54
