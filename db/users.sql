INSERT INTO `users` (
  `user_id`, `username`, `email`, `password_hash`, `type`, 
  `full_name`, `company_name`, `website`, `address`, 
  `permissions`, `auto_approve`, `status`, `created_at`
) VALUES
-- Developer 4001
(4001, 'dev4001', 'dev4001@example.com', 'hashed_password_here', 'developer',
 'John Doe', 'Tech Innovations', 'www.techinnovations.com', '123 Main St, Silicon Valley',
 JSON_ARRAY('manage_apps', 'upload_updates'), 1, 'active', NOW()),

-- Developer 4002
(4002, 'dev4002', 'dev4002@example.com', 'hashed_password_here', 'developer',
 'Jane Smith', 'Code Masters', 'www.codemasters.io', '456 Oak Rd, Tech City',
 JSON_ARRAY('manage_apps', 'analytics'), 1, 'active', NOW()),

-- Developer 4003
(4003, 'mobile_dev', 'dev4003@example.com', 'hashed_password_here', 'developer',
 'Bob Wilson', 'Mobile Creators', 'www.mobilecreators.co', '789 Mobile Lane',
 JSON_ARRAY('manage_apps', 'test_builds'), 0, 'active', NOW()),

-- Developer 4004
(4004, 'game_dev', 'dev4004@example.com', 'hashed_password_here', 'developer',
 'Alice Johnson', 'Game Studio X', 'www.gamestudiox.com', '321 Game Ave',
 JSON_ARRAY('manage_apps', 'publish'), 1, 'active', NOW()),

-- Developer 4005
(4005, 'edu_dev', 'dev4005@example.com', 'hashed_password_here', 'developer',
 'Charlie Brown', 'EduTech Solutions', 'www.edutech.dev', '654 Learning Blvd',
 JSON_ARRAY('manage_apps', 'content'), 1, 'active', NOW()),

-- Developer 4006
(4006, 'cloud_dev', 'dev4006@example.com', 'hashed_password_here', 'developer',
 'Eva Green', 'Cloud Apps Ltd', 'www.cloudapps.io', '852 Cloud Parkway',
 JSON_ARRAY('manage_apps', 'sync'), 0, 'active', NOW()),

-- Developer 4007
(4007, 'social_dev', 'dev4007@example.com', 'hashed_password_here', 'developer',
 'Mike Taylor', 'Social Tools Co', 'www.socialtools.app', '753 Social Square',
 JSON_ARRAY('manage_apps', 'integrate'), 1, 'active', NOW());