-- Add description and created_at to categories if they don't exist
ALTER TABLE categories 
ADD COLUMN description  TEXT AFTER name,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER description;

-- Add is_featured column to apps if it doesn't exist
ALTER TABLE apps
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE AFTER status;