-- File: create_tables.sql
-- Purpose: Create tables if they don't exist

CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` INT AUTO_INCREMENT PRIMARY KEY,
  `app_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rating` TINYINT CHECK (rating BETWEEN 1 AND 5),
  `comment` TEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`app_id`) REFERENCES `apps`(`app_id`)
);

CREATE TABLE IF NOT EXISTS `downloads` (
  `download_id` INT AUTO_INCREMENT PRIMARY KEY,
  `app_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `count` INT NOT NULL,
  `country` CHAR(2) NOT NULL,
  FOREIGN KEY (`app_id`) REFERENCES `apps`(`app_id`)
);

CREATE TABLE IF NOT EXISTS `website_performance` (
  `metric_id` INT AUTO_INCREMENT PRIMARY KEY,
  `date` DATE NOT NULL UNIQUE,
  `page_views` INT NOT NULL,
  `avg_load_time` DECIMAL(3,1) NOT NULL,
  `bounce_rate` DECIMAL(4,1) NOT NULL,
  `conversion_rate` DECIMAL(3,1) NOT NULL
);