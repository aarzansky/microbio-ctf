-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ctf_davitclub
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question_title` varchar(255) NOT NULL,
  `question_description` text NOT NULL,
  `question_category` varchar(255) NOT NULL,
  `question_answer` varchar(255) NOT NULL,
  `question_points` bigint DEFAULT NULL,
  `question_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'Sudoku Diagonal','? Solve the sudoku below. The flag is the sequence of digits along the top-left to bottom-right diagonal, read in order. Submit as flag{d1d2d3d4d5d6d7d8d9} (no separators, one digit each).','MISC','flag{481316472}',200,'/challenges/mis/sudoku.png'),(2,'Spot the Pattern','Each letter below is paired with a number that follows a hidden rule:\nA-1, B-4, C-9, D-16, E-?\nFigure out the rule and find the missing pair. Submit as flag{letter_number}.','MISC','flag{e_25}',100,NULL),(3,'Word Ladder','Turn COLD into WARM, changing exactly one letter at each step to form a new valid word. Use these clues for the three missing rungs:\r COLD -> ____ (a rope or string) -> ____(something you play or send in the mail) -> ____ (to guard or protect) -> WARM\r Submit the three missing words in order as flag{word1_word2_word3}.','MISC','flag{cord_card_ward}',300,NULL),(4,'Nonogram','Fill the cells. The filled cells reveal four letters. Submit as flag{letters} in lowercase.','MISC','flag{sudo}',400,'/challenges/mis/nonogram.png'),(5,'Five Statements','Consider these five statements:\r S1: Exactly 1 of these 5 statements is false.\r S2: Exactly 2 of these 5 statements are false.\r S3: Exactly 3 of these 5 statements are false.\r S4: Exactly 4 of these 5 statements are false.\r S5: Exactly 5 of these 5 statements are false.\r Only one statement can be true without contradicting itself or the others. Which statement number is it? Submit as flag{Snumber}.','MISC','flag{S4}',500,NULL),(6,'CIA Triad','Name the three core principles of information security in the CIA triad (not the agency). Submit as flag{principle1_principle2_principle3}.','COURSE','flag{confidentiality_integrity_availability}',100,NULL),(7,'Pointer Arithmetic','In C, given:\nint arr[] = {10, 20, 30, 40};\nWhat does *(arr + 2) evaluate to? Submit as flag{value}.','COURSE','flag{30}',200,NULL),(8,'Binary Conversion','Convert the binary number 1000011 to its decimal equivalent. Submit as flag{binary_value} (e.g. flag{101}).','COURSE','flag{67}',300,NULL),(9,'Pointer Mutation','Trace this C code and give the printed value:\nint x = 5;\nint *p = &x;\n*p = *p + 3;\nprintf(\"%d\", x);\nSubmit as flag{value}.','COURSE','flag{8}',400,NULL),(10,'Boolean Simplification','Simplify the boolean expression: F = AB + AB\' + A\'B\r Submit the simplified expression as flag{c_and_d_plus_e} style (lowercase, underscores, use \"or\" for OR, \"and\" for AND).','COURSE','flag{a_or_b}',500,NULL),(11,'Session 9/11','? Your browser may have received something when you first visited the homepage. It might be worth checking what was stored.','CRYPTO','flag{another_one}',400,NULL),(12,'Hidden Pixels','? Sometimes the most interesting part of an image isn\'t what you can see.','CRYPTO','flag{camouflaged}',100,'/challenges/crypto/amaze.png'),(13,'Robo','01100110 01101100 01100001 01100111 01111011 01100010 01101001 01101110 01100001 01110010 01111001 01011111 01100100 01100101 01100011 01101111 01100100 01100101 01111101','CRYPTO','flag{binary_decode}',200,NULL),(14,'Heard','What words might not say..','CRYPTO','flag{thank_you}',300,'/challenges/crypto/sign.png'),(15,'Cryptogram','What could this possibly mean?','CRYPTO','flag{decrypted}',500,'/challenges/crypto/decrypted.png'),(16,'Checkmate','It is White to move. There\'s a mate in 2, e.g. flag{a1_a8#}.','RIDDLES','flag{f5_e6#}',500,'/challenges/riddles/chess.png'),(17,'Word of the Day','Five letters. Six chances.\nThe world wakes up to solve me.\nToday\'s answer is worth more than bragging rights.\nFind me, and the flag follows.','RIDDLES','flag{}',400,''),(18,'Sequence','Guess the next 3 in this sequence: 3, 7, 13, 21,  ? ','RIDDLES','flag{31_43_57}',100,NULL),(19,'A Riddle','Our story isn\'t the only place to look.\nThe feed has more than meets the eye.\nAmong the posts lies a hidden prize—\nfind the flag where everyone can see it.','RIDDLES','flag{cognito}',300,NULL),(20,'Buzzwords?','TAINFREEC, ARCBTTAS, PCILBDORA','RIDDLES','flag{interface_abstract_clipboard}',200,NULL),(21,'Changes','Not every picture is meant to be seen. Sometimes it\'s meant to be read. Find the answer at \"/challenges/utility/photo.jpg\"','UTILITY','flag{url_change}',300,NULL),(22,'Deleted File','?️ Not everything that\'s discarded is truly gone.','UTILITY','flag{deleted_file}',100,NULL),(23,'Polluted Environment ','Check your environment. Not everything is hidden in plain site.(Pun intended)','UTILITY','flag{env_variable}',200,NULL),(24,'robots.txt','Hidden Robots.','UTILITY','flag{optimus_prime}',400,NULL),(26,'Grep Search','You might find something in our access.log','UTILITY','flag{grep}',500,NULL),(27,'Quick Percent','What is 15% of 240? Submit as flag{answer}.','MAT','flag{36}',100,NULL),(28,'Ratio Recipe','A recipe uses a ratio of 3 cups flour to 2 cups sugar. If you use 12 cups of flour, how many cups of sugar do you need? Submit as flag{answer}.','MAT','flag{8}',200,NULL),(29,'Series Snap','Find the next number in the sequence: 2, 5, 11, 23, 47, ? Submit as flag{answer}.','MAT','flag{95}',300,NULL),(30,'Work Rate','6 workers can build a wall in 8 days, all working at the same constant rate. How many days would it take 4 workers to build the same wall? Submit as flag{answer}.','MAT','flag{12}',400,NULL),(31,'Bat and Ball','A bat and a ball cost $1.10 in total. The bat costs exactly $1.00 more than the ball. How much does the ball cost, in cents? Submit as flag{answer}.','MAT','flag{5}',500,NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `user_score` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1,'user3','[]');
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solved_questions`
--

DROP TABLE IF EXISTS `solved_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solved_questions` (
  `solved_id` int NOT NULL AUTO_INCREMENT,
  `question_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `solved_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`solved_id`),
  KEY `question_id` (`question_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `solved_questions_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`question_id`),
  CONSTRAINT `solved_questions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solved_questions`
--

LOCK TABLES `solved_questions` WRITE;
/*!40000 ALTER TABLE `solved_questions` DISABLE KEYS */;
INSERT INTO `solved_questions` VALUES (1,16,1,'2026-07-24 01:59:34'),(2,12,1,'2026-07-24 02:26:11'),(3,24,1,'2026-07-24 02:46:23'),(4,18,1,'2026-07-24 02:54:50'),(5,13,3,'2026-07-24 04:44:36'),(6,26,3,'2026-07-24 04:47:12'),(7,21,3,'2026-07-24 04:50:03'),(8,6,1,'2026-07-24 19:55:22'),(9,7,1,'2026-07-24 19:55:40'),(10,8,1,'2026-07-24 19:55:55'),(11,9,1,'2026-07-24 19:56:26'),(12,10,1,'2026-07-24 19:58:53'),(13,2,1,'2026-07-24 20:27:03');
/*!40000 ALTER TABLE `solved_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_score` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aarzan','aarzan@gmail.com','$2a$10$XcJM3em4zMbC1OZB6iJdWOyQjMGnAPfvEGc8jqw9Y3wfhZBx0Vx8S',2100),(2,'Potato','potato@gmail.com','$2a$10$PrN1Byv/7A9AZan5GVK.NOlh33qfQZ9VBbUnBVe5K3Balze.dxCna',NULL),(3,'test','tester@test.com','$2a$10$QudhqMLhg4Ic3tfXgRxv1OttlYQ4mC5WMxWDSAV4mG8c666OYw7gi',300),(4,'tarzan','tarzan@gmail.com','$2a$10$1xcF0/9R2fL6MYkJe3HRx./l2.drorf0ce83Xq1MfQ0Qta7cNkiLC',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-25  3:17:46
