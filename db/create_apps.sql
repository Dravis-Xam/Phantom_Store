CREATE TABLE `appstore`.`apps` (
  `app_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `icon_url` VARCHAR(512),
  `download_url` VARCHAR(512) NOT NULL,
  `category_id` INT NOT NULL,
  `developer_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected', 'removed') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail_url` VARCHAR(512),
  PRIMARY KEY (`app_id`),
  INDEX `category_id_idx` (`category_id`),
  INDEX `developer_id_idx` (`developer_id`),
  CONSTRAINT `fk_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `appstore`.`categories` (`category_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_developer`
    FOREIGN KEY (`developer_id`)
    REFERENCES `appstore`.`users` (`user_id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;