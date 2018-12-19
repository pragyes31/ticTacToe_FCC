import "./styles.css";

function createTicTacToeGame() {
  const gridBoxes = document.querySelectorAll(".box");
  const weaponButtons = document.querySelectorAll(".weapon");
  const opponents = document.querySelectorAll(".opponent");
  const restartButton = document.querySelector(".restart-game");
  const gridBoxesArray = Array.from(gridBoxes);
  // let box1 = document.querySelectorAll(".box1");
  // let box2 = document.querySelectorAll(".box2");
  // const box3 = document.querySelectorAll(".box3");
  // const box4 = document.querySelectorAll(".box4");
  // const box5 = document.querySelectorAll(".box5");
  // const box6 = document.querySelectorAll(".box6");
  // const box7 = document.querySelectorAll(".box7");
  // const box8 = document.querySelectorAll(".box8");
  // const box9 = document.querySelectorAll(".box9");
  let userWeapon = "";
  let secondPlayerWeapon = "";
  let botWeapon = "";
  let twoPlayerMode = false;
  let secondPlayerturn = false;
  const ticTacToe = {
    emptyGridBoxes: "",
    chooseOpponent: e => {
      if (e.target.innerHTML === "Human") {
        twoPlayerMode = true;
      }
      opponents.forEach(e => (e.disabled = true));
    },
    chooseWeapon: e => {
      userWeapon = e.target.innerHTML;
      if (twoPlayerMode) {
        secondPlayerWeapon = userWeapon === "X" ? "O" : "X";
      } else {
        botWeapon = userWeapon === "X" ? "O" : "X";
      }
      console.log(secondPlayerWeapon, botWeapon);
      opponents.forEach(e => (e.disabled = true));
      weaponButtons.forEach(e => (e.disabled = true));
    },

    userDropsWeapon: e => {
      if ((userWeapon || secondPlayerWeapon) && !e.target.innerHTML) {
        e.target.innerHTML = !secondPlayerturn
          ? userWeapon
          : secondPlayerWeapon;
        secondPlayerturn = !secondPlayerturn;
        ticTacToe.checkForWin();
        setTimeout(ticTacToe.botDropsWeapon, 500);
        ticTacToe.checkForWin();
      }
    },
    botDropsWeapon: () => {
      ticTacToe.emptyGridBoxes = gridBoxesArray.filter(
        gridBox => !gridBox.innerHTML
      );
      if (ticTacToe.emptyGridBoxes.length > 0) {
        let pickRandomBox =
          ticTacToe.emptyGridBoxes[
            Math.floor(Math.random() * ticTacToe.emptyGridBoxes.length)
          ];
        pickRandomBox.innerHTML = botWeapon;
      }
    },
    checkForWin: () => {
      ticTacToe.emptyGridBoxes = gridBoxesArray.filter(
        gridBox => !gridBox.innerHTML
      );
      if (
        document.querySelector(".box1").innerHTML === "X" &&
        document.querySelector(".box2").innerHTML === "X" &&
        document.querySelector(".box3").innerHTML === "X"
      ) {
        //player wins
      }
    },
    restartGame: () => {
      userWeapon = "";
      botWeapon = "";
      secondPlayerWeapon = "";
      weaponButtons.forEach(e => (e.disabled = false));
      opponents.forEach(e => (e.disabled = false));
      gridBoxes.forEach(e => (e.innerHTML = ""));
    }
  };
  weaponButtons.forEach(e =>
    e.addEventListener("click", ticTacToe.chooseWeapon)
  );
  gridBoxes.forEach(e =>
    e.addEventListener("click", ticTacToe.userDropsWeapon)
  );
  restartButton.addEventListener("click", ticTacToe.restartGame);
  opponents.forEach(e => e.addEventListener("click", ticTacToe.chooseOpponent));
}

const ticTacToeGame = createTicTacToeGame();
