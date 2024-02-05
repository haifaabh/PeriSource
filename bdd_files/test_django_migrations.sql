CREATE DATABASE  IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'ArticleStock','0001_initial','2024-01-09 21:00:16.932301'),(2,'contenttypes','0001_initial','2024-01-09 21:00:16.998639'),(3,'contenttypes','0002_remove_content_type_name','2024-01-09 21:00:17.104319'),(4,'auth','0001_initial','2024-01-09 21:00:17.562665'),(5,'auth','0002_alter_permission_name_max_length','2024-01-09 21:00:17.649070'),(6,'auth','0003_alter_user_email_max_length','2024-01-09 21:00:17.656158'),(7,'auth','0004_alter_user_username_opts','2024-01-09 21:00:17.664649'),(8,'auth','0005_alter_user_last_login_null','2024-01-09 21:00:17.672648'),(9,'auth','0006_require_contenttypes_0002','2024-01-09 21:00:17.679602'),(10,'auth','0007_alter_validators_add_error_messages','2024-01-09 21:00:17.687644'),(11,'auth','0008_alter_user_username_max_length','2024-01-09 21:00:17.698850'),(12,'auth','0009_alter_user_last_name_max_length','2024-01-09 21:00:17.707851'),(13,'auth','0010_alter_group_name_max_length','2024-01-09 21:00:17.728770'),(14,'auth','0011_update_proxy_permissions','2024-01-09 21:00:17.737882'),(15,'auth','0012_alter_user_first_name_max_length','2024-01-09 21:00:17.746881'),(16,'accounts','0001_initial','2024-01-09 21:00:18.206893'),(17,'account','0001_initial','2024-01-09 21:00:18.525422'),(18,'account','0002_email_max_length','2024-01-09 21:00:18.543079'),(19,'account','0003_alter_emailaddress_create_unique_verified_email','2024-01-09 21:00:18.586136'),(20,'account','0004_alter_emailaddress_drop_unique_email','2024-01-09 21:00:18.625356'),(21,'account','0005_emailaddress_idx_upper_email','2024-01-09 21:00:18.656197'),(22,'accounts','0002_customuser_favorites','2024-01-09 21:00:18.743904'),(23,'admin','0001_initial','2024-01-09 21:00:18.928806'),(24,'admin','0002_logentry_remove_auto_add','2024-01-09 21:00:18.936900'),(25,'admin','0003_logentry_add_action_flag_choices','2024-01-09 21:00:18.948702'),(26,'sessions','0001_initial','2024-01-09 21:00:19.007494'),(27,'socialaccount','0001_initial','2024-01-09 21:00:19.385327'),(28,'socialaccount','0002_token_max_lengths','2024-01-09 21:00:19.426323'),(29,'socialaccount','0003_extra_data_default_dict','2024-01-09 21:00:19.438369'),(30,'socialaccount','0004_app_provider_id_settings','2024-01-09 21:00:19.604007'),(31,'socialaccount','0005_socialtoken_nullable_app','2024-01-09 21:00:19.839730'),(32,'socialaccount','0006_alter_socialaccount_extra_data','2024-01-09 21:00:19.930828'),(33,'token_blacklist','0001_initial','2024-01-09 21:00:20.184386'),(34,'token_blacklist','0002_outstandingtoken_jti_hex','2024-01-09 21:00:20.214704'),(35,'token_blacklist','0003_auto_20171017_2007','2024-01-09 21:00:20.229607'),(36,'token_blacklist','0004_auto_20171017_2013','2024-01-09 21:00:20.344570'),(37,'token_blacklist','0005_remove_outstandingtoken_jti','2024-01-09 21:00:20.423139'),(38,'token_blacklist','0006_auto_20171017_2113','2024-01-09 21:00:20.452375'),(39,'token_blacklist','0007_auto_20171017_2214','2024-01-09 21:00:20.755422'),(40,'token_blacklist','0008_migrate_to_bigautofield','2024-01-09 21:00:21.138809'),(41,'token_blacklist','0010_fix_migrate_to_bigautofield','2024-01-09 21:00:21.153359'),(42,'token_blacklist','0011_linearizes_history','2024-01-09 21:00:21.161465'),(43,'token_blacklist','0012_alter_outstandingtoken_user','2024-01-09 21:00:21.173419'),(44,'ArticleStock','0002_article_date_article_validated','2024-02-02 02:03:12.338846');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-02 23:13:20
