const setup = () => {
  let firstCard = undefined;
  let secondCard = undefined;
  let powerUpActive = false;


  $(".card").on(("click"), function () {
    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    }
    else {
      secondCard = $(this).find(".front_face")[0];
      console.log(firstCard, secondCard);
      if (
        firstCard.src
        ==
        secondCard.src
      ) {
        console.log("match");
        $(`#${firstCard.id}`).parent().off("click");
        $(`#${secondCard.id}`).parent().off("click");

        //check if all cards matched
        if ($(".card:not(.matched)").length === 0) {
          console.log("You win!");
          $("#winMessage").text("You win!");
        }
      } else {
        console.log("no match");
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
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

  $("#powerUpBtn").on("click", function () {
    powerUpActive = !powerUpActive;
    if (powerUpActive) {
      // Add logic for the power-up activation
      console.log("Power-up activated!");
    } else {
      // Add logic for the power-up deactivation
      console.log("Power-up deactivated!");
    }
  });
};

$(document).ready(setup)