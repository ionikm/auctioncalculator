// document.addEventListener("DOMContentLoaded", function () {
//   const titleInput = document.getElementById("titleInput");
//   const savedDiv = document.querySelector(".saved");

//   titleInput.addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       titleInput.setAttribute("readonly", true); // Lock the title input
//       titleInput.blur(); // Remove focus from the input
//       savedDiv.classList.add("edited"); // Add the 'edited' class to change background color
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const unlockButton = document.querySelector(".unlock");

  unlockButton.addEventListener("click", function () {
    const saved_1Div = unlockButton.parentElement; // Get the parent element of the unlock button
    saved_1Div.remove(); // Remove the saved_1 div from the DOM
  });
});
