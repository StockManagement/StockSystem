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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `iditem` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(45) COLLATE utf8_bin NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `item_code` varchar(45) COLLATE utf8_bin NOT NULL,
  `item_description` text COLLATE utf8_bin,
  `brand_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `item_type_id` int(11) NOT NULL,
  `origin_country_id` int(11) NOT NULL,
  `item_size_id` int(11) NOT NULL,
  `item_image_name` text COLLATE utf8_bin,
  `item_catalog_path` int(11) DEFAULT NULL,
  `item_barcode` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `barcode_type_id` int(11) NOT NULL,
  `item_color` text COLLATE utf8_bin,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `is_deleted` tinyint(1) DEFAULT NULL,
  `item_current_quantity` int(11) DEFAULT NULL,
  `item_vat` float DEFAULT NULL,
  `apply_vat` tinyint(1) DEFAULT NULL,
  `area_id` int(11) NOT NULL,
  `deleted_by` int(11) NOT NULL,
  PRIMARY KEY (`iditem`),
  UNIQUE KEY `brand_id_UNIQUE` (`brand_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`),
  UNIQUE KEY `item_type_id_UNIQUE` (`item_type_id`),
  UNIQUE KEY `origin_country_id_UNIQUE` (`origin_country_id`),
  UNIQUE KEY `item_size_id_UNIQUE` (`item_size_id`),
  UNIQUE KEY `barcode_type_id_UNIQUE` (`barcode_type_id`),
  UNIQUE KEY `created_by_UNIQUE` (`created_by`),
  UNIQUE KEY `updated_by_UNIQUE` (`updated_by`),
  UNIQUE KEY `area_id_UNIQUE` (`area_id`),
  UNIQUE KEY `deleted_by_UNIQUE` (`deleted_by`),
  CONSTRAINT `deleted_by_id_fk` FOREIGN KEY (`deleted_by`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `area_id_fk` FOREIGN KEY (`area_id`) REFERENCES `area` (`idarea`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `brand_id_fk` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`idbrand`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`idcategory`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `country_id_fk` FOREIGN KEY (`origin_country_id`) REFERENCES `country` (`idcountry`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `created_by_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `item_size_id_fk` FOREIGN KEY (`item_size_id`) REFERENCES `item_size` (`iditem_size`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `item_type_id_fk` FOREIGN KEY (`item_type_id`) REFERENCES `item_type` (`iditem_type`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `updated_by_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-23 11:42:32
