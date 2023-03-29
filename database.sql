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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_master`
--

LOCK TABLES `comment_master` WRITE;
/*!40000 ALTER TABLE `comment_master` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow_master`
--

DROP TABLE IF EXISTS `follow_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_master` (
  `follow_id` int NOT NULL AUTO_INCREMENT,
  `following(user_id)` int DEFAULT NULL,
  `followers(user_id)` int DEFAULT NULL,
  `follow_flag` int DEFAULT NULL,
  `follow_time` varchar(30) DEFAULT NULL,
  `follow_update_time` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`follow_id`),
  KEY `follow_master_ibfk_1` (`following(user_id)`),
  KEY `follow_master_ibfk_2` (`followers(user_id)`),
  CONSTRAINT `follow_master_ibfk_1` FOREIGN KEY (`following(user_id)`) REFERENCES `user_master` (`user_id`),
  CONSTRAINT `follow_master_ibfk_2` FOREIGN KEY (`followers(user_id)`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow_master`
--

LOCK TABLES `follow_master` WRITE;
/*!40000 ALTER TABLE `follow_master` DISABLE KEYS */;
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
  PRIMARY KEY (`like_id`),
  KEY `like_master_ibfk_1` (`like_user_id`),
  KEY `like_master_ibfk_2` (`like_tweet_id`),
  CONSTRAINT `like_master_ibfk_1` FOREIGN KEY (`like_user_id`) REFERENCES `user_master` (`user_id`),
  CONSTRAINT `like_master_ibfk_2` FOREIGN KEY (`like_tweet_id`) REFERENCES `tweet_master` (`tweet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_master`
--

LOCK TABLES `like_master` WRITE;
/*!40000 ALTER TABLE `like_master` DISABLE KEYS */;
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
  `profile_bio` varchar(150) DEFAULT NULL,
  `profile_image` varchar(300) DEFAULT NULL,
  `profile_image_comp` varchar(300) DEFAULT NULL,
  `profile_cover` varchar(300) DEFAULT NULL,
  `profile_cover_comp` varchar(300) DEFAULT NULL,
  `profile_following` varchar(20) DEFAULT NULL,
  `profile_followers` varchar(20) DEFAULT NULL,
  `profile_location` varchar(30) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `dob` varchar(30) DEFAULT NULL,
  `user_join_date` varchar(30) DEFAULT NULL,
  `create_date` varchar(30) DEFAULT NULL,
  `update_date` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profile_master_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_master`
--

LOCK TABLES `profile_master` WRITE;
/*!40000 ALTER TABLE `profile_master` DISABLE KEYS */;
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
  PRIMARY KEY (`retweet_id`),
  KEY `retweet_master_ibfk_1` (`tweet_id`),
  KEY `retweet_master_ibfk_2` (`user_id`),
  CONSTRAINT `retweet_master_ibfk_1` FOREIGN KEY (`tweet_id`) REFERENCES `tweet_master` (`tweet_id`),
  CONSTRAINT `retweet_master_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `retweet_master`
--

LOCK TABLES `retweet_master` WRITE;
/*!40000 ALTER TABLE `retweet_master` DISABLE KEYS */;
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
  `like_count` varchar(20) DEFAULT NULL,
  `tweet_create` varchar(30) DEFAULT NULL,
  `tweet_update` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`tweet_id`),
  KEY `tweet_master_ibfk_1` (`user_id`),
  CONSTRAINT `tweet_master_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_master` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweet_master`
--

LOCK TABLES `tweet_master` WRITE;
/*!40000 ALTER TABLE `tweet_master` DISABLE KEYS */;
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
  `user_username` varchar(30) DEFAULT NULL,
  `user_email` varchar(30) DEFAULT NULL,
  `user_password` varchar(200) DEFAULT NULL,
  `user_activation` varchar(10) DEFAULT NULL,
  `user_dob` varchar(30) DEFAULT NULL,
  `create_date` varchar(30) DEFAULT NULL,
  `update_date` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_master`
--

LOCK TABLES `user_master` WRITE;
/*!40000 ALTER TABLE `user_master` DISABLE KEYS */;
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

-- Dump completed on 2023-03-18 13:28:19
