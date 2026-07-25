require("dotenv").config();
const connection = require("../utils/dbConnection");

var userScoreValue;

const sendQuestion = (req, res) => {
  const getAllQuestionsQuery = `
    SELECT q.*, GROUP_CONCAT(u.user_name) AS solved_by
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
  const getUserData =
    "SELECT u.user_name, u.user_score, sq.question_id " +
    "FROM users u " +
    "LEFT JOIN solved_questions sq ON u.user_id = sq.user_id " +
    "WHERE u.user_id = ?";
  connection.query(getUserData, [uid], async (err, getUserDataResult) => {
    if (err) {
      return res.status(500).json({ error: "Error while fetching questions." });
    }
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
      return res.status(500).json({ error: "Error checking answer" });
    }

    const results = Object.values(JSON.parse(JSON.stringify(result)));

    console.log(results);

    const dbAnswer = results[0].question_answer;
    const questionPoints = results[0].question_points;

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
              .json({ error: "Error inserting solved user data" });
          }
          // Check if any rows were affected by the insert
          if (result && result.length > 0) {
            // The user_id already exists in the table
            return res.status(400).json({
              message: "You have already solved this question!",
              userScore: userScoreValue,
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
                    .json({ error: "Error inserting solved user data" });
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
                        .json({ error: "Error getting user score" });
                    }
                    const jsonData = JSON.stringify(currentUserScore);

                    const parsedData = JSON.parse(jsonData);

                    const userScoreValue =
                      parsedData[0].user_score + questionPoints;

                    console.log(userScoreValue);

                    const updateUserPointsQuery =
                      "update users set user_score=? where user_id=?";

                    connection.query(
                      updateUserPointsQuery,
                      [userScoreValue, userId],
                      async (err, getUserScoreResult) => {
                        if (err) {
                          return res
                            .status(500)
                            .json({ error: "Error getting user score" });
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
      const getUserScoreQuery = "select user_score from users where user_id=?";
      connection.query(
        getUserScoreQuery,
        [userId],
        async (err, currentUserScore) => {
          if (err) {
            return res.status(500).json({ error: "Error getting user score" });
          }
          const jsonData = JSON.stringify(currentUserScore);

          const parsedData = JSON.parse(jsonData);

          const userScoreValue = parsedData[0].user_score;
          return res.status(400).json({
            message: "Wrong Answer",
            userScore: userScoreValue,
          });
        }
      );
    }
  });
};

const scoreboard = (req, res) => {
  const currentScoreQuery =
    "SELECT user_name, user_score FROM users ORDER BY user_score DESC LIMIT 10";
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
