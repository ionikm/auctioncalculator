document.addEventListener("DOMContentLoaded", function () {
  const resetButton = document.getElementById("resetButton");
  const addButton = document.getElementById("addButton");
  let exportButton; // Declare export button variable

  const userInput = document.querySelector(".card input[type='text']");
  const ebayInput = document.querySelector("#card_no2 input[type='text']");

  // Function to calculate auction price
  function calculateAuctionPrice(inputValue) {
    if (!isNaN(inputValue)) {
      return (
        inputValue +
        inputValue * 0.25 +
        inputValue * 0.2 +
        inputValue * 0.25 * 0.2
      ).toFixed(2);
    }
    return "PRICE";
  }

  // Function to calculate eBay final price
  function calculateEbayFinalPrice(inputValue) {
    if (!isNaN(inputValue)) {
      return (
        inputValue -
        inputValue * 0.13 -
        inputValue * 0.02 -
        3.99
      ).toFixed(2);
    }
    return "";
  }

  // Function to update profit
  function updateProfit() {
    const auctionPriceElement = document.querySelector(".card_2 h2");
    const ebayFinalSpan = document.querySelector(".card_2 .ebay_final");
    const totalProfitSpan = document.querySelector(".totalprofit");
    const auctionPrice = parseFloat(auctionPriceElement.textContent);
    const ebayFinalPrice = parseFloat(ebayFinalSpan.textContent);
    if (!isNaN(auctionPrice) && !isNaN(ebayFinalPrice)) {
      const profit = ebayFinalPrice - auctionPrice;
      totalProfitSpan.textContent = profit.toFixed(2);
      const cardProfit = document.querySelector(".card_profit");
      cardProfit.classList.remove("positive", "negative");
      cardProfit.classList.add(profit > 0 ? "positive" : "negative");
    }
  }

  // Function to export card values to CSV
  function exportToCSV() {
    const cards = document.querySelectorAll(".saved_1");
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Title,Bid,eBay Price,Profit\n"; // CSV header
    cards.forEach((card) => {
      const title = card.querySelector("input[type='text']").value;
      const bid = card.querySelector(".table-cell:nth-child(2)").textContent;
      const ebayPrice = card.querySelector(
        ".table-cell:nth-child(4)"
      ).textContent;
      const profit = card.querySelector(".totalprofit").textContent;
      csvContent += `${title},${bid},${ebayPrice},${profit}\n`; // CSV row
    });

    // Create a link element to trigger the download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "cards.csv");
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link from the body
  }

  // Event listeners
  userInput.addEventListener("input", function () {
    const auctionPriceElement = document.querySelector(".card_2 h2");
    auctionPriceElement.textContent = calculateAuctionPrice(
      parseFloat(userInput.value)
    );
    updateProfit();
  });

  ebayInput.addEventListener("input", function () {
    const ebayFinalSpan = document.querySelector(".card_2 .ebay_final");
    ebayFinalSpan.textContent = calculateEbayFinalPrice(
      parseFloat(ebayInput.value)
    );
    updateProfit();
  });

  resetButton.addEventListener("click", function () {
    userInput.value = "";
    const auctionPriceElement = document.querySelector(".card_2 h2");
    auctionPriceElement.textContent = "PRICE";
    ebayInput.value = "";
    const ebayFinalSpan = document.querySelector(".card_2 .ebay_final");
    ebayFinalSpan.textContent = "";
    const totalProfitSpan = document.querySelector(".totalprofit");
    totalProfitSpan.textContent = "0";
    const cardProfit = document.querySelector(".card_profit");
    cardProfit.classList.remove("positive", "negative");
  });

  addButton.addEventListener("click", function () {
    const savedContainer = document.querySelector(".saved");

    const newDiv = document.createElement("div");
    newDiv.classList.add("saved_1");

    // Generate unique ID for the card
    const cardId = "card_" + Math.random().toString(36).substr(2, 9);
    newDiv.setAttribute("id", cardId);

    const titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("placeholder", "Title");
    titleInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        titleInput.setAttribute("readonly", true);
        titleInput.classList.add("lockedinput");
        newDiv.classList.add("locked");
      }
    });

    const table = document.createElement("div");
    table.classList.add("table");

    ["Bid:", "Ebay Price:", "Profit:"].forEach((label) => {
      const row = document.createElement("div");
      row.classList.add("table-row");
      const labelCell = document.createElement("div");
      labelCell.classList.add("table-cell");
      labelCell.textContent = label;
      const valueCell = document.createElement("div");
      valueCell.classList.add("table-cell");
      row.appendChild(labelCell);
      row.appendChild(valueCell);
      table.appendChild(row);
    });

    const unlockButton = document.createElement("button");
    unlockButton.classList.add("unlock");
    unlockButton.textContent = "X";
    unlockButton.addEventListener("click", function () {
      savedContainer.removeChild(newDiv);
    });

    newDiv.appendChild(unlockButton);
    newDiv.appendChild(titleInput);
    newDiv.appendChild(table);
    savedContainer.appendChild(newDiv);

    // Update value cells with corresponding values
    const valueCells = newDiv.querySelectorAll(".table-cell:nth-child(2)");
    valueCells[0].textContent = calculateAuctionPrice(
      parseFloat(userInput.value)
    );
    valueCells[1].textContent = calculateEbayFinalPrice(
      parseFloat(ebayInput.value)
    );
    valueCells[2].textContent =
      document.querySelector(".totalprofit").textContent;

    // Append export button after generating all cards
    if (!exportButton) {
      exportButton = document.createElement("button");
      exportButton.textContent = "Export to CSV";
      exportButton.classList.add("exportcsv"); // Add the exportcsv class
      exportButton.addEventListener("click", exportToCSV);
      savedContainer.parentNode.insertBefore(
        exportButton,
        savedContainer.nextSibling
      ); // Insert after .saved container
    }
  });
});
