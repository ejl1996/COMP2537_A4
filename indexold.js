const setup = () => {
  let firstCard = undefined;
  let secondCard = undefined;
  let powerUpActive = false;
  let totalPairs = $(".card").length / 2; // Total number of pairs
  let matches = 0; // Number of pairs matched
  let clicks = 0; // Number of clicks
  let pairsLeft = totalPairs; // Number of pairs left to be matched
  let timerSeconds = 0;
  const timeValue = 30; // Define the time value (in seconds) for the game
  const powerUpInterval = 30;

  $("#start").on("click", function () {
    $(this).hide();
    $("#game_grid").show();
    startTimer();
    startPowerUpMessage();
  });



  // Update the timer every second
  const startTimer = () => {
    const startTime = Date.now(); // Record the start time

    timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds

      $("#timer").text(timeValue); // Update the timer display
      $("#time").text(elapsedTime); // Update the timer display

      // Check if the desired time has passed (e.g., 100 seconds)
      if (elapsedTime >= timeValue) {
        console.log("You lose!");
        $("#winMessage").text("You lose!");
        clearInterval(timerInterval);
        clearInterval(powerUpMessageInterval);
      }
    }, 1000);
  };



  $(".card").on("click", function () {
    if ($(this).hasClass("matched") || $(this).hasClass("flip")) {
      // Clicked on a matched card or the same card twice, do nothing
      return;
    }

    $(this).toggleClass("flip");
    clicks++; // Increment the number of clicks

    let flippedCards = $(".card.flip");

    if (flippedCards.length === 2) {
      const firstCard = flippedCards.eq(0).find(".front_face")[0];
      const secondCard = flippedCards.eq(1).find(".front_face")[0];

      if (firstCard.src == secondCard.src) {
        console.log("match");
        flippedCards.removeClass("flip");
        flippedCards.addClass("matched");

        matches++; // Increment the number of pairs matched
        pairsLeft = totalPairs - matches; // Update the number of pairs left

        // Check if all cards matched
        if (matches === totalPairs) {
          console.log("You win!");
          $("#winMessage").text("You win!");
        }
      } else {
        console.log("no match");
        setTimeout(() => {
          flippedCards.removeClass("flip");
        }, 1000);
      }
    }

    // Update the header information for every individual click
    $("#total").text(totalPairs);
    $("#clicks").text(clicks);
    $("#left").text(pairsLeft);
    $("#matches").text(matches);
  });

  $("#goldColorBtn").on("click", function () {
    $("#game_grid").toggleClass("gold-color");
  });

  $("#lightColorBtn").on("click", function () {
    $('#game_grid').removeClass("gold-color");
  });

  const difficulty = $('input[name="options"]:checked').val();
  if (difficulty === "medium") {
    addExtraCards(2);
  } else if (difficulty === "hard") {
    addExtraCards(4);
  }

  $("#reset").on("click", function () {
    resetGame();
    $("#start").show();
  });

  $("#start").show(); // Initially hide the Start button
};

const addExtraCards = (numCards) => {
  let extraCards = "";
  for (let i = 0; i < numCards; i++) {
    extraCards += `
      <div class="card extra-card">
        <img id="img${i + 7}" class="front_face" src="00${i + 4}.png" alt="">
        <img class="back_face" src="back.webp" alt="">
      </div>
    `;
  }

  $("#game_grid").append(extraCards);
};

const startPowerUpMessage = () => {
  powerUpMessageInterval = setInterval(() => {
    console.log("Power up activated!");
    // Display the power up message using a popup or any other method you prefer
  }, powerUpInterval * 1000);
};


const resetGame = () => {
  // Reset card flips
  $(".card").removeClass("flip");

  // Reset matched cards
  $(".card").removeClass("matched");

  // Enable click events on all cards
  $(".card").on


  // Reset variables
  firstCard = undefined;
  secondCard = undefined;
  powerUpActive = false;

  // Reset win message
  $("#winMessage").text("");

  // Reset timer (if applicable)
  clearInterval(timerInterval);
  clearInterval(powerUpMessageInterval);
  timerSeconds = 100;
  $("#timer").text(timerSeconds);

  // Remove extra cards (if present)
  $(".extra-card").remove();

  // Shuffle the cards
  shuffleCards();
};


$(document).ready(() => {
  $("#game_grid").hide();
  $("#start").show();
});

$(document).ready(setup);