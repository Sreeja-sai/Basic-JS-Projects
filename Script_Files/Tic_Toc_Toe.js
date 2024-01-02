let buttonElement = document.querySelectorAll('.button-list');
let popupElement = document.querySelector('.popup');
let restartElement = document.getElementById('restart-button');
let messageElement = document.getElementById('message');
let newgameElement = document.getElementById('newgame-button');

/*
0|1|2|
3|4|5|
6|7|8|
*/

let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isTrue = true;
let count = 0;

const drawFunction = () => {
  count = 0;
  disableButtons();
  messageElement.innerHTML = "Its Draw";
}

restartElement.addEventListener('click', () => {
  count = 0;
  enableButtons();
});

newgameElement.addEventListener('click', () => {
  count = 0;
  enableButtons();
});

const enableButtons = () => {
  buttonElement.forEach((element) => {
    element.disabled = false;
    element.innerText = "";
  });
  popupElement.classList.add("hide");
};
const disableButtons = () => {
  buttonElement.forEach((element) => {
    element.disabled = true;
  });
  popupElement.classList.remove("hide");
}

const winFunction = (letter) => {
  disableButtons();
  if (letter === "X") {
    messageElement.innerHTML = "X Wins";
  } else {
    messageElement.innerHTML = "O wins";
  }
}

const winFactor = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      buttonElement[i[0]].innerText,
      buttonElement[i[1]].innerText,
      buttonElement[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if ((element1 === element2) && element2 === element3) {
        winFunction(element1);
      }
    }
  }
};

buttonElement.forEach((element) => {
  element.addEventListener('click', () => {
    if (isTrue) {
      element.disabled = true;
      element.innerText = "X";
      isTrue = false;
    } else {
      element.disabled = true;
      element.innerText = "O";
      isTrue = true;
    }
    count++;
    if (count === 9) {
      drawFunction();
    }
    winFactor();
  });
})