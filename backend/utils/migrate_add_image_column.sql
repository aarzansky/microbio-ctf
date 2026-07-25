-- Run this once against your existing ctf_davitclub database to add
-- image support and re-seed questions cleanly. Safe to run even if you
-- already ran the earlier migrate_description_column.sql.

USE ctf_davitclub;

ALTER TABLE questions MODIFY question_description TEXT NOT NULL;

-- Add question_image if it doesn't already exist
SET @col_exists = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = 'ctf_davitclub'
    AND TABLE_NAME = 'questions'
    AND COLUMN_NAME = 'question_image'
);
SET @sql = IF(@col_exists = 0,
  'ALTER TABLE questions ADD COLUMN question_image VARCHAR(255) NULL',
  'SELECT 1'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- solved_questions has a FK on question_id, so clear it first
DELETE FROM solved_questions;
DELETE FROM questions;
ALTER TABLE questions AUTO_INCREMENT = 1;

-- now re-run: source backend/utils/questions.sql
