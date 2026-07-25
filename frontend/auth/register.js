var ip = window.location.hostname;

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = {
      userName: document.getElementById("username").value,
      userEmail: document.getElementById("email").value,
      userPassword: document.getElementById("password").value,
    };

    console.log(form);

    try {
      const response = await fetch(`http://${ip}:8888/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: form.userName,
          userEmail: form.userEmail,
          userPassword: form.userPassword,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        alert(data.message);
        window.location.href = "login.html";
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
