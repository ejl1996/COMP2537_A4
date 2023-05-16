const setup = () => {
  let firstCard = undefined;
  let secondCard = undefined;
  let powerUpActive = false;

  $(".card").on("click", function () {
    if ($(this).find(".front_face")[0] === firstCard) {
      // Clicked on the same card, do nothing
      return;
    }

    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];
      console.log(firstCard, secondCard);
      if (firstCard.src == secondCard.src) {
        console.log("match");
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");

        // Check if all cards matched
        if ($(".card:not(.matched)").length === 0) {
          console.log("You win!");
          $("#winMessage").text("You win!");
        }
      } else {
        console.log("no match");
        setTimeout(() => {
          if ($(this).find(".front_face")[0] === firstCard || $(this).find(".front_face")[0] === secondCard) {
            $(`#${firstCard.id}`).parent().toggleClass("flip");
            $(`#${secondCard.id}`).parent().toggleClass("flip");
          }
          firstCard = undefined;
          secondCard = undefined;
        }, 1000);
      }

      firstCard = undefined;
      secondCard = undefined;
    }
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

  $("#start").hide(); // Initially hide the Start button
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