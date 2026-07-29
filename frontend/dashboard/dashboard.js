// fetch attempts
var ip = window.location.hostname;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Check if the data is already stored in localStorage
    const userId = localStorage.getItem("uid");

    if (!localStorage.getItem(userId)) {
      
      fetch("json/attempts.json")
        .then((response) => response.json())
        .then((jsonData) => {
          console.log(jsonData);
          const jsonString = JSON.stringify(jsonData);
          const uid = localStorage.getItem("uid");
          localStorage.setItem(uid, jsonString);
        });
    }
  } catch (error) {
    console.log(error);
  }
});

// get questions
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("aT");

    const response = await fetch(`http://${ip}:8888/dashboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
    });

    if (response.status === 200) {
      const data = await response.json();

      for (const question of data) {
        const challengeDiv = document.getElementById(
          `question-${question.question_id}`
        );
          let questionDiv = document.getElementById(
              `question-${question.question_id}`
          );
          if(questionDiv){
              questionDiv.innerText = question.question_title;
          }
        if (challengeDiv) {
          challengeDiv.addEventListener("click", () => {
            populateModal(question);
            showModal();
             resetForm(question.question_id);
            displaySolvedBy(question.solved_by); // New line to display users who solved the question
          });
        }
      }
    } else {
      window.location.href = "../auth/login.html";
      return;
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Function to display users who solved the question
function displaySolvedBy(users) {
  const solvedByContainer = document.getElementById("solved-by-container");
  solvedByContainer.innerHTML = ""; // Clear previous content

    const usersList = users.split(",").map((user) => user.trim());
  for (const user of usersList) {
    const userElement = document.createElement("li");
    userElement.textContent = "~  " + user;
    solvedByContainer.appendChild(userElement);
  }
}

// get user details
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const uid = localStorage.getItem("uid");
    const token = localStorage.getItem("aT");

    if (!uid || !token) {
      // Redirect to login page if either uid or token is missing
      window.location.href = "../auth/login.html";
      return;
    }

    const response = await fetch(`http://${ip}:8888/dashboard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify({ uid }),
    });

      if (response.status === 200) {
          const data = await response.json();

          if (!data.length) {
              console.error("No user data returned.");
              return;
          }

          const user = data[0];

          const userName = document.getElementById("user_id");
          const userScore = document.getElementById("user_score");

          userName.innerText += " " + user.user_name;
          userScore.innerText += " " + (user.user_score ?? 0);

          const solvedQuestionIds = user.solved_question_ids
                ? user.solved_question_ids.split(",").map(Number)
                : [];

          const failedQuestionIds = user.failed_question_ids
                ? user.failed_question_ids.split(",").map(Number)
                : [];

          const challengeDivs = document.querySelectorAll(".challenge");

          challengeDivs.forEach((div) => {
              const questionId = Number(div.id.split("-")[1]);

              if (solvedQuestionIds.includes(questionId)) {
                  div.style.backgroundColor = "#32de84"; 
              } else if (failedQuestionIds.includes(questionId)) {
                  div.style.backgroundColor = "#808080";
              }
          });
      } else {
          console.error("Error:", response.statusText);
      }
  } catch (error) {
    console.error("Error:", error);
  }
});

// populate divs with questions
function populateModal(question) {
  document.getElementById("modal-title").innerText = question.question_title;
    
  const modalImage = document.getElementById("modal-image");
  if (question.question_image) {
    modalImage.src = question.question_image;
    modalImage.style.display = "block";
  } else {
    modalImage.src = "";
    modalImage.style.display = "none";
  }

  document.getElementById("modal-description").innerText =
    question.question_description;
  document.getElementById("modal-category").innerText =
    "Category: " + question.question_category;
  document.getElementById("modal-points").innerText =
    "Points: " + question.question_points;
}

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "block";

  // Close the modal when clicking on the close button
  const closeButton = document.getElementsByClassName("close")[0];
  closeButton.onclick = function () {
    modal.style.display = "none";
    switchPage(null, 1);
  };

  // Close the modal when clicking anywhere outside of it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      switchPage(null, 1);
    }
  };
}

// reset form when it is closed so that the previous answers are not sent to future response
function resetForm(questionId) {
  const answerForm = document.getElementById("answer-form");
  answerForm.reset();
  answerForm.setAttribute("data-question-id", questionId);
}

// Add an event listener for form submission
document
  .getElementById("answer-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const answer = document.getElementById("answer").value;
    const questionId = document
      .getElementById("answer-form")
      .getAttribute("data-question-id");
    const userId = localStorage.getItem("uid");
    const requestBody = {
      questionId: questionId,
      userId: userId,
      userAnswer: answer,
    };

    console.log(requestBody);

    const token = localStorage.getItem("aT");

    try {
      const response = await fetch(`http://${ip}:8888/dashboard/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify(requestBody),
      });

      console.log(response);

      if (response.status === 200) {
        const result = await response.json();
        alert(result.message);
        window.location.href = "dashboard.html";
        // document
        //   .getElementById(`question-${questionId}`)
        //   .classList.add("correct");

        console.log("question id" + questionId);
        // Update user score on correct answer
        const userScore = document.getElementById("user_score");
        userScore.innerText = "User Score: " + result.userScore;
      } else {
          const reply = await response.json();
          console.log(reply);
          let message = reply.message + " " + reply.attempts + " attempted";
          alert(message);
          if(reply.attempts && reply.attempts >=3){
              window.location.href = "dashboard.html";
          }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

//logout
document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.getElementById("logout");

  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();

    // Clear local storage items
    localStorage.removeItem("aT");
    localStorage.removeItem("uid");

    window.location.href = "../auth/login.html"; // Replace "login.html" with the actual login page URL
  });
});

//page switch
function switchPage(event, page) {
  // event.stopPropagation(); // Prevent the default behavior of the click event
  if (page === 1) {
    document.getElementById("page1Content").style.display = "block";
    document.getElementById("page2Content").style.display = "none";
    // Show buttons on page 1
    // document.getElementById("page1Buttons").style.display = "block";
  } else if (page === 2) {
    document.getElementById("page1Content").style.display = "none";
    document.getElementById("page2Content").style.display = "block";
    // Hide buttons on page 2
    // document.getElementById("page1Buttons").style.display = "none";
  }
}

// NOTE: the old client-side "attempts" lockout has been removed.
// The backend never enforced an attempt limit, so the old localStorage-based
// tracking could get out of sync and permanently disable a challenge (no way
// to reset it) even though the server would still accept answers. Challenges
// now stay clickable regardless of past wrong attempts.

// bringing header

// fetch("header.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("header-container").innerHTML = html;
//   })
//   .catch((error) => console.error("Error fetching header:", error));
