-- File: website_performance.sql
-- Purpose: Monitor app store website metrics
CREATE TABLE website_performance (
  metric_id INT PRIMARY KEY,
  date DATE NOT NULL,
  page_views INT,
  avg_load_time DECIMAL(3,1), -- in seconds
  bounce_rate DECIMAL(3,1), -- percentage
  conversion_rate DECIMAL(3,1) -- percentage
);

INSERT INTO `website_performance` (
  `metric_id`, `date`, `page_views`, `avg_load_time`, `bounce_rate`, `conversion_rate`
) VALUES
-- March 2024 performance
(1, '2024-03-01', 1500000, 1.2, 32.5, 4.8),
(2, '2024-03-02', 1420000, 1.3, 33.1, 4.6),
(3, '2024-03-03', 1630000, 1.1, 30.8, 5.2),

-- Weekday vs weekend pattern
(4, '2024-03-04', 1350000, 1.4, 35.2, 4.3),
(5, '2024-03-05', 1400000, 1.3, 34.8, 4.5),
(6, '2024-03-08', 1750000, 1.0, 28.7, 5.8),
(7, '2024-03-09', 1820000, 0.9, 27.3, 6.1),

-- Peak performance day
(8, '2024-03-15', 2100000, 1.5, 38.4, 3.9),
(9, '2024-03-16', 1950000, 1.2, 31.6, 5.5),
(10, '2024-03-17', 1880000, 1.1, 30.2, 5.7);