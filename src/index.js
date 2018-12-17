import "./styles.css";
const gridBoxes = document.querySelectorAll(".box");

function createTicTacToeGame() {
  const weaponButtons = document.querySelectorAll(".weapon");
  const gridBoxesArray = Array.from(gridBoxes);

  let userWeapon = "";
  let botWeapon = "";
  const ticTacToe = {
    chooseWeapon: e => {
      userWeapon = e.target.innerHTML;
      botWeapon = userWeapon === "X" ? "O" : "X";
      weaponButtons.forEach(e => (e.disabled = true));
    },
    userDropsWeapon: e => {
      if (userWeapon && !e.target.innerHTML) {
        e.target.innerHTML = userWeapon;
        setTimeout(ticTacToe.botDropsWeapon, 750);
      }
    },
    botDropsWeapon: () => {
      let emptyGridBoxes = gridBoxesArray.filter(gridBox => !gridBox.innerHTML);
      if (emptyGridBoxes.length > 0) {
        let pickRandomBox =
          emptyGridBoxes[Math.floor(Math.random() * emptyGridBoxes.length)];
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

const ticTacToe = createTicTacToeGame();
