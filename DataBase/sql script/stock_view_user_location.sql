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
-- Temporary view structure for view `view_user_locations`
--

DROP TABLE IF EXISTS `view_user_locations`;
/*!50001 DROP VIEW IF EXISTS `view_user_locations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_user_locations` AS SELECT 
 1 AS `iduser`,
 1 AS `user_name`,
 1 AS `created_at`,
 1 AS `updated_at`,
 1 AS `idlandmark`,
 1 AS `tag`,
 1 AS `type_id`,
 1 AS `name`,
 1 AS `description`,
 1 AS `x`,
 1 AS `y`,
 1 AS `user_id`,
 1 AS `style`,
 1 AS `iduser_idlandmark`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_user_locations`
--

/*!50001 DROP VIEW IF EXISTS `view_user_locations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`stockwebuser`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_user_locations` AS select `u`.`iduser` AS `iduser`,`u`.`user_name` AS `user_name`,`u`.`created_at` AS `created_at`,`u`.`updated_at` AS `updated_at`,`l`.`idlandmark` AS `idlandmark`,`l`.`tag` AS `tag`,`l`.`type_id` AS `type_id`,`l`.`name` AS `name`,`l`.`description` AS `description`,`l`.`x` AS `x`,`l`.`y` AS `y`,`l`.`user_id` AS `user_id`,`l`.`style` AS `style`,concat_ws(`u`.`iduser`,`l`.`idlandmark`) AS `iduser_idlandmark` from (`user` `u` left join `landmark` `l` on((`u`.`iduser` = `l`.`user_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-25 12:03:36
