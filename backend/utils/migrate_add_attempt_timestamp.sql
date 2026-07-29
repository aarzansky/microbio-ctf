-- Run this once against your existing ctf_davitclub database to add
-- timestamps for user attempts so completion time can include failed questions.

USE ctf_davitclub;

SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'ctf_davitclub'
    AND TABLE_NAME = 'user_attempts'
    AND COLUMN_NAME = 'last_attempt_time'
);
SET @sql = IF(@col_exists = 0,
  'ALTER TABLE user_attempts ADD COLUMN last_attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
