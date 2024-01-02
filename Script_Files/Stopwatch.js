let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;
let milliSec = 0;
let isAutoPlay = false;
let isPaused = false;

let intervalId;

let displayContent = '';
let htmlcontent = '';

document.querySelector('.js-start-button').addEventListener('click', () => {
  startButton();
});

document.querySelector('.js-pause-button').addEventListener('click', () => {
  pauseButton();
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetButton();
  ClearLapButton();
});

document.querySelector('.js-lap-button').addEventListener('click', () => {
  lapButton();
});

document.querySelector('.js-clearLap-button').addEventListener('click', () => {
  ClearLapButton();
});

function startButton() {
  if (!isAutoPlay) {
    intervalId = setInterval(() => {
      updateTimer();
    }, 10);
    console.log(intervalId);
    isAutoPlay = true;
    isPaused = false;
  }
}

function pauseButton() {
  isPaused = true;
  console.log(intervalId);
  clearInterval(intervalId);
  isAutoPlay = false;
}

function resetButton() {
  seconds = 0;
  minutes = 0;
  hours = 0;
  days = 0;
  milliSec = 0;
  updateTimer();
  pauseButton();
}

const myArray = [];

function lapButton() {
  if (!isPaused) {
    myArray.push({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days,
      milliSec: milliSec,
    });
    renderData();
  }
}

function renderData() {
  htmlcontent = '';
  myArray.forEach((arrayelement, index) => {
    const { days, seconds, minutes, hours, milliSec } = arrayelement;
    displayContent =
      `<div>
        <button class='lap-button-display'>
            <span> Lap-${index + 1} </span>
           ${displayTimer(days)}:${displayTimer(hours)}:${displayTimer(minutes)}:${displayTimer(seconds)}.${displayTimer(milliSec)}
        </button>
      </div>`;
    htmlcontent += displayContent;
  });
  document.querySelector('.display-lap-timer').innerHTML = htmlcontent;
}

function ClearLapButton() {
  myArray.splice(0, myArray.length);
  htmlcontent = '';
  displayContent = '';
  console.log(myArray);
  document.querySelector('.display-lap-timer').innerHTML = htmlcontent;
}

function updateTimer() {
  displayUi();
  milliSec++;
  if (milliSec === 99) {
    milliSec = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
        if (hours === 24) {
          hours = 0;
          days++;
        }
      }
    }
  }
}

function displayUi() {
  const displayTime = displayTimer(days) + ':' + displayTimer(hours) + ':' + displayTimer(minutes) + ':' + displayTimer(seconds) + ':' + displayTimer(milliSec);
  document.querySelector('.timer').innerHTML = displayTime;
}


function displayTimer(time) {
  return time < 10 ? '0' + time : time;
}