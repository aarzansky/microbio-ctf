

const express = require("express");
const app = express();
require("dotenv").config();
const connection = require("./utils/dbConnection.js");
const cors = require("cors");

const userAuth = require("./routes/auth.route.js");
const userDashboard = require("../backend/routes/dashboard.route.js");
const verifyToken = require("./middlwares/verifyJWT.js");

app.use(express.json());
app.use(cors());

app.use("/auth", userAuth);
app.use("/dashboard", verifyToken, userDashboard);

const http = require("http").createServer();
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  scoreUpdate();
  demoScoreUpdate();
});

const scoreUpdate = async () => {
  try {
    const currentScoreQuery =
      "select user_name, user_score from users order by user_score desc limit 10";

    connection.query(currentScoreQuery, (err, result) => {
      if (err) {
        console.log("Error fetching scores:", err);
        return;
      }

      const results = Object.values(JSON.parse(JSON.stringify(result)));

      io.emit("scoreUpdate", results);

      console.log(results);
    });
  } catch (err) {
    console.log("Error in scoreUpdate function:", err);
  }
};

const demoScoreUpdate = async (req, res) => {
  try {
    const currentScoreQuery = "select * from score";
    connection.query(currentScoreQuery, (err, result) => {
      if (err) throw err;

      // res.json(result);
      const results = Object.values(JSON.parse(JSON.stringify(result)));
      // Emit scoreUpdate event when data is fetched from the database
      console.log(results);
      io.emit("demoScoreUpdate", results);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

app.put("/update/:points", (req, res) => {
  const points = req.params.points;
  console.log(points);
  const updateQuery = `UPDATE score SET user_score = JSON_ARRAY_APPEND(user_score, '$', ${points})  WHERE username = 'user3'`;
  connection.query(updateQuery, async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error inserting solved user data" });
    }
    console.log("success");
    demoScoreUpdate();
  });
});

//ip here
app.listen(process.env.SERVER_PORT, `${process.env.IP}`, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

http.listen(8080, () => console.log("listening "));
