-- Run this after db.sql. It creates the `score` table that index.js
-- queries in demoScoreUpdate()/app.put("/update/:points") but which
-- was missing from the original schema.

USE ctf_davitclub;

CREATE TABLE score (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    user_score JSON
);

INSERT INTO score (username, user_score) VALUES ('user3', JSON_ARRAY());
