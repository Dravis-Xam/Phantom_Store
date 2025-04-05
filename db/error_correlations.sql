-- New correlation table
CREATE TABLE `error_correlations` (
  `correlation_id` INT AUTO_INCREMENT PRIMARY KEY,
  `error_id` INT NOT NULL,
  `related_error_id` INT NOT NULL,
  `correlation_score` DECIMAL(3,2),
  FOREIGN KEY (`error_id`) REFERENCES `error_logs`(`error_id`),
  FOREIGN KEY (`related_error_id`) REFERENCES `error_logs`(`error_id`)
);