const setup = () => {
    let firstCard = undefined;
    let secondCard = undefined;
    let powerUpActive = false;
    let totalPairs = $(".card").length / 2; // Total number of pairs
    let matches = 0; // Number of pairs matched
    let clicks = 0; // Number of clicks
    let pairsLeft = totalPairs; // Number of pairs left to be matched

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

  const resetGame = () => {
    // Reset card flips
    $(".card").removeClass("flip");

    // Reset matched cards
    $(".card").removeClass("matched");

    // Enable click events on all cards
    $(".card").on("click");

    // Reset variables
    firstCard = undefined;
    secondCard = undefined;
    powerUpActive = false;

    // Reset win message
    $("#winMessage").text("");

    // Reset timer (if applicable)
    clearInterval(timerInterval);
    timerSeconds = 0;
    $("#timer").text(timerSeconds);

    // Remove extra cards (if present)
    $(".extra-card").remove();

    // Shuffle the cards
    shuffleCards();
  };

  $(document).ready(setup);