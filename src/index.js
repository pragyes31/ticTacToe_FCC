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
  let whoPlayedLast = "";
  let twoPlayerMode = false;
  let secondPlayerturn = false;
  const winScenarioArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
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
      //console.log(secondPlayerWeapon, botWeapon);
      weaponButtons.forEach(e => (e.disabled = true));
    },

    userDropsWeapon: e => {
      if (userWeapon && !e.target.innerHTML) {
        e.target.innerHTML = !secondPlayerturn
          ? userWeapon
          : secondPlayerWeapon;
        whoPlayedLast = !secondPlayerturn ? userWeapon : secondPlayerWeapon;
        if (secondPlayerWeapon) secondPlayerturn = !secondPlayerturn;

        ticTacToe.winningScenario();
        if (botWeapon) setTimeout(ticTacToe.botDropsWeapon, 500);
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
        whoPlayedLast = botWeapon;
        ticTacToe.winningScenario();
      }
    },
    winningScenario: () => {
      let didAnyoneWin = winScenarioArray.some(scenario => {
        let checkforWin = scenario.every(box => {
          return (
            document.querySelector(`.box${box}`).innerHTML === whoPlayedLast
          );
        });
        if (checkforWin) {
          scenario.map(box => {
            document.querySelector(`.box${box}`).style.color = "red";
          });
        }
        return checkforWin;
      });
    },
    restartGame: () => {
      alert(`${whoPlayedLast} won this battle!!`);
      userWeapon = "";
      botWeapon = "";
      secondPlayerWeapon = "";
      twoPlayerMode = false;
      secondPlayerturn = false;
      whoPlayedLast = "";
      weaponButtons.forEach(e => (e.disabled = false));
      opponents.forEach(e => (e.disabled = false));
      gridBoxes.forEach(e => {
        e.innerHTML = "";
        e.style.color = "#000";
      });
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
