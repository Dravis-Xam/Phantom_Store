CREATE DATABASE IF NOT EXISTS `appstore`;
USE `appstore`;

CREATE TABLE IF NOT EXISTS `users` (
    `user_id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `type` ENUM('admin', 'developer', 'client') NOT NULL DEFAULT 'client',
    `full_name` VARCHAR(100),
    `company_name` VARCHAR(100), -- For developers
    `website` VARCHAR(255), -- For developers
    `address` VARCHAR(255), -- For clients
    `permissions` JSON, -- For admins
    `auto_approve` BOOLEAN NOT NULL DEFAULT FALSE, -- Added auto_approve field
    `status` ENUM('active', 'removed') NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE IF NOT EXISTS `categories` (
    `category_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL UNIQUE
);

-- Apps Table
CREATE TABLE IF NOT EXISTS `apps` (
    `app_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `icon_url` VARCHAR(255),
    `download_url` VARCHAR(255) NOT NULL,
    `category_id` INT,
    `developer_id` INT,
    `status` ENUM('pending', 'approved', 'rejected', 'removed') NOT NULL DEFAULT 'pending', -- Added 'rejected' status
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`category_id`),
    FOREIGN KEY (`developer_id`) REFERENCES `users`(`user_id`)
);

-- Downloads Table
CREATE TABLE IF NOT EXISTS `downloads` (
    `download_id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT,
    `app_id` INT,
    `download_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`app_id`) REFERENCES `apps`(`app_id`)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS `reviews` (
    `review_id` INT AUTO_INCREMENT PRIMARY KEY,
    `app_id` INT, -- The app being reviewed
    `reviewer_id` INT, -- The client leaving the review
    `developer_id` INT, -- The developer being reviewed (optional, if reviewing the developer directly)
    `rating` INT NOT NULL CHECK (`rating` BETWEEN 1 AND 5), -- Rating from 1 to 5
    `review_text` TEXT, -- The review comment
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`app_id`) REFERENCES `apps`(`app_id`),
    FOREIGN KEY (`reviewer_id`) REFERENCES `users`(`user_id`),
    FOREIGN KEY (`developer_id`) REFERENCES `users`(`user_id`)
);

-- App Rejections Table (to store rejection reasons)
CREATE TABLE IF NOT EXISTS `app_rejections` (
    `rejection_id` INT AUTO_INCREMENT PRIMARY KEY,
    `app_id` INT,
    `rejection_reason` TEXT,
    `rejected_by` INT, -- Admin who rejected the app
    `rejected_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`app_id`) REFERENCES `apps`(`app_id`),
    FOREIGN KEY (`rejected_by`) REFERENCES `users`(`user_id`)
);

-- Website Performance Table (to track metrics)
CREATE TABLE IF NOT EXISTS `website_performance` (
    `performance_id` INT AUTO_INCREMENT PRIMARY KEY,
    `visits` INT NOT NULL DEFAULT 0,
    `downloads` INT NOT NULL DEFAULT 0,
    `reviews` INT NOT NULL DEFAULT 0,
    `seo_score` INT NOT NULL DEFAULT 0, -- Example SEO metric
    `recorded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Auto Approvals Log Table (to log auto-approvals)
CREATE TABLE IF NOT EXISTS `auto_approvals` (
    `approval_id` INT AUTO_INCREMENT PRIMARY KEY,
    `admin_id` INT,
    `apps_approved` INT,
    `approved_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`admin_id`) REFERENCES `users`(`user_id`)
);