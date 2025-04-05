-- Add these columns to error_logs table
ALTER TABLE `error_logs` 
ADD COLUMN `resolution_notes` TEXT AFTER `is_handled`,
ADD COLUMN `recurrence_count` INT DEFAULT 1 AFTER `severity_level`;