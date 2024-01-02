
let score = JSON.parse(localStorage.getItem('score')) || {
  loose: 0,
  win: 0,
  tie: 0
};
updateScore();
document.querySelector('.js-pic-rock').addEventListener('click', () => {
  userChoice("Rock");
});

document.querySelector('.js-pic-paper').addEventListener('click', () => {
  userChoice("Paper");
});

document.querySelector('.js-pic-scissor').addEventListener('click', () => {
  userChoice("Scissor");
});

document.querySelector('.reset-button').addEventListener('click', () => {
  resetConfirmationMsg();
});

document.querySelector('.autoplay-button').addEventListener('click', () => {
  autoPlayFun();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'k') {
    userChoice("Rock");
  } else if (event.key === 'p') {
    userChoice("Paper");
  } else if (event.key === 's') {
    userChoice("Scissor");
  } else if (event.key === 'a') {
    autoPlayFun();
  } else if (event.key === 'Backspace') {
    resetConfirmationMsg();
  } else if (event.key === 'y') {
    yesButtonFun();
  } else if (event.key === 'n') {
    noButtonFun();
  }
});


let result = '';
function userChoice(value) {
  let randomChoice = computerChoice();
  if (value === 'Rock') {
    if (randomChoice === 'Rock') {
      result = 'Tie';
    } else if (randomChoice === 'Paper') {
      result = 'Loose';
    } else if (randomChoice === 'Scissor') {
      result = 'Win';
    }
  } else if (value === 'Paper') {
    if (randomChoice === 'Rock') {
      result = 'Win';
    } else if (randomChoice === 'Paper') {
      result = 'Tie';
    } else if (randomChoice === 'Scissor') {
      result = 'Loose';
    }
  } else if (value === 'Scissor') {
    if (randomChoice === 'Rock') {
      result = 'Loose';
    } else if (randomChoice === 'Paper') {
      result = 'Win';
    } else if (randomChoice === 'Scissor') {
      result = 'Tie';
    }
  }
  if (result === 'Loose') {
    score.loose++;
  } else if (result === 'Win') {
    score.win++;
  } else if (result === 'Tie') {
    score.tie++;
  }
  document.querySelector('.game-result').innerHTML = `You ${result}.`;
  document.querySelector('.selections').innerHTML = `You:
  <img src='/Pics/${value}-emoji.png'>
  <img src='/Pics/${randomChoice}-emoji.png'> Computer`;
  updateScore();
}


function computerChoice() {
  let randomChoice = '';
  let randomNum = Math.random();
  if (randomNum > 0 && randomNum < 1 / 3) {
    randomChoice = 'Rock';
  } else if (randomNum > 1 / 3 && randomNum < 2 / 3) {
    randomChoice = 'Paper';
  } else if (randomNum > 2 / 3 && randomNum < 1) {
    randomChoice = 'Scissor'
  }
  return randomChoice;
}

let isAutoPlay = false;
let intervalId;
function autoPlayFun() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      document.querySelector('.autoplay-button').innerHTML = 'Stop AutoPlay';
      let userChoiceComp = computerChoice();
      userChoice(userChoiceComp);
    }, 1000);
    isAutoPlay = true;
  } else if (isAutoPlay) {
    document.querySelector('.autoplay-button').innerHTML = 'Start AutoPlay';
    clearInterval(intervalId);
    isAutoPlay = false;
  }
}

function yesButtonFun() {
  document.querySelector('.yes-button').click();
}
function noButtonFun() {
  document.querySelector('.no-button').click();
}

function resetConfirmationMsg() {
  document.querySelector('.confirmation-msg').innerHTML = `
  <p>Are You Sure You want to reset the Game Score?
  <button class='yes-button'>Yes</button>
  <button class='no-button'>No</button>
  </p>`;

  document.querySelector('.yes-button').addEventListener('click', () => {
    resetScore();
    hideMsgContent();
  });
  document.querySelector('.no-button').addEventListener('click', () => {
    hideMsgContent()
  });
}

function resetScore() {
  score.loose = 0;
  score.win = 0;
  score.tie = 0;
  document.querySelector('.game-result').innerHTML = '';
  document.querySelector('.selections').innerHTML = '';
  updateScore();
}

function updateScore() {
  document.querySelector('.game-score').innerHTML = `Wins: ${score.win}, Looses: ${score.loose}, Ties: ${score.tie}`;
  localStorage.setItem('score', JSON.stringify(score));
}

function hideMsgContent() {
  document.querySelector('.confirmation-msg').innerHTML = '';
}