import "./styles.css";

function createTicTacToeGame() {
  const gridBoxes = document.querySelectorAll(".box");
  const weaponButtons = document.querySelectorAll(".weapon");
  const opponents = document.querySelectorAll(".opponent");
  const restartButton = document.querySelector(".restart-game");
  const gridBoxesArray = Array.from(gridBoxes);
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
        if (secondPlayerWeapon) {
          secondPlayerturn = !secondPlayerturn;
        }

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
    winningScenario: (gridBox1, gridBox2, gridBox3) => {
      if (
        (document.querySelector(".gridBox1").innerHTML === "X" &&
          document.querySelector(".gridBox2").innerHTML === "X" &&
          document.querySelector(".gridBox3").innerHTML === "X") ||
        (document.querySelector(".gridBox1").innerHTML === "O" &&
          document.querySelector(".gridBox2").innerHTML === "O" &&
          document.querySelector(".gridBox3").innerHTML === "O")
      ) {
      }
    },
    checkForWin: () => {
      ticTacToe.emptyGridBoxes = gridBoxesArray.filter(
        gridBox => !gridBox.innerHTML
      );
      ticTacToe.winningScenario();
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
      twoPlayerMode = false;
      secondPlayerturn = false;
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
