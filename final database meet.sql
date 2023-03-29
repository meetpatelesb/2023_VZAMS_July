-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: twitter
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `comment_master`
--

DROP TABLE IF EXISTS `comment_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_master` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(250) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `tweet_id` int DEFAULT NULL,
  `comment_create` varchar(30) DEFAULT NULL,
  `comment_update_time` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_master_ibfk_1` (`user_id`),
  KEY `comment_master_ibfk_2` (`tweet_id`),
  CONSTRAINT `comment_master_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`),
  CONSTRAINT `comment_master_ibfk_2` FOREIGN KEY (`tweet_id`) REFERENCES `tweet_master` (`tweet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_master`
--

LOCK TABLES `comment_master` WRITE;
/*!40000 ALTER TABLE `comment_master` DISABLE KEYS */;
INSERT INTO `comment_master` VALUES (1,'0',8,8,'',NULL),(2,'hey meet',1,10,NULL,NULL),(3,'⛪️',1,10,NULL,NULL),(4,'emoji ??',1,11,NULL,NULL),(5,'hey 1',1,8,NULL,NULL),(6,'hey 7',1,7,NULL,NULL),(7,'hey 2',1,2,NULL,NULL),(8,'hiee?',1,11,NULL,NULL),(9,'asasa',1,14,NULL,NULL),(10,'bhai bhai?',1,15,NULL,NULL),(11,'bhai bhai 2',1,14,NULL,NULL),(12,'bhai bhai3',1,12,NULL,NULL),(13,'hey bro?',1,15,NULL,NULL);
/*!40000 ALTER TABLE `comment_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `counter`
--

DROP TABLE IF EXISTS `counter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `counter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tweet_id` int DEFAULT NULL,
  `tweet_likes` varchar(45) DEFAULT NULL,
  `retweet_likes` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_counter_1_idx` (`tweet_id`),
  CONSTRAINT `fk_counter_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweet_master` (`tweet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `counter`
--

LOCK TABLES `counter` WRITE;
/*!40000 ALTER TABLE `counter` DISABLE KEYS */;
/*!40000 ALTER TABLE `counter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_master`
--

DROP TABLE IF EXISTS `follow_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_master` (
  `follow_id` int NOT NULL AUTO_INCREMENT,
  `followers_uid` int DEFAULT NULL,
  `follow_uid` int DEFAULT NULL,
  `follow_flag` int DEFAULT NULL,
  `follow_time` varchar(30) DEFAULT NULL,
  `follow_update_time` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `follow_master_ibfk_1` (`follow_uid`),
  KEY `follow_master_ibfk_2` (`followers_uid`),
  CONSTRAINT `follow_master_ibfk_1` FOREIGN KEY (`follow_uid`) REFERENCES `user_master` (`user_id`),
  CONSTRAINT `follow_master_ibfk_2` FOREIGN KEY (`followers_uid`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_master`
--

LOCK TABLES `follow_master` WRITE;
/*!40000 ALTER TABLE `follow_master` DISABLE KEYS */;
INSERT INTO `follow_master` VALUES (15,14,1,1,NULL,NULL),(16,17,1,1,NULL,NULL),(17,16,1,0,NULL,NULL),(18,18,1,1,NULL,NULL),(19,21,1,1,NULL,NULL),(20,19,1,1,NULL,NULL),(21,20,1,1,NULL,NULL),(22,15,1,1,NULL,NULL),(23,22,1,0,NULL,NULL),(24,23,1,0,NULL,NULL),(100,17,24,1,NULL,NULL),(101,18,24,1,NULL,NULL),(102,16,24,1,NULL,NULL),(103,19,24,1,NULL,NULL),(104,16,18,1,NULL,NULL),(105,17,18,1,NULL,NULL),(106,19,18,1,NULL,NULL),(107,20,18,1,NULL,NULL),(108,21,18,1,NULL,NULL),(109,22,24,1,NULL,NULL),(110,23,18,1,NULL,NULL),(111,22,18,1,NULL,NULL),(112,24,18,1,NULL,NULL),(113,15,18,1,NULL,NULL),(114,14,18,1,NULL,NULL),(115,17,25,1,NULL,NULL),(116,18,25,1,NULL,NULL),(117,16,25,1,NULL,NULL),(118,19,25,1,NULL,NULL),(119,20,25,1,NULL,NULL),(120,22,25,1,NULL,NULL),(121,21,25,1,NULL,NULL),(122,23,25,1,NULL,NULL),(123,24,25,1,NULL,NULL);
/*!40000 ALTER TABLE `follow_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_master`
--

DROP TABLE IF EXISTS `like_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_master` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `like_user_id` int DEFAULT NULL,
  `like_tweet_id` int DEFAULT NULL,
  `like_time` varchar(30) DEFAULT NULL,
  `like_update_time` varchar(30) DEFAULT NULL,
  `activate` int DEFAULT '0',
  PRIMARY KEY (`like_id`),
  KEY `like_master_ibfk_1` (`like_user_id`),
  KEY `like_master_ibfk_2` (`like_tweet_id`),
  CONSTRAINT `like_master_ibfk_1` FOREIGN KEY (`like_user_id`) REFERENCES `user_master` (`user_id`),
  CONSTRAINT `like_master_ibfk_2` FOREIGN KEY (`like_tweet_id`) REFERENCES `tweet_master` (`tweet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_master`
--

LOCK TABLES `like_master` WRITE;
/*!40000 ALTER TABLE `like_master` DISABLE KEYS */;
INSERT INTO `like_master` VALUES (1,18,14,NULL,NULL,1),(2,24,14,NULL,NULL,1),(3,24,13,NULL,NULL,0),(4,24,15,NULL,NULL,0),(5,18,15,NULL,NULL,1),(6,25,15,NULL,NULL,1);
/*!40000 ALTER TABLE `like_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_master`
--

DROP TABLE IF EXISTS `profile_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_master` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `profile_name` varchar(30) DEFAULT NULL,
  `profile_username` varchar(45) DEFAULT NULL,
  `profile_bio` varchar(150) DEFAULT NULL,
  `profile_image` varchar(300) DEFAULT NULL,
  `profile_image_comp` varchar(300) DEFAULT NULL,
  `profile_cover` varchar(300) DEFAULT NULL,
  `profile_cover_comp` varchar(300) DEFAULT NULL,
  `profile_location` varchar(30) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `dob` varchar(30) DEFAULT NULL,
  `user_join_date` varchar(30) DEFAULT NULL,
  `create_date` varchar(30) DEFAULT NULL,
  `update_date` varchar(30) DEFAULT NULL,
  `profile_following` int DEFAULT '0',
  `profile_followers` int DEFAULT '0',
  PRIMARY KEY (`profile_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profile_master_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_master`
--

LOCK TABLES `profile_master` WRITE;
/*!40000 ALTER TABLE `profile_master` DISABLE KEYS */;
INSERT INTO `profile_master` VALUES (6,'Aditya','@aditya',NULL,NULL,NULL,NULL,NULL,NULL,14,'2023-03-18',NULL,NULL,NULL,0,1),(7,'Aditya','@adityaasa',NULL,NULL,NULL,NULL,NULL,NULL,15,'2023-03-09',NULL,NULL,NULL,0,1),(8,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(9,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(10,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(11,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(12,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(13,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(14,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(15,'Aditya',NULL,'Aditya-Thakor',NULL,NULL,NULL,NULL,'Mehsana',NULL,NULL,NULL,NULL,NULL,0,0),(16,'Asdasdf','@Meetvaghasiya7',NULL,NULL,NULL,NULL,NULL,NULL,16,'2023-03-15',NULL,NULL,NULL,0,3),(17,'Meet','@Meetvaghasiya7',NULL,NULL,NULL,NULL,NULL,NULL,17,'2023-03-15',NULL,NULL,NULL,0,3),(18,'Meet','@meetbhai',NULL,NULL,NULL,NULL,NULL,NULL,18,'2023-03-04',NULL,NULL,NULL,10,2),(19,'Kumar','@Ssgdf',NULL,NULL,NULL,NULL,NULL,NULL,19,'2023-03-26',NULL,NULL,NULL,0,3),(20,'Meet','@Meetvaghasiya7',NULL,NULL,NULL,NULL,NULL,NULL,20,'2023-04-01',NULL,NULL,NULL,0,2),(21,'Aditya','@Aditya68',NULL,NULL,NULL,NULL,NULL,NULL,21,'2023-03-31',NULL,NULL,NULL,0,2),(22,'Aditya','@aditya',NULL,NULL,NULL,NULL,NULL,NULL,22,'2023-03-10',NULL,NULL,NULL,0,3),(23,'Aditya','@Aditya68',NULL,NULL,NULL,NULL,NULL,NULL,23,'2023-03-17',NULL,NULL,NULL,0,2),(24,'Virang','@virang_bha',NULL,NULL,NULL,NULL,NULL,NULL,24,'2023-03-06',NULL,NULL,NULL,5,2),(25,'Aditya','@aditya',NULL,NULL,NULL,NULL,NULL,NULL,25,'2023-03-18',NULL,NULL,NULL,9,0);
/*!40000 ALTER TABLE `profile_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `retweet_master`
--

DROP TABLE IF EXISTS `retweet_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retweet_master` (
  `retweet_id` int NOT NULL AUTO_INCREMENT,
  `retweet_content` varchar(250) DEFAULT NULL,
  `tweet_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `retweet_image` varchar(300) DEFAULT NULL,
  `retweet_image_comp` varchar(300) DEFAULT NULL,
  `retweet_video` varchar(300) DEFAULT NULL,
  `relike_count` varchar(20) DEFAULT NULL,
  `retweet_create` varchar(30) DEFAULT NULL,
  `retweet_update` varchar(30) DEFAULT NULL,
  `active` varchar(45) DEFAULT '0',
  PRIMARY KEY (`retweet_id`),
  KEY `retweet_master_ibfk_1` (`tweet_id`),
  KEY `retweet_master_ibfk_2` (`user_id`),
  CONSTRAINT `retweet_master_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweet_master` (`tweet_id`),
  CONSTRAINT `retweet_master_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retweet_master`
--

LOCK TABLES `retweet_master` WRITE;
/*!40000 ALTER TABLE `retweet_master` DISABLE KEYS */;
INSERT INTO `retweet_master` VALUES (5,NULL,4,21,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(8,NULL,5,22,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(11,NULL,7,18,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(15,NULL,5,18,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(16,NULL,4,18,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(17,NULL,2,18,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(18,NULL,8,18,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(19,NULL,10,18,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(25,NULL,15,24,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(26,NULL,13,24,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(27,NULL,11,24,NULL,NULL,NULL,NULL,NULL,NULL,'1'),(28,NULL,15,18,NULL,NULL,NULL,NULL,NULL,NULL,'1');
/*!40000 ALTER TABLE `retweet_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweet_master`
--

DROP TABLE IF EXISTS `tweet_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweet_master` (
  `tweet_id` int NOT NULL AUTO_INCREMENT,
  `tweet_content` varchar(250) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `tweet_image` varchar(300) DEFAULT NULL,
  `tweet_image_comp` varchar(300) DEFAULT NULL,
  `tweet_video` varchar(300) DEFAULT NULL,
  `like_count` int DEFAULT '0',
  `retweet_like_count` int DEFAULT '0',
  `tweet_create` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `tweet_update` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `comment_count` int DEFAULT '0',
  PRIMARY KEY (`tweet_id`),
  KEY `fk_tweet_master_1_idx` (`user_id`),
  CONSTRAINT `fk_tweet_master_1` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweet_master`
--

LOCK TABLES `tweet_master` WRITE;
/*!40000 ALTER TABLE `tweet_master` DISABLE KEYS */;
INSERT INTO `tweet_master` VALUES (1,'Hello this is my first tweet\r\n',18,NULL,NULL,NULL,11,0,'2023-03-25 05:06:26','2023-03-27 09:00:49',0),(2,'hello this me',18,'1679722874114.png',NULL,NULL,NULL,1,'2023-03-25 05:41:14','2023-03-28 04:22:23',1),(3,'Jay shree ram,jay hanuman dada\r\n',18,'1679722923766.png',NULL,NULL,NULL,0,'2023-03-25 05:42:03','2023-03-27 09:00:27',0),(4,'s',21,NULL,NULL,NULL,11,2,'2023-03-25 07:03:59','2023-03-27 09:00:44',0),(5,'as',22,NULL,NULL,NULL,11,2,'2023-03-25 10:40:09','2023-03-27 09:00:43',0),(6,'abcdefghikabcdefghikabcdefghikabcdefghikabcdefghikabcdefghikabcdefghikabcdefghikabcdefghikabcdefghigvgggdsdfgdfgggfgfgg',18,NULL,NULL,NULL,11,0,'2023-03-27 08:56:13','2023-03-27 12:00:10',0),(7,'hfgffghkfjuhfgkfsjkffjfhfkjfhflkjfksjflkffffffffflsjkshflkjsfsljfhflkmsnf/smknsjkshfnvfsmvns.svuishfjlksvfn.msnsvjksfnhlksjvfnlksjfhsfjhslkfhsjkfjhs',18,NULL,NULL,NULL,11,1,'2023-03-27 08:59:55','2023-03-28 04:21:15',1),(8,'abc',18,'1679907793843.png',NULL,NULL,11,1,'2023-03-27 09:03:13','2023-03-28 04:20:59',1),(9,'herlop',18,NULL,NULL,NULL,11,0,'2023-03-27 12:09:34',NULL,0),(10,'knjl',18,'1679918999426.png',NULL,NULL,11,1,'2023-03-27 12:09:59','2023-03-28 04:18:52',2),(11,'emoji check',18,NULL,NULL,NULL,11,1,'2023-03-28 04:19:06','2023-03-28 13:06:29',2),(12,'svfsdfdsf',18,'1679986365732.png',NULL,NULL,11,0,'2023-03-28 06:52:45','2023-03-28 12:37:45',1),(13,'',18,NULL,NULL,NULL,11,1,'2023-03-28 07:41:54','2023-03-28 13:06:25',0),(14,'',18,NULL,NULL,NULL,13,0,'2023-03-28 07:41:56','2023-03-28 13:06:26',2),(15,'hello my first tweet',24,'1680007019801.jpg',NULL,NULL,13,2,'2023-03-28 12:36:59','2023-03-29 09:08:58',2);
/*!40000 ALTER TABLE `tweet_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_master`
--

DROP TABLE IF EXISTS `user_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_master` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `user_username` varchar(30) DEFAULT NULL,
  `user_email` varchar(30) DEFAULT NULL,
  `user_password` varchar(200) DEFAULT NULL,
  `user_activation` varchar(10) DEFAULT '0',
  `user_dob` varchar(30) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
INSERT INTO `user_master` VALUES (1,NULL,'adit123','adi@gmail.com','$2a$10$87WjD/Q53EC7AwofufPZK.JPIA9Ai9eelXXe0UclzCzRiYKMSlSSS','1','2023-03-22','2023-03-20 12:11:07',NULL),(2,NULL,'siddharth','pnmewada@gmail.com','$2a$10$4mlM/na/LCoyweG2piecI./sC19DQLwwS6SFUwuoEVWWJpeinQRMS','1','2023-03-21','2023-03-21 04:32:29',NULL),(3,NULL,'kevin_123','kevinbhimani3112@gmail.com','$2a$10$p/3SaaQIt7sL6Ey/UpWW7enr0ERo1CpN1TAD9Ytqsz2.xEk7sKwX2','1','2023-03-22','2023-03-21 04:41:08',NULL),(4,NULL,'kevin_123','kevinbhimani3112@gmail.com','$2a$10$0KXFYUJ4WjxR6G5L7HwDkeod8vXYEB7RqYw6MRYWYwypHSR.OFQTa','1','2023-03-22','2023-03-21 06:06:02',NULL),(5,NULL,'bhavdip12','dodiya9924@gmail.com','$2a$10$e3PYsTFqvDMbX7lgpR5U..c8Z3LIcjS53zD3XhXOj6IgjaAe9YlU6','1','2023-03-02','2023-03-21 09:19:04','2023-03-21 09:21:06'),(6,NULL,'@Test12','test@gmail.com','$2a$10$/jfs0MO/L0i9Szxduv8zGeUp4NWkx6B3dtm6nbrwycxTtdlpDt6HS','1','2023-04-01','2023-03-22 12:36:44','2023-03-22 12:38:13'),(7,NULL,'@siddharth1','dp@gmail.com','$2a$10$aE9pR05.MOO42T52327bL.1XWZgh0mzjvDHXJYuJSG4TiaNguVjGu','1','2023-03-31','2023-03-23 12:49:01',NULL),(8,NULL,'@siddharth2','abc@gmail.com','$2a$10$SyLdk9cqflQgwEpTJaVgqOXti/rSNk7eCgw7AxjXv57VyH5bI5ZaS','1','2023-03-31','2023-03-23 12:50:45',NULL),(9,NULL,'@darshil','darshil@gmail.com','$2a$10$kfdLsUfAdN9nNXrCfGvlJ.Fjnx8KbIy1VpZ5bjLzUp.VTpax9GTTm','1','2023-03-14','2023-03-23 12:54:45',NULL),(10,NULL,'@Avvvv','vp@gmail.com','$2a$10$I1H6VKI/APIUzCuaS1lGxucj3KezMK20U1bWaGDNCo3FFMsu0dGzG','1','2023-04-01','2023-03-23 13:08:14',NULL),(11,NULL,'@kkkj','sdfsf@gmail.com','$2a$10$5k1q4kkdxjnADooMwAeJQuEpPpjk/8xdDLeO4CJP8JfpARGPzpfKW','1','2023-03-31','2023-03-23 13:12:48',NULL),(12,NULL,'@kkkj','sdfsf@gmail.com','$2a$10$/rAcPEvtpXYpfjZ.a8TgKuaQ8efIMbG2uMmS7k8SUwdaZaTyhOviu','1','2023-03-31','2023-03-23 13:13:02',NULL),(13,NULL,'@Sidddd','sid@gmail.com','$2a$10$CHBweYI1qx9nJFLASjqKwu1i5blD6HDQ3jKMpHjMGf8U8c.y4mDtq','1','2023-03-21','2023-03-23 13:14:39',NULL),(14,NULL,'@kevin_1233454','a@gmail.com','$2a$10$fEUwaUy3YnaNkBWjwwlqEe.RmETMZOF36H0Xx6Vm/piV8eUkGkhvG','1','2023-03-29','2023-03-23 13:16:50',NULL),(15,NULL,'@siddharth12','vp1@gmail.com','$2a$10$xKDfL2qGJFVWRmIcE2vK7usTa7R9ov5Dw1oiPtfLVbchS1sbg44Cq','1','2023-03-31','2023-03-24 05:37:32',NULL),(16,NULL,'@@siddharth','guatam@gmail.com','$2a$10$V5.z9Z.P71P7eyew46saR.soWKF.hcBiG8bDAe7.sTIq/32qMDTzO','1','2023-03-29','2023-03-24 06:24:32',NULL),(17,NULL,'@siddharth','v1p@gmail.com','$2a$10$AGE.FV5z1BklFq6kL6.jVeBfseDGK9r8CnfdKcPZ4Hn/O3kqLeJNW','1','2023-03-18','2023-03-24 08:06:17',NULL),(18,NULL,'@bhav','bd@gmail.com','$2a$10$Qouv64175F9aT2gyOMnyf.onL8HpIpYYmIqTnouCerLbwxU4VTVrm','1','2023-03-25','2023-03-24 13:11:53',NULL),(19,NULL,'@vvvv','pnmewada1@gmail.com','$2a$10$AlfA1zZaoQTGyojDc9Oc2.Lgd4vGEb9WCMA92z3tJ7zwk33nVoQRe','1','2023-03-25','2023-03-24 13:21:54',NULL),(20,NULL,'@vvdd','vp12@gmail.com','$2a$10$56kqetRXU9szTwd5lmsP8Or..Kp5e0R2.HNUu5zYsNA1yC86cTYqG','1','2023-04-02','2023-03-24 13:22:39',NULL),(21,NULL,'@sid1','siddharth@gmail.com','$2a$10$sT6QIFp9dD7H2CMdYRsXYuZx2mTEeByvhvXLaPRGKUfsMd5VglMBm','1','2023-03-17','2023-03-25 06:47:07',NULL),(22,'Siddharth pandya','@sid_mewada','sid123@gmail.com','$2a$10$gFIKleBFfm/co1Qt49UGZeWl5TcDQYPfXoC4axFLa5B7JRVPI7JZO','1','2023-03-12','2023-03-25 07:10:12',NULL),(23,'Aditya','@Aditya90','abc@gmail.com','$2a$10$4Dk9cqYk8e7DL4XuLevQfeio0jQKf9mXfXdO7owzJ1NPLi5CwWs/6','1','2023-03-17',NULL,NULL),(24,'Virang','@virang_bha','v@gmail.com','$2a$10$zDx1qjvV76/hDohUKEfTe.1ek.AQ2y0bKVt5yyud4uv8gIQW9O/K2','1','2023-03-06','2023-03-28 12:34:00',NULL),(25,'Aditya','@aditya','abc1@gmail.com','$2a$10$OWbyg6oiFTvazVJ8aNcfA.RDXMhVJzMBsWu9l6F8a9/nZ9TlDwW2m','1','2023-03-18','2023-03-29 09:07:31',NULL);
/*!40000 ALTER TABLE `user_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-29 14:45:30
