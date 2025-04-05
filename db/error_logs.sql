-- File: error_logs.sql
-- Purpose: Track system errors and their resolution status

CREATE TABLE IF NOT EXISTS `error_logs` (
  `error_id` INT AUTO_INCREMENT PRIMARY KEY,
  `error_code` VARCHAR(10) NOT NULL,
  `error_name` VARCHAR(100) NOT NULL,
  `error_message` TEXT,
  `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `location` ENUM('frontend', 'backend', 'database', 'api', 'payment') NOT NULL,
  `is_handled` BOOLEAN DEFAULT FALSE,
  `severity_level` ENUM('critical', 'high', 'medium', 'low') NOT NULL,
  `app_id` INT,
  `user_id` INT,
  FOREIGN KEY (`app_id`) REFERENCES `apps`(`app_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
);

-- Sample error data
INSERT INTO `error_logs` (
  `error_code`, `error_name`, `error_message`, `timestamp`, 
  `location`, `is_handled`, `severity_level`, `app_id`, `user_id`
) VALUES
-- Critical errors
('500', 'Internal Server Error', 'Database connection timeout', '2024-03-01 08:45:12', 
 'backend', TRUE, 'critical', NULL, NULL),
('503', 'Service Unavailable', 'Payment gateway down', '2024-03-02 14:30:00', 
 'payment', TRUE, 'critical', 1, 4001),

-- High severity
('400', 'Bad Request', 'Invalid API parameters from client', '2024-03-03 09:15:33', 
 'api', TRUE, 'high', 3, NULL),
('404', 'Not Found', 'Missing product image assets', '2024-03-04 11:20:45', 
 'frontend', FALSE, 'high', 5, 4005),

-- Medium severity
('422', 'Validation Error', 'User input validation failed', '2024-03-05 16:40:22', 
 'frontend', TRUE, 'medium', 7, 4002),
('429', 'Rate Limit Exceeded', 'API throttling triggered', '2024-03-06 10:05:18', 
 'api', FALSE, 'medium', NULL, NULL),

-- Low severity
('301', 'Redirect Loop', 'CMS configuration issue', '2024-03-07 13:25:09', 
 'frontend', TRUE, 'low', 9, NULL),
('403', 'Forbidden', 'Temporary access restriction', '2024-03-08 17:50:31', 
 'backend', FALSE, 'low', NULL, 4004);