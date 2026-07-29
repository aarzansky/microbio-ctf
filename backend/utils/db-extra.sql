-- Run this after db.sql. It creates the `score` table that index.js
-- queries in demoScoreUpdate()/app.put("/update/:points") but which
-- was missing from the original schema.

USE ctf_davitclub;

CREATE TABLE score (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    user_score JSON
);

--// added table for user_attempts 
Field	    `Type`	`Null`	`Key`	`Default`
user_id	    int(11)	NO	    PRI	
question_id	int(11)	NO	    PRI	
attempts	int(11)	NO		            0

create table user_attempts (
    user_id INT NOT NULL,
    question_id INT NOT NULL,
    attempts INT DEFAULT 0,
    PRIMARY KEY (user_id, question_id)
);

INSERT INTO score (username, user_score) VALUES ('user3', JSON_ARRAY());
