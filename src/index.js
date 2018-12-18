import "./styles.css";

function createTicTacToeGame() {
  const gridBoxes = document.querySelectorAll(".box");
  const weaponButtons = document.querySelectorAll(".weapon");
  const gridBoxesArray = Array.from(gridBoxes);
  let userWeapon = "";
  let botWeapon = "";
  const ticTacToe = {
    emptyGridBoxes: "",
    chooseWeapon: e => {
      userWeapon = e.target.innerHTML;
      botWeapon = userWeapon === "X" ? "O" : "X";
      weaponButtons.forEach(e => (e.disabled = true));
    },
    checkForWin: () => {
      ticTacToe.emptyGridBoxes = gridBoxesArray.filter(
        gridBox => !gridBox.innerHTML
      );
    },
    userDropsWeapon: e => {
      console.log(gridBoxesArray, gridBoxes);
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
      console.log(ticTacToe.emptyGridBoxes);
      if (ticTacToe.emptyGridBoxes.length > 0) {
        let pickRandomBox =
          ticTacToe.emptyGridBoxes[
            Math.floor(Math.random() * ticTacToe.emptyGridBoxes.length)
          ];
        pickRandomBox.innerHTML = botWeapon;
      }
    }
  };
  weaponButtons.forEach(e =>
    e.addEventListener("click", ticTacToe.chooseWeapon)
  );
  gridBoxes.forEach(e =>
    e.addEventListener("click", ticTacToe.userDropsWeapon)
  );
}

const ticTacToeGame = createTicTacToeGame();
