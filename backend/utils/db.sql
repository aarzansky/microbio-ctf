create database ctf_davitclub;

create table users(
    user_id int primary key auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    user_score bigint
);

create table questions (
     question_id int primary key auto_increment,
     question_title varchar(255) not null,
     question_description text not null,
     question_category varchar(255) not null,
     question_answer varchar(255) not null,
     question_points bigint,
     question_image varchar(255) null
);

CREATE TABLE solved_questions (
    solved_id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    user_id INT,
    solved_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);


