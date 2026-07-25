// const socket = io("ws://192.168.0.101:8080");

// socket.on("scoreUpdate", (text) => {
//   const jsonData = JSON.stringify(text);

//   const parsedData = JSON.parse(jsonData); // Parse the JSON string back to an object

//   parsedData.forEach((score) => {
//     // assuming parsedData is an array
//     console.log(score.user_score);
//     const el = document.createElement("li");
//     el.innerHTML = score.user_score;
//     document.querySelector("ul").appendChild(el);
//   });
// });

// socket.on("demoScoreUpdate", (text) => {
//   const jsonData = JSON.stringify(text);

//   const parsedData = JSON.parse(jsonData); // Parse the JSON string back to an object

//   parsedData.forEach((score) => {
//     // assuming parsedData is an array
//     console.log(score.user_score);
//     const el = document.createElement("li");
//     el.innerHTML = score.user_score;
//     document.querySelector("ul").appendChild(el);
//   });
// });

// // document.querySelector("button").onclick = () => {
// //   const text = document.querySelector("input").value;
// //   socket.emit("scoreUpdate", text);
// // };

// async function updateScore() {
//   const points = document.getElementById("points").value;
//   console.log(points);
//   try {
//     const res = await fetch(`http://localhost:8888/update/${points}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const data = await res.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
