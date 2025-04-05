-- File: downloads.sql
-- Purpose: Track daily download statistics

INSERT INTO `downloads` (
  `download_id`, `app_id`, `date`, `count`, `country`
) VALUES
-- Duolingo downloads
(1, 1, '2024-03-01', 15000, 'US'),
(2, 1, '2024-03-01', 8000, 'UK'),
(3, 1, '2024-03-02', 12000, 'US'),

-- Call of Duty Mobile downloads
(4, 3, '2024-03-01', 25000, 'JP'),
(5, 3, '2024-03-01', 18000, 'US'),
(6, 3, '2024-03-02', 21000, 'BR'),

-- Netflix downloads
(7, 5, '2024-03-01', 9000, 'US'),
(8, 5, '2024-03-01', 5000, 'CA'),
(9, 5, '2024-03-02', 7000, 'UK'),

-- WhatsApp downloads
(10, 7, '2024-03-01', 30000, 'IN'),
(11, 7, '2024-03-01', 15000, 'BR'),
(12, 7, '2024-03-02', 25000, 'MX'),

-- Brave Browser downloads
(13, 9, '2024-03-01', 12000, 'DE'),
(14, 9, '2024-03-01', 8000, 'FR'),
(15, 9, '2024-03-02', 9000, 'US');