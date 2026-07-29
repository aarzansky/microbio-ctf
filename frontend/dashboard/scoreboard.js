var ip = window.location.hostname;
setInterval(() => {
  location.reload();
}, 5000); 
fetch("header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header-container").innerHTML = html;
  })
  .catch((error) => console.error("Error fetching header:", error));

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
        var completionTimeCell = row.insertCell(3);
        rankCell.textContent = index + 1;
        usernameCell.textContent = item.user_name;
        scoreCell.textContent = item.user_score;
        const completedAt = item.completed_at || item.completion_time;
        completionTimeCell.textContent = completedAt
          ? new Date(completedAt).toLocaleString()
          : "-";
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
