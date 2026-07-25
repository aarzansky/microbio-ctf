var ip = window.location.hostname;

document.addEventListener("DOMContentLoaded", async () => {
  localStorage.removeItem("aT");
  localStorage.removeItem("uid");
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = {
    userEmail: document.getElementById("email").value,
    userPassword: document.getElementById("password").value,
  };

  try {
    const response = await fetch(`http://${ip}:8888/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: form.userEmail,
        userPassword: form.userPassword,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data.message);

      const token = data.token;
      const userId = data.userId;

      localStorage.setItem("aT", token);
      localStorage.setItem("uid", userId);
      sessionStorage.setItem("flag", "flag{another_one}");

      window.location.href = "../dashboard/dashboard.html";
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
