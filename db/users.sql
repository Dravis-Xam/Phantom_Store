-- Create users table
CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `type` ENUM('admin', 'developer', 'client') NOT NULL,
  `full_name` VARCHAR(100),
  `company_name` VARCHAR(100),
  `website` VARCHAR(255),
  `address` TEXT,
  `permissions` JSON,
  `auto_approve` BOOLEAN DEFAULT FALSE,
  `status` ENUM('active', 'suspended', 'pending') DEFAULT 'active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_login` TIMESTAMP NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_unique` (`email`),
  UNIQUE KEY `username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample users
INSERT INTO `users` (
  `user_id`, `username`, `email`, `password_hash`, `type`, 
  `full_name`, `company_name`, `website`, `address`, 
  `permissions`, `auto_approve`, `status`, `created_at`
) VALUES
-- Admin user
(1, 'admin_john', 'admin@phantomstore.com', '$2a$10$xJwL5v.nJZ5UD2SzYfLhE.9XKj7nZ7tC1sV8WkQb5mR2dL1vY6WXa', 'admin',
 'John Admin', 'Phantom Store', 'https://phantomstore.com', '123 Admin St, Tech City',
 JSON_SET('{}', '$.manage_users', true, '$.manage_apps', true), TRUE, 'active', NOW()),

-- Developer accounts (4001-4007)
(4001, 'dev_sarah', 'sarah@edutech.dev', '$2a$10$xJwL5v.nJZ5UD2SzYfLhE.9XKj7nZ7tC1sV8WkQb5mR2dL1vY6WXa', 'developer',
 'Sarah Chen', 'EduTech Solutions', 'https://edutech.dev', '100 Campus Rd, Boston',
 JSON_SET('{}', '$.upload_apps', true, '$.edit_apps', true), TRUE, 'active', NOW()),

(4002, 'dev_alex', 'alex@epicmg.com', '$2a$10$xJwL5v.nJZ5UD2SzYfLhE.9XKj7nZ7tC1sV8WkQb5mR2dL1vY6WXa', 'developer',
 'Alex Rivera', 'Epic Mobile Games', 'https://epicmg.com', '200 Game Ave, Tokyo',
 JSON_SET('{}', '$.upload_apps', true, '$.publish_beta', true), FALSE, 'active', NOW()),

(4003, 'dev_jamal', 'jamal@streamworks.io', '$2a$10$xJwL5v.nJZ5UD2SzYfLhE.9XKj7nZ7tC1sV8WkQb5mR2dL1vY6WXa', 'developer',
 'Jamal Williams', 'StreamWorks', 'https://streamworks.io', '55 Media Blvd, Los Angeles',
 JSON_SET('{}', '$.upload_apps', true, '$.analytics', true), TRUE, 'active', NOW()),

-- Client user
(5001, 'client_mike', 'mike@example.com', '$2a$10$xJwL5v.nJZ5UD2SzYfLhE.9XKj7nZ7tC1sV8WkQb5mR2dL1vY6WXa', 'client',
 'Mike Johnson', NULL, NULL, '456 Consumer Ave, Chicago',
 JSON_SET('{}', '$.download_apps', true), FALSE, 'active', NOW());