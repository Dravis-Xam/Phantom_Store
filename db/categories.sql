-- File: categories.sql
-- Purpose: Create and populate the categories table

CREATE TABLE `categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` BOOLEAN DEFAULT TRUE,
  `icon_class` VARCHAR(50),
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert initial categories
INSERT INTO `categories` (`category_id`, `name`, `description`, `icon_class`) VALUES
(3001, 'Music', 'Music streaming and audio apps', 'bi-music-note-beamed'),
(3002, 'Entertainment', 'Video streaming and media apps', 'bi-film'),
(3003, 'File-sharing', 'File transfer and cloud storage', 'bi-folder-symlink'),
(3004, 'Social', 'Social networking and messaging', 'bi-people-fill'),
(3005, 'Games', 'Mobile and casual games', 'bi-joystick'),
(3006, 'Browsers', 'Web browsers and tools', 'bi-globe'),
(3007, 'Education', 'Learning and productivity apps', 'bi-book');

-- Set auto-increment to continue from 3007
ALTER TABLE `categories` AUTO_INCREMENT = 3008;