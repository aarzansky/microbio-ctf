-- Run this once against your existing ctf_davitclub database before
-- re-running questions.sql. It widens question_description (fixes the
-- "Data too long for column 'question_description'" error) and clears
-- out any partially-inserted rows from the failed run so the
-- auto_increment ids start clean at 1 again, matching the id ranges
-- questions.sql and the dashboard frontend both expect.

USE ctf_davitclub;

ALTER TABLE questions MODIFY question_description TEXT NOT NULL;

-- solved_questions has a FK on question_id, so clear it first
DELETE FROM solved_questions;
DELETE FROM questions;
ALTER TABLE questions AUTO_INCREMENT = 1;

-- now re-run: source backend/utils/questions.sql
