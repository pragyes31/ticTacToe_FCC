import "./styles.css";

function createTicTacToeGame() {
  const gridBoxes = document.querySelectorAll(".box");
  const weaponButtons = document.querySelectorAll(".weapon");
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
  let botWeapon = "";
  const ticTacToe = {
    emptyGridBoxes: "",
    // gridBoxObj: {
    //   box1: document.querySelectorAll(".box1"),
    //   box2: document.querySelectorAll(".box2"),
    //   box3: document.querySelectorAll(".box3"),
    //   box4: document.querySelectorAll(".box4"),
    //   box5: document.querySelectorAll(".box5"),
    //   box6: document.querySelectorAll(".box6"),
    //   box7: document.querySelectorAll(".box7"),
    //   box8: document.querySelectorAll(".box8"),
    //   box9: document.querySelectorAll(".box9")
    // },
    chooseWeapon: e => {
      userWeapon = e.target.innerHTML;
      botWeapon = userWeapon === "X" ? "O" : "X";
      weaponButtons.forEach(e => (e.disabled = true));
    },

    userDropsWeapon: e => {
      if (userWeapon && !e.target.innerHTML) {
        e.target.innerHTML = userWeapon;
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
    },
    restartGame: () => {
      userWeapon = "";
      botWeapon = "";
      weaponButtons.forEach(e => (e.disabled = false));
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
}

const ticTacToeGame = createTicTacToeGame();
