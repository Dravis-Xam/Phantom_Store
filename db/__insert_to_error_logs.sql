ALTER TABLE `error_logs` ADD COLUMN `stack_trace` TEXT AFTER `error_message`;
ALTER TABLE `error_logs` ADD COLUMN `environment` ENUM('production','staging','development') AFTER `location`;