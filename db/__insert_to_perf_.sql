ALTER TABLE `website_performance` ADD COLUMN `unique_visitors` INT AFTER `page_views`;
ALTER TABLE `website_performance` ADD COLUMN `api_error_rate` DECIMAL(5,2) AFTER `conversion_rate`;