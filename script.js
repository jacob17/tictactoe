let playArea = document.querySelector("#tictactoe");
let box = document.querySelectorAll(".box");
let btn = document.querySelector("#buttons");
let reset = document.querySelector("#reset");
let elements = document.querySelectorAll(".dropdown-item");
let dropDown = document.querySelector("#firstSymbol");
let firstSymbol = "";
let count = 0;
let subtitle = document.querySelector("h4");
let firstSym = "";
let gameState = [];
let roundWon = false;

for (i = 0; i < box.length; i++) {
  box[i].classList = "box disabled";
}

// Reset Button
reset.addEventListener("click", function () {
  for (i = 0; i < box.length; i++) {
    box[i].classList = "box disabled";
  }
  dropDown.innerText = `Choose O or X to start`;
  firstSymbol = "";
  count = 0;
  roundWon = false;
  subtitle.hidden = true;
  dropDown.classList.remove("disabled");
  document.querySelector("h4").innerText = `Player 1 turn`;
});

//Choose first symbol
Array.from(elements).forEach((element) => {
  element.addEventListener("click", (event) => {
    firstSymbol = event.target.classList[event.target.classList.length - 1];
    for (i = 0; i < box.length; i++) {
      box[i].classList = "box";
    }
    pushState();
    if (firstSymbol === "cross") {
      event.target.classList.add("cross");
      firstSym = "X";
      count += 1;
    } else if (firstSymbol === "circle") {
      event.target.classList.add("circle");
      firstSym = "O";
      count += 2;
    }
    dropDown.innerText = `Player 1 chooses ${firstSym}`;
    dropDown.classList.add("disabled");
    subtitle.hidden = false;
    subtitle.innerText = `Player 1 turn`;
  });
});

// Gameplay
playArea.addEventListener("click", function () {
  if (firstSymbol !== "") {
    if (event.target.classList.contains("box")) {
      if (
        (event.target.classList.contains("cross") ||
          event.target.classList.contains("circle")) === false
      ) {
        if (count % 2 === 0) {
          event.target.classList.add("circle");
        } else if (count % 2 === 1) {
          event.target.classList.add("cross");
        }
        count += 1;
        document.querySelector("h4").innerText = `Player ${
          (count % 2) + 1
        } turn`;
        pushState();
      }
      checkWinning();
      if (roundWon === true) {
        setTimeout(function () {
          alert(`${document.querySelector("h4").innerText.slice(0, -5)} won!`);
        }, 100);
      } else if (
        document.querySelectorAll(".box:not(.circle,.cross)").length === 0
      ) {
        setTimeout(function () {
          alert(`Draw!`);
        }, 100);
      }
    }
  }
});

//Check winning
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function pushState() {
  gameState = [];
  for (i = 0; i < 9; i++) {
    let state = document.querySelectorAll(".box")[i].classList[1];
    if (state === "circle") {
      gameState.push("O");
    } else if (state === "cross") {
      gameState.push("X");
    } else {
      gameState.push("");
    }
  }
}
function checkWinning() {
  for (let i = 0; i < 8; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if ((a !== "" || b !== "" || c !== "") && a === b && b === c) {
      // roundWon = false;
      roundWon = true;
    }
  }
}
