-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: stock
-- ------------------------------------------------------
-- Server version	5.7.13

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
-- Table structure for table `landmark`
--

DROP TABLE IF EXISTS `landmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `landmark` (
  `idlandmark` int(11) NOT NULL AUTO_INCREMENT,
  `tag` text,
  `type_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text,
  `x` double NOT NULL,
  `y` double NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `style` text,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idlandmark`),
  KEY `user_id_fk1_idx` (`user_id`),
  CONSTRAINT `landmark_user_id_fk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `landmark`
--

LOCK TABLES `landmark` WRITE;
/*!40000 ALTER TABLE `landmark` DISABLE KEYS */;
INSERT INTO `landmark` VALUES (1,NULL,1,'myName','myDescription',-10,-25,1,NULL,NULL),(2,NULL,1,'myName2','myDescription2',-10,-30,2,NULL,NULL),(3,NULL,NULL,NULL,NULL,0,0,14,NULL,''),(4,NULL,NULL,NULL,NULL,-10,-35,16,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'),(5,NULL,NULL,NULL,NULL,-10,-40,17,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'),(6,NULL,NULL,NULL,NULL,35.4998779296875,33.88236165325469,18,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'),(7,NULL,NULL,NULL,NULL,35.63720703124997,33.97807495229149,19,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'),(8,NULL,NULL,NULL,NULL,36.73583984374998,34.527464577070106,20,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'),(9,NULL,NULL,NULL,NULL,35.27465820312501,33.08518748404535,21,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/boom.png'),(10,NULL,NULL,NULL,NULL,35,32.77166136069124,22,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/logo%203.png'),(11,NULL,NULL,NULL,NULL,37.252197265625,34.03271994847897,23,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/icon.png'),(12,NULL,NULL,NULL,NULL,34.00848388671875,33.43428072222872,24,NULL,'http://localhost:8080/Stock/resources/img/images/testFolder/mappointer_small.png');
/*!40000 ALTER TABLE `landmark` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-03 18:37:47
