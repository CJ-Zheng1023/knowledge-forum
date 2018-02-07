/*
Navicat MySQL Data Transfer

Source Server         : my-database-server
Source Server Version : 50635
Source Host           : 47.93.1.25:3306
Source Database       : kfdb

Target Server Type    : MYSQL
Target Server Version : 50635
File Encoding         : 65001

Date: 2018-02-07 14:54:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `Id` varchar(32) NOT NULL DEFAULT '',
  `content` longtext COMMENT '回帖内容',
  `topic_id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `create_time` varchar(32) DEFAULT NULL,
  `stat_id` int(32) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Id`),
  KEY `fk_comment_1` (`topic_id`),
  KEY `fk_comment_2` (`user_id`),
  KEY `fk_comment_3` (`stat_id`),
  CONSTRAINT `fk_comment_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_3` FOREIGN KEY (`stat_id`) REFERENCES `statistic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for statistic
-- ----------------------------
DROP TABLE IF EXISTS `statistic`;
CREATE TABLE `statistic` (
  `totalcommunity` int(32) DEFAULT NULL,
  `totaltposts` int(32) DEFAULT NULL,
  `totalreplies` int(32) DEFAULT NULL,
  `id` int(32) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `totalcommunity` (`totalcommunity`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for topic
-- ----------------------------
DROP TABLE IF EXISTS `topic`;
CREATE TABLE `topic` (
  `Id` varchar(32) NOT NULL DEFAULT '' COMMENT '帖子Id',
  `title` varchar(255) DEFAULT NULL COMMENT '帖子标题',
  `create_time` varchar(255) DEFAULT NULL COMMENT '帖子创建时间',
  `content` text COMMENT '内容',
  `page_view` int(11) DEFAULT '0' COMMENT '浏览量',
  `reply_num` int(11) DEFAULT '0' COMMENT '回复量',
  `praise` int(11) DEFAULT NULL COMMENT '点赞数',
  `user_id` varchar(32) DEFAULT NULL,
  `statistic_id` int(32) DEFAULT '1',
  `category` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_topic_1` (`user_id`),
  KEY `fk_topic_3` (`statistic_id`),
  CONSTRAINT `fk_topic_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_topic_3` FOREIGN KEY (`statistic_id`) REFERENCES `statistic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(32) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) DEFAULT NULL COMMENT '用户密码',
  `mail` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `photo` text COMMENT '头像',
  `signature` varchar(255) DEFAULT NULL COMMENT '个性签名',
  `statistic_id` int(32) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_user_1` (`statistic_id`),
  CONSTRAINT `fk_user_1` FOREIGN KEY (`statistic_id`) REFERENCES `statistic` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TRIGGER IF EXISTS `comment_trigger_3`;
DELIMITER ;;
CREATE TRIGGER `comment_trigger_3` BEFORE INSERT ON `comment` FOR EACH ROW begin
declare c int;
set c = (select reply_num from topic where id= new.topic_id);
update topic set reply_num= c + 1  where id= new.topic_id;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `cc`;
DELIMITER ;;
CREATE TRIGGER `cc` AFTER INSERT ON `comment` FOR EACH ROW begin
declare c int;
set c = (select totalreplies from statistic where id = new.stat_id);
update statistic set totalreplies= c + 1  where id = new.stat_id;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `comment_trigger_2`;
DELIMITER ;;
CREATE TRIGGER `comment_trigger_2` AFTER DELETE ON `comment` FOR EACH ROW begin
declare c int;
set c = (select totalreplies from statistic where id = old.stat_id);
update statistic set totalreplies= c - 1  where id = old.stat_id;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `aa`;
DELIMITER ;;
CREATE TRIGGER `aa` AFTER INSERT ON `topic` FOR EACH ROW begin
declare c int;
set c = (select totaltposts from statistic where id = new.statistic_id);
update statistic set totaltposts = c + 1 where id = new.statistic_id;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `trigger_3`;
DELIMITER ;;
CREATE TRIGGER `trigger_3` BEFORE DELETE ON `topic` FOR EACH ROW BEGIN
DELETE FROM comment WHERE  topic_id=old.id;
 END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `trigger_2`;
DELIMITER ;;
CREATE TRIGGER `trigger_2` AFTER DELETE ON `topic` FOR EACH ROW begin
declare c int;
set c = (select totaltposts from statistic where id = old.statistic_id);
update statistic set totaltposts = c - 1 where id = old.statistic_id;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `bb`;
DELIMITER ;;
CREATE TRIGGER `bb` AFTER INSERT ON `user` FOR EACH ROW begin
declare c int;
set c = (select totalcommunity from statistic where id = new.statistic_id);
update statistic set totalcommunity = c + 1 where id = new.statistic_id;
end
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `user_trigger_3`;
DELIMITER ;;
CREATE TRIGGER `user_trigger_3` BEFORE DELETE ON `user` FOR EACH ROW BEGIN
DELETE FROM topic WHERE  user_id=old.id;
DELETE FROM comment WHERE  user_id=old.id;
 END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `user_trigger_2`;
DELIMITER ;;
CREATE TRIGGER `user_trigger_2` AFTER DELETE ON `user` FOR EACH ROW begin
declare c int;
set c = (select totalcommunity from statistic where id = old.statistic_id);
update statistic set totalcommunity = c - 1 where id = old.statistic_id;
end
;;
DELIMITER ;
