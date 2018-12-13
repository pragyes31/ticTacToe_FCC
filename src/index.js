import "./styles.css";

function createTicTacToeGame() {
  const weaponButtons = document.querySelectorAll(".weapon");
  // console.log(weaponButtons);
  let userWeapon = "";
  let botWeapon = "";
  const ticTacToe = {
    chooseWeapon: e => {
      userWeapon = e.target.innerHTML;
      botWeapon = userWeapon === "X" ? "O" : "X";
      console.log({ userWeapon, botWeapon });
      weaponButtons.forEach(e => (e.disabled = true));
    }
  };
  weaponButtons.forEach(e =>
    e.addEventListener("click", ticTacToe.chooseWeapon)
  );
}

const ticTacToe = createTicTacToeGame();
