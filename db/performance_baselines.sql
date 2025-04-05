CREATE TABLE `performance_baselines` (
  `metric` VARCHAR(50) PRIMARY KEY,
  `warning_threshold` DECIMAL(10,2),
  `critical_threshold` DECIMAL(10,2),
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO `performance_baselines` VALUES
('load_time', 1.5, 2.5, NOW()),
('bounce_rate', 35.0, 45.0, NOW()),
('conversion_rate', 4.0, 3.0, NOW());