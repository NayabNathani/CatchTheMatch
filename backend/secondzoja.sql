/*
SQLyog Ultimate v8.32 
MySQL - 5.5.5-10.4.14-MariaDB : Database - secondzoja.com
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`secondzoja.com` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `secondzoja.com`;

/*Table structure for table `access` */

DROP TABLE IF EXISTS `access`;

CREATE TABLE `access` (
  `access_provider` char(16) DEFAULT NULL,
  `access_reciever` char(16) DEFAULT NULL,
  `access` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `access` */

LOCK TABLES `access` WRITE;

insert  into `access`(`access_provider`,`access_reciever`,`access`) values ('SZU-ASNKENDSDSFK','SZU-5CC3F4EAFEC9',1),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK',0);

UNLOCK TABLES;

/*Table structure for table `block` */

DROP TABLE IF EXISTS `block`;

CREATE TABLE `block` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `blocker_id` char(255) NOT NULL,
  `blocked_id` char(255) NOT NULL,
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

/*Data for the table `block` */

LOCK TABLES `block` WRITE;

insert  into `block`(`index`,`blocker_id`,`blocked_id`) values (1,'SZ-potyiug45','SZ-qwerty12');

UNLOCK TABLES;

/*Table structure for table `chatroom` */

DROP TABLE IF EXISTS `chatroom`;

CREATE TABLE `chatroom` (
  `user_1` char(16) DEFAULT NULL,
  `user_2` char(16) DEFAULT NULL,
  `chatId` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `chatroom` */

LOCK TABLES `chatroom` WRITE;

insert  into `chatroom`(`user_1`,`user_2`,`chatId`) values ('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','--3459AACCCDDEEEFFFKKNNSSSSSUUZZ');

UNLOCK TABLES;

/*Table structure for table `favourites` */

DROP TABLE IF EXISTS `favourites`;

CREATE TABLE `favourites` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `favourite_chooser_id` char(255) NOT NULL,
  `favourite_choosed_id` char(255) NOT NULL,
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `favourites` */

LOCK TABLES `favourites` WRITE;

insert  into `favourites`(`index`,`favourite_chooser_id`,`favourite_choosed_id`) values (3,'SZU-ABCDEFGHIJKL','SZU-5CC3F4EAFEC9'),(14,'SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK');

UNLOCK TABLES;

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `sender` char(16) DEFAULT NULL,
  `reciever` char(16) DEFAULT NULL,
  `timestamp` longtext DEFAULT NULL,
  `message` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `messages` */

LOCK TABLES `messages` WRITE;

insert  into `messages`(`sender`,`reciever`,`timestamp`,`message`) values ('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Mon Sep 21 2020 18:24:52 GMT+0500 (Pakistan Standard Time)','hello'),('SZU-ASNKENDSDSFK','SZU-5CC3F4EAFEC9','Mon Sep 21 2020 18:25:09 GMT+0500 (Pakistan Standard Time)','hi'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:34:49 GMT+0500 (Pakistan Standard Time)','dasd'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:34:51 GMT+0500 (Pakistan Standard Time)','sadasd'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:34:53 GMT+0500 (Pakistan Standard Time)','asdasd'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:34:54 GMT+0500 (Pakistan Standard Time)','asdasd'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:34:57 GMT+0500 (Pakistan Standard Time)','adsadasd'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:40:47 GMT+0500 (Pakistan Standard Time)','das'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:41:28 GMT+0500 (Pakistan Standard Time)','dddddd'),('SZU-ASNKENDSDSFK','SZU-5CC3F4EAFEC9','Tue Sep 22 2020 10:43:40 GMT+0500 (Pakistan Standard Time)','hello'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:46:50 GMT+0500 (Pakistan Standard Time)','what'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:52:41 GMT+0500 (Pakistan Standard Time)','hello'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:53:04 GMT+0500 (Pakistan Standard Time)','wh'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 10:58:08 GMT+0500 (Pakistan Standard Time)','hello'),('SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','Tue Sep 22 2020 11:12:45 GMT+0500 (Pakistan Standard Time)','hello g'),('SZU-ASNKENDSDSFK','SZU-5CC3F4EAFEC9','Tue Sep 22 2020 11:25:46 GMT+0500 (Pakistan Standard Time)','f*ck'),('SZU-ASNKENDSDSFK','SZU-5CC3F4EAFEC9','Tue Sep 22 2020 15:45:19 GMT+0500 (Pakistan Standard Time)','what is up buddy?');

UNLOCK TABLES;

/*Table structure for table `online_users` */

DROP TABLE IF EXISTS `online_users`;

CREATE TABLE `online_users` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `online_user_id` char(255) NOT NULL,
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `online_users` */

LOCK TABLES `online_users` WRITE;

insert  into `online_users`(`index`,`online_user_id`) values (1,'undefined');

UNLOCK TABLES;

/*Table structure for table `photos` */

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `user_id` char(16) NOT NULL,
  `photoUrl` longtext DEFAULT NULL,
  `type` char(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `photos` */

LOCK TABLES `photos` WRITE;

insert  into `photos`(`user_id`,`photoUrl`,`type`) values ('SZU-ASNKENDSDSFK','public/uploads/SZU-ASNKENDSDSFK_1600594897800.png','public'),('SZU-ASNKENDSDSFK','public/uploads/SZU-ASNKENDSDSFK_1600594925477.jpeg','public'),('SZU-5CC3F4EAFEC9','public/uploads/SZU-5CC3F4EAFEC9_1600684426682.png','public'),('SZU-5CC3F4EAFEC9','public/uploads/SZU-5CC3F4EAFEC9_1600684435884.jpeg','public'),('SZU-5CC3F4EAFEC9','public/uploads/SZU-5CC3F4EAFEC9_1600684442198.png','private'),('SZU-5CC3F4EAFEC9','public/uploads/SZU-5CC3F4EAFEC9_1600684449319.png','private');

UNLOCK TABLES;

/*Table structure for table `recently_viewed_profiles` */

DROP TABLE IF EXISTS `recently_viewed_profiles`;

CREATE TABLE `recently_viewed_profiles` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `profile_viewer_uid` char(255) NOT NULL,
  `profile_viewed_uid` char(255) DEFAULT NULL,
  `view_date` date NOT NULL,
  `view_time` time NOT NULL,
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

/*Data for the table `recently_viewed_profiles` */

LOCK TABLES `recently_viewed_profiles` WRITE;

insert  into `recently_viewed_profiles`(`index`,`profile_viewer_uid`,`profile_viewed_uid`,`view_date`,`view_time`) values (16,'SZU-ABCDEFGHIJKL','SZU-5CC3F4EAFEC9','2020-09-06','11:15:55'),(17,'SZU-5CC3F4EAFEC9','SZU-ABCDEFGHIJKL','2020-09-06','11:27:49'),(18,'SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','2020-09-07','12:11:31'),(19,'SZU-5CC3F4EAFEC9','SZU-AE643971A3E7','2020-09-07','01:17:19'),(20,'SZU-5CC3F4EAFEC9','SZU-16F56541A7D9','2020-09-07','01:17:24'),(21,'SZU-5CC3F4EAFEC9','SZU-33FB952C5E2C','2020-09-07','01:17:27'),(22,'SZU-5CC3F4EAFEC9','SZU-A5D7848DF655','2020-09-07','01:17:31');

UNLOCK TABLES;

/*Table structure for table `report` */

DROP TABLE IF EXISTS `report`;

CREATE TABLE `report` (
  `index` int(11) NOT NULL AUTO_INCREMENT,
  `reporter_id` char(16) NOT NULL,
  `reported_id` char(16) NOT NULL,
  `report_reason` char(15) DEFAULT NULL,
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `report` */

LOCK TABLES `report` WRITE;

insert  into `report`(`index`,`reporter_id`,`reported_id`,`report_reason`) values (16,'SZU-5CC3F4EAFEC9','SZU-ASNKENDSDSFK','');

UNLOCK TABLES;

/*Table structure for table `reset_password_links` */

DROP TABLE IF EXISTS `reset_password_links`;

CREATE TABLE `reset_password_links` (
  `reset_password_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` char(255) NOT NULL,
  `gen_time` char(255) NOT NULL,
  `exp_time` int(11) NOT NULL,
  PRIMARY KEY (`reset_password_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `reset_password_links` */

LOCK TABLES `reset_password_links` WRITE;

insert  into `reset_password_links`(`reset_password_id`,`user_id`,`gen_time`,`exp_time`) values (2,'SZU-DB2DFF6B22F2','8/7/2020, 10:12:18 AM',15),(3,'SZU-3AAB836C6DBA','8/24/2020, 3:15:37 PM',15),(4,'SZU-3AAB836C6DBA','8/24/2020, 3:17:36 PM',15);

UNLOCK TABLES;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `tagline` char(50) DEFAULT '-',
  `last_scene` char(50) DEFAULT '-',
  `about_me` char(150) DEFAULT '-',
  `ethnic_origin` char(15) DEFAULT '-',
  `age` int(11) DEFAULT 0,
  `born_in` char(50) DEFAULT '-',
  `about_seeking_person` char(150) DEFAULT '-',
  `work_life` char(150) DEFAULT '-',
  `address` char(100) DEFAULT '-',
  `user_id` char(16) NOT NULL,
  `username` char(15) DEFAULT NULL,
  `gender` char(50) DEFAULT '-',
  `date_of_birth` date DEFAULT '0000-00-00',
  `profile_created_by` char(100) DEFAULT '-',
  `accept_polygamy` char(50) DEFAULT '-',
  `email` char(100) NOT NULL,
  `password` char(8) NOT NULL,
  `is_online` char(10) DEFAULT 'false',
  `blocked` char(10) DEFAULT 'false',
  `disabled` char(10) DEFAULT 'false',
  `verified` char(10) DEFAULT 'false',
  `admin_approved` char(15) DEFAULT 'false',
  `nationality` char(15) DEFAULT '-',
  `personality_style` char(15) DEFAULT '-',
  `personal_wealth` char(15) DEFAULT '-',
  `marital_status` char(15) DEFAULT '-',
  `religious_affiliation` char(15) DEFAULT '-',
  `children` char(15) DEFAULT '-',
  `siblings` char(15) DEFAULT '-',
  `livingStatus` char(15) DEFAULT '-',
  `willing_to_move` char(15) DEFAULT '-',
  `diet` char(15) DEFAULT '-',
  `smoking` char(15) DEFAULT '-',
  `education` char(15) DEFAULT '-',
  `profession` char(15) DEFAULT '-',
  `ambition` char(15) DEFAULT '-',
  `eye_color` char(15) DEFAULT '-',
  `hair_color` char(15) DEFAULT '-',
  `body_type` char(15) DEFAULT '-',
  `height` float DEFAULT NULL,
  `disability` char(15) DEFAULT '-',
  `father_alive` char(15) DEFAULT '-',
  `mother_alive` char(15) DEFAULT '-',
  `drink` char(15) DEFAULT '-',
  `country` char(15) DEFAULT '-',
  `state` char(15) DEFAULT NULL,
  `city` char(15) DEFAULT NULL,
  `countryId` int(11) DEFAULT NULL,
  `stateId` int(11) DEFAULT NULL,
  `language` char(15) DEFAULT NULL,
  `secondLanguage` char(15) DEFAULT NULL,
  `profile` longtext DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user` */

LOCK TABLES `user` WRITE;

insert  into `user`(`tagline`,`last_scene`,`about_me`,`ethnic_origin`,`age`,`born_in`,`about_seeking_person`,`work_life`,`address`,`user_id`,`username`,`gender`,`date_of_birth`,`profile_created_by`,`accept_polygamy`,`email`,`password`,`is_online`,`blocked`,`disabled`,`verified`,`admin_approved`,`nationality`,`personality_style`,`personal_wealth`,`marital_status`,`religious_affiliation`,`children`,`siblings`,`livingStatus`,`willing_to_move`,`diet`,`smoking`,`education`,`profession`,`ambition`,`eye_color`,`hair_color`,`body_type`,`height`,`disability`,`father_alive`,`mother_alive`,`drink`,`country`,`state`,`city`,`countryId`,`stateId`,`language`,`secondLanguage`,`profile`) values ('-','Tue Sep 08 2020 10:47:26 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-0BB5A4733C16','killer1','Male','2000-01-01','Relative','Yes','akram121@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-16F56541A7D9','romanreign','Female','2000-01-02','Self','Yes','testuser3@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-1C9D63280A5F','samedd2','Female','2000-01-09','Relative','Yes','holly121@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-33FB952C5E2C','waqar1','Female','2000-01-18','Relative','Yes','hafizsameed122@yahoo.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('shaadi karwaa do yaar','Tue Sep 22 2020 21:34:33 GMT+0500 (Pakistan Standa','hello world','Greek',20,'Argentina','go to hell\n','my name is sameed','lahore','SZU-5CC3F4EAFEC9','hafizsameed','Male','2000-01-11','Relative','No','hafizsameed121@yahoo.com','123456','false','false','false','true','true','Bahamian','Chef','Below Average','Widowed','Spiritism','three','three','Live on my own','Maybe','Pescetarian','heavy smoker','Masters Degree','Director','Reasonable','Brown','Black','Average',5.3,'No','Yes','Yes','No','Pakistan','Sind','Karachi',166,0,'Hebrew','Finnish','public/uploads/IMG_4471_Original-removebg-preview.png'),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-67F92684F2D9','hafizsameeds','Male','2000-01-02','Self','Yes','testuser4@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 23:40:49 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-6E3BF1AD2643','18K-03231','Female','2000-01-19','Parents','No','qkrehan1@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 21:48:20 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-7961A602D70A','hafizsameed1212','Female','2000-01-12','Brother/Sister','Yes','akram12121212@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 21:42:50 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-8686316AC8CC','hafizsameed1212','Female','2000-01-12','Brother/Sister','Yes','akram1212@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 23:42:35 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-8859F3E4EF4C','18K-03232','Female','2000-01-19','Parents','No','qkrehan2@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-8E745C836E71','hafizsameed2','Male','2000-01-12','Relative','Yes','fatman@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 23:38:29 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-9ADE6F761B56','18K-0323','Female','2000-01-19','Parents','No','qkrehan@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-A5D7848DF655','sam_edd','Male','2000-01-18','Relative','undefined','hafizsameed42@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('in search of love','Mon Sep 07 2020 13:30:15 GMT+0500 (Pakistan Standa',NULL,'Hindi',40,'Pakistan',NULL,NULL,'lahore','SZU-ABCDEFGHIJKL','test123','Female','2000-01-12','Father','Yes','test1@gmail.com','123456','false','false','false','true','true','Pakistani','Brogrammer','Very Good','Divorced','Ethnic Religion','one','two','Shared accomoda','Yes','Eat Anything -','heavy smoker','Graduate Degree','Optometrist','Reasonable','Green','Blond','Athletic',5.9,'No','Yes','Yes','No','Pakistan','Sind','Karachi',166,0,'Hindi','Greek',NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-AE643971A3E7','random','Female','2000-01-17','Relative','undefined','helloworld@gmail.com','123456','false','false','false','true','true','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('shaadi karaa do','Tue Sep 22 2020 15:59:33 GMT+0500 (Pakistan Standa','-adasdsad','-',20,'-','-','-','MC-1644,Azeem Pura','SZU-ASNKENDSDSFK','romanreigns','Female','0000-00-00','Self','yes','roman121@gmail.com','123456','false','false','false','true','true','American','-','-','-','-','-','-','-','-','-','-','-','-','Reasonable','-','-','-',5.5,'No','-','-','-','Armenia','Lori','-',NULL,NULL,NULL,NULL,'public/uploads/WhatsApp_Image_2020-09-07_at_5.05.21_PM-removebg-preview.png'),('tagline 2','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa',NULL,NULL,20,NULL,NULL,NULL,'karachi','SZU-B7FABEBABAA9','AnnusHashmi','Female','0000-00-00','Self','undefined','annus.hashmi@outlook.com','13292714','false','false','false','true','true','pakistani',NULL,NULL,'widow',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Reasonable',NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,'Armenia','Lori','-',NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 08 2020 10:45:37 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-B9DB75E7DAE5','samedd12','Female','2000-01-01','Relative','Yes','same@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 21:45:41 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-BE31EC18813E','hafizsameed1212','Female','2000-01-12','Brother/Sister','Yes','akram121212@g.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-C7734C02E59D','testuser5','Female','2000-01-11','Self','Yes','testuser5@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Tue Sep 22 2020 23:44:11 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-DFF646C4CBCC','18K-03234','Male','2000-01-01','Relative','No','sam1211@gmail.com','123456','false','false','false','false','false','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','-',NULL,NULL,NULL,NULL,NULL,NULL,NULL),('-','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',20,'-','-','-','-','SZU-E05A0054338C','helloworld','Female','2000-01-17','Relative','undefined','hafizsameed42@gmail.com','123456','false','false','false','true','true','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',NULL,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL),('hello guys','Mon Sep 07 2020 12:53:31 GMT+0500 (Pakistan Standa','-','-',30,'karachi','-','-','karachi','SZU-F0AD82C811EA','testuser2','Female','2000-01-19','Relative','yes','hafizsameed42@gmail.com','123456','false','false','false','true','true','-','-','-','-','-','-','-','-','-','-','-','-','-','Reasonable','-','-','-',7,'-','-','-','-','Pakistan','Sind','Karachi',NULL,NULL,NULL,NULL,NULL);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
