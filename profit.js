document.addEventListener("DOMContentLoaded", function () {
  // Get the card_profit element
  var cardProfit = document.querySelector(".card_profit");

  // Get the value of the card_profit element
  var profitValue = parseFloat(cardProfit.textContent.replace("£", ""));

  // Check if profitValue is positive, negative, or zero
  if (profitValue > 0) {
    cardProfit.classList.add("positive");
  } else if (profitValue < 0) {
    cardProfit.classList.add("negative");
  }
});
