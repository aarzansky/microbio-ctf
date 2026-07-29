var ip = window.location.hostname;
setInterval(() => {
  location.reload();
}, 5000); 

const formatTime = (totalSeconds) => {
  const safeSeconds = Math.max(totalSeconds, 0);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
};

const startTimer = (endTime) => {
  const timerElement = document.getElementById("competition-timer");
  if (!timerElement) {
    return;
  }

  const updateDisplay = () => {
    const remainingSeconds = Math.floor((endTime - Date.now()) / 1000);
    timerElement.textContent = formatTime(remainingSeconds);
  };

  updateDisplay();
  setInterval(updateDisplay, 1000);
};

const initTimer = async () => {
  try {
    const token = localStorage.getItem("aT");
    const response = await fetch(`http://${ip}:8888/dashboard/timer`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch timer: ${response.status}`);
    }

    const timerData = await response.json();
    startTimer(timerData.endTime);
  } catch (error) {
    console.error("Error fetching timer:", error);
  }
};

document.addEventListener("DOMContentLoaded", initTimer);

(async () => {
  const token = localStorage.getItem("aT");

  try {
    const response = await fetch(`http://${ip}:8888/dashboard/scoreboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
    });

    if (response.ok) {
      const jsonData = await response.json();

      console.log(jsonData); // Parsing JSON response
      
      var leaderboardTable = document
        .getElementById("leaderboard")
        .getElementsByTagName("tbody")[0];
      jsonData.forEach((item, index) => {
        var row = leaderboardTable.insertRow(index);
        var rankCell = row.insertCell(0);
        var usernameCell = row.insertCell(1);
        var scoreCell = row.insertCell(2);
        rankCell.textContent = index + 1;
        usernameCell.textContent = item.user_name;
        scoreCell.textContent = item.user_score;
      });
    } else {
      console.error("Failed to fetch leaderboard:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
})();

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
