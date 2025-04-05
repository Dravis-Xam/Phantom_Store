-- File: reviews.sql
-- Purpose: Store user reviews for applications
CREATE TABLE reviews (
  review_id INT PRIMARY KEY,
  app_id INT,
  user_id INT,
  rating INT,
  comment TEXT,
  created_at DATETIME
);

INSERT INTO `reviews` (
  `review_id`, `app_id`, `user_id`, `rating`, `comment`, `created_at`
) VALUES
-- Reviews for Duolingo (app_id: 1)
(1, 1, 1001, 5, 'Best language learning app!', '2024-01-15 09:30:00'),
(2, 1, 1002, 4, 'Great but too many ads', '2024-02-20 14:15:00'),

-- Reviews for Call of Duty Mobile (app_id: 3)
(3, 3, 1003, 5, 'Console-quality on mobile', '2024-03-05 18:45:00'),
(4, 3, 1004, 3, 'Too much storage space needed', '2024-03-12 10:20:00'),

-- Reviews for Netflix (app_id: 5)
(5, 5, 1005, 4, 'Great content but buffering issues', '2024-01-30 20:10:00'),
(6, 5, 1006, 2, 'Price increased too much', '2024-02-28 11:40:00'),

-- Reviews for WhatsApp (app_id: 7)
(7, 7, 1007, 5, 'Perfect messaging app', '2024-03-18 08:25:00'),
(8, 7, 1008, 4, 'Needs more customization', '2024-03-22 16:50:00'),

-- Reviews for Brave Browser (app_id: 9)
(9, 9, 1009, 5, 'Love the ad blocking!', '2024-02-10 13:05:00'),
(10, 9, 1010, 4, 'Occasionally breaks sites', '2024-03-15 09:30:00');