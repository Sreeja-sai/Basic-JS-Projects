let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  loose: 0,
  tie: 0
};
updateScore();
let result = '';

document.querySelector('.js-class-rock').addEventListener('click', () => {
  userChoice('Rock');
}
);

document.querySelector('.js-class-paper').addEventListener('click', () => {
  userChoice('Paper');
}
);

document.querySelector('.js-class-scissor').addEventListener('click', () => {
  userChoice('Scissor');
}
);

document.querySelector('.reset-button').addEventListener('click', () => {
  resetScore();
});

document.querySelector('.autoplay-button').addEventListener('click', () => {
  autoPlayFun();
});


document.body.addEventListener('keydown', (event) => {
  if (event.key === "r") {
    userChoice('Rock');
  } else if (event.key === "p") {
    userChoice('Paper');
  } else if (event.key === "s") {
    userChoice('Scissor');
  } else if (event.key === "a") {
    autoPlayFun();
  } else if (event.key === "Backspace") {
    resetScore();
  } else if (event.key === "y") {
    yesButton();
  } else if (event.key === "n") {
    noButton();
  }
});

function yesButton() {
  document.querySelector('.yes-button').click();
  hideResetMessage();
}

function noButton() {
  document.querySelector('.no-button').click();
  hideResetMessage();
}

function userChoice(value) {
  let randomResult = computerChoice();
  if (value === "Rock") {
    if (randomResult === "Rock") {
      result = 'Tie';
    } else if (randomResult === "Paper") {
      result = 'Loose';
    } else if (randomResult === "Scissor") {
      result = 'Win';
    }
  } else if (value === "Paper") {
    if (randomResult === "Rock") {
      result = 'Win';
    } else if (randomResult === "Paper") {
      result = 'Tie';
    } else if (randomResult === "Scissor") {
      result = 'Loose';
    }
  } else if (value === "Scissor") {
    if (randomResult === "Rock") {
      result = 'Loose';
    } else if (randomResult === "Paper") {
      result = 'Win';
    } else if (randomResult === "Scissor") {
      result = 'Tie';
    }
  }
  if (result === 'Win') {
    score.win++;
  } else if (result === 'Loose') {
    score.loose++;
  } else if (result === 'Tie') {
    score.tie++;
  }
  document.querySelector('.Game-result').innerHTML = `You ${result}.`;
  document.querySelector('.Selected-Choices').innerHTML = `
  You
  <img src="/Pics/${value}-emoji.png">
  <img src="/Pics/${randomResult}-emoji.png"> Computer
  `
  updateScore();
}
function computerChoice() {
  let randomResult = '';
  let randomNum = Math.random();
  if (randomNum > 0 && randomNum < 1 / 3) {
    randomResult = "Rock";
  } else if (randomNum > 1 / 3 && randomNum < 2 / 3) {
    randomResult = "Paper";
  } else if (randomNum > 2 / 3 && randomNum < 1) {
    randomResult = "Scissor";
  }
  return randomResult;
}

function resetScore() {
  document.querySelector('.confirmation-msg').innerHTML = `
  <p> Are you sure you want to reset the score?
  <button class="yes-button">Yes</button>
  <button class="no-button">No</button>
  </p>`;

  document.querySelector('.yes-button').addEventListener('click', () => {
    hideResetMessage();
    resetConfirmation();
  });
  document.querySelector('.no-button').addEventListener('click', () => {
    hideResetMessage();
  });
}

function hideResetMessage() {
  document.querySelector('.confirmation-msg').innerHTML = '';
}


function resetConfirmation() {
  score.win = 0;
  score.loose = 0;
  score.tie = 0;
  updateScore();
  document.querySelector('.Game-result').innerHTML = '';
  document.querySelector('.Selected-Choices').innerHTML = '';
}

let autoPlay = false;
let intervalId;
function autoPlayFun() {
  if (!autoPlay) {
    intervalId = setInterval(() => {
      document.querySelector('.autoplay-button').innerHTML = "Stop Playing";
      const randomResult = computerChoice();
      userChoice(randomResult);
    }, 1000);
    autoPlay = true;
  } else {
    document.querySelector('.autoplay-button').innerHTML = "Start  AutoPlay";
    clearInterval(intervalId);
    autoPlay = false;
  }
}



function updateScore() {
  document.querySelector('.score-result').innerHTML = `Wins: ${score.win}, Losses:${score.loose}, Ties: ${score.tie}`;
  localStorage.setItem('score', JSON.stringify(score));
}