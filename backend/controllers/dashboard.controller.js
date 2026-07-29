require("dotenv").config();
const connection = require("../utils/dbConnection");

var userScoreValue;

const sendQuestion = (req, res) => {
  const getAllQuestionsQuery = `
    SELECT q.question_id, q.question_title, q.question_description, q.question_category, q.question_points, q.question_image ,GROUP_CONCAT(u.user_name) AS solved_by
    FROM questions q
    LEFT JOIN solved_questions sq ON q.question_id = sq.question_id
    LEFT JOIN users u ON sq.user_id = u.user_id
    GROUP BY q.question_id`;

  connection.query(getAllQuestionsQuery, async (err, getAllQuestionResult) => {
    if (err) {
      return res.status(500).json({ error: "Error while fetching questions." });
    }
    return res.status(200).json(getAllQuestionResult);
  });
};

const userData = (req, res) => {
    const { uid } = req.body;
    console.log(uid);
    const getUserData = `
    SELECT
        u.user_name,
        u.user_score,
        GROUP_CONCAT(DISTINCT sq.question_id ORDER BY sq.question_id) AS solved_question_ids,
        GROUP_CONCAT(DISTINCT ua.question_id ORDER BY ua.question_id) AS failed_question_ids
    FROM users u
    LEFT JOIN solved_questions sq
        ON u.user_id = sq.user_id
    LEFT JOIN user_attempts ua
        ON u.user_id = ua.user_id
        AND ua.attempts >= 3
    WHERE u.user_id = ?
    GROUP BY u.user_id, u.user_name, u.user_score;
`;

    connection.query(getUserData, [uid], async (err, getUserDataResult) => {
      if (err) {
          return res.status(500).json({ error: "Error while fetching questions." });
      }
      console.log(getUserDataResult);
      return res.status(200).json(getUserDataResult);
  });
};

const checkAnswer = (req, res) => {
  const { questionId, userId, userAnswer } = req.body;
  console.log(userAnswer);
  console.log(req.body);

  const getAnswer =
        "select question_answer, question_points from questions where question_id = ?";

  connection.query(getAnswer, [questionId], async (err, result) => {
    if (err) {
        return res.status(500).json({ error: "Error checking answer",  });
    }

    const results = Object.values(JSON.parse(JSON.stringify(result)));

    const dbAnswer = results[0].question_answer;
    const questionPoints = results[0].question_points;

    const getAttempt =
          "SELECT attempts FROM user_attempts WHERE user_id=? AND question_id=?";

    connection.query(getAttempt, [userId, questionId], (err, attemptResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }

      const attempts = attemptResults.length > 0 ? attemptResults[0].attempts : 0;

      if (attempts > 3) {
        return res.status(401).json({
            message: "Cannot attempt for more than 3 times",
            
        });
      }

      if (dbAnswer == userAnswer) {
        const checkSolvedQuery =
          "select * from solved_questions where user_id = ? and question_id = ?";

        connection.query(
          checkSolvedQuery,
          [userId, questionId],
          async (err, result) => {
            if (err) {
              return res
                .status(500)
                    .json({ error: "Error inserting solved user data",  });
            }
            if (result && result.length > 0) {
              return res.status(400).json({
                  message: "You have already solved this question!",
                  
              });
            } else {
              const insertSolvedUser =
                "insert into solved_questions (question_id, user_id) values (?, ?)";
              connection.query(
                insertSolvedUser,
                [questionId, userId],
                async (err, result) => {
                  if (err) {
                    return res
                      .status(500)
                          .json({ error: "Error inserting solved user data",  });
                  }
                  const getUserScoreQuery =
                    "select user_score from users where user_id=?";
                  connection.query(
                    getUserScoreQuery,
                    [userId],
                    async (err, currentUserScore) => {
                      if (err) {
                        return res
                          .status(500)
                              .json({ error: "Error getting user score", });
                      }
                      const userScoreValue =
                        currentUserScore[0].user_score + questionPoints;

                      const updateUserPointsQuery =
                        "update users set user_score=? where user_id=?";

                      connection.query(
                        updateUserPointsQuery,
                        [userScoreValue, userId],
                        async (err, getUserScoreResult) => {
                          if (err) {
                            return res
                              .status(500)
                                  .json({ error: "Error getting user score",  });
                          }

                          res.status(200).json({
                            message: "Correct Answer",
                              userScore: userScoreValue,
                              
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          }
        );
      } else {
        if (attemptResults.length === 0) {
          if (newUserAttempt(userId, questionId)) {
            return res.status(500).json({
                message: "some database error whiile adding new attempt",
                
            });
          }
          return res.status(201).json({
            message: "Wrong Answer",
              attempts: "1",
              
          });
        }

        if (incrementAttempt(userId, questionId, attempts)) {
          return res.status(500).json({
              message: "Internal Error",
              
          });
        }

        const newAttempts = attempts + 1;

        const getUserScoreQuery =
              "SELECT user_score FROM users WHERE user_id=?";

        connection.query(getUserScoreQuery, [userId], (err, currentUserScore) => {
          if (err) {
              return res.status(500).json({ error: "Error getting user score",  });
          }

          const userScoreValue = currentUserScore[0].user_score;

          return res.status(201).json({
            message: "Wrong Answer",
            attempts: newAttempts,
              userScore: userScoreValue,
              
              
          });
        });
      }
    });
  });
};

function newUserAttempt(uid, qid){
    const insertAttempt =
          "INSERT INTO user_attempts (user_id, question_id, attempts) VALUES (?, ?, 1)";

    connection.query(insertAttempt, [uid, qid], (err, result) => {
        if (err) {
            console.log("error inserting new user attempt", err.message);
            return true;
        }
    });
    return false;
}

function incrementAttempt(uid, qid, attempts){
    const new_attempt = attempts+1;
    const updateAttemptQuery =
          "UPDATE user_attempts SET attempts = ? WHERE user_id = ? AND question_id = ?";

    connection.query(
        updateAttemptQuery,
        [new_attempt, uid, qid],
        (err, result) => {
            if (err) {
                return console.error(err);
            }

            console.log("Rows updated:", result.affectedRows);
        }
    );
    return false;
}

const scoreboard = (req, res) => {
  const currentScoreQuery = `
    SELECT
      u.user_name,
      u.user_score,
      CASE
        WHEN COALESCE(completion.total_completed, 0) = question_totals.total_questions
          THEN completion.completed_at
        ELSE NULL
      END AS completion_time
    FROM users u
    CROSS JOIN (
      SELECT COUNT(*) AS total_questions
      FROM questions
    ) question_totals
    LEFT JOIN (
      SELECT
        completed.user_id,
        COUNT(DISTINCT completed.question_id) AS total_completed,
        MAX(completed.completed_at) AS completed_at
      FROM (
        SELECT
          sq.user_id,
          sq.question_id,
          sq.solved_time AS completed_at
        FROM solved_questions sq
        UNION ALL
        SELECT
          ua.user_id,
          ua.question_id,
          ua.last_attempt_time AS completed_at
        FROM user_attempts ua
        WHERE ua.attempts >= 3
          AND NOT EXISTS (
            SELECT 1
            FROM solved_questions sq2
            WHERE sq2.user_id = ua.user_id
              AND sq2.question_id = ua.question_id
          )
      ) completed
      GROUP BY completed.user_id
    ) completion ON completion.user_id = u.user_id
    ORDER BY u.user_score DESC
    LIMIT 10
  `;
  connection.query(currentScoreQuery, (err, result) => {
    if (err) {
      console.log("Error fetching scores:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log("Scores fetched:", result);
    res.json(result);
  });
};

module.exports = {
  sendQuestion,
  checkAnswer,
  scoreboard,
  userData,
  // solvedQuestions,
};
