const setup = () => {
  let firstCard = undefined;
  let secondCard = undefined;

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
      } else {
        console.log("no match");
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
        }, 1000);
      }
    }
  });

  $("#goldColorBtn").on("click", function () {
    $("#game_grid").toggleClass("gold-color");
  });
  $("#lightColorBtn").on("click", function () {
    $('#game_grid').removeClass("gold-color");
  });
};

$(document).ready(setup)