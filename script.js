'use strict';
// Main variable
let score = [0, 0];
let player = 0;
let comPlayer = 0;
let currentScore = 0;
let playing = true;
let time = 500;
// for main Page
const mainPage = document.querySelector('.container');
const diceBtn = document.querySelector('.roll-dice');
const holdBtn = document.querySelector('.hold');
const newGameBtn = document.querySelector('.new-game');
const insBtn = document.querySelector('.help');
const returnBtn = document.querySelector('.return');
const diceNumEle = document.querySelector('.result');
const leftSide = document.querySelector('.left-side');
const rightSide = document.querySelector('.right-side');
// for level Page
const levelPage = document.querySelector('.level-page');
const vsComBtn = document.querySelector('.computer');
const vsFriBtn = document.querySelector('.friend');
// for instructions page
const insPage = document.querySelector('.overlay');
const backBtn = document.querySelector('.back');

// function to go to main page
const toMainPage = function (com) {
  levelPage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  if (com) {
    comPlayer = 1;
  }
};
// function to reset all value
const reset = function () {
  currentScore = 0;
  player = 0;
  score = [0, 0];
  playing = true;
  time = 500;
  display0();
  rightSide.classList.remove('player-win');
  leftSide.classList.remove('player-win');
  diceNumEle.classList.add('hidden');
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
};
// function to go to level page
const toLevelPage = function () {
  mainPage.classList.add('hidden');
  levelPage.classList.remove('hidden');
  comPlayer = 0;
  reset();
};
// function to show and hide instruction page
const showIns = function () {
  insPage.classList.remove('hidden');
};
const hideIns = function () {
  insPage.classList.add('hidden');
};
// function to generate roll dice number
const genDiceNum = function () {
  if (playing) {
    const diceNum = Math.trunc(Math.random() * 6 + 1);
    diceNumEle.classList.remove('hidden');
    diceNumEle.textContent = diceNum;
    if (diceNum > 1) {
      easyDice1(diceNum);
    } else {
      easyDice2();
      player = player ? 0 : 1;
      easyDice2();
      if (player) {
        display1();
        if (comPlayer) {
          setTimeout(() => {
            diceNumEle.textContent = diceNum;
          }, 500);
          compRun();
        }
      } else {
        display0();
      }
    }
  }
};
function easyDice1(diceNum) {
  currentScore += diceNum;
  document.getElementById(`current-${player}`).textContent = currentScore;
}
function easyDice2() {
  currentScore = 0;
  document.getElementById(`current-${player}`).textContent = currentScore;
}
function display0() {
  leftSide.classList.add('active-player');
  rightSide.classList.remove('active-player');
}
function display1() {
  leftSide.classList.remove('active-player');
  rightSide.classList.add('active-player');
}
// function to hold current score
const holdScore = function () {
  if (playing) {
    easyHold();
    if (player) {
      display1();
      if (comPlayer) {
        compRun();
      }
    } else {
      display0();
    }
  }
};
function easyHold() {
  score[player] += currentScore;
  document.getElementById(`score-${player}`).textContent = score[player];
  currentScore = 0;
  if (score[player] >= 100) {
    playing = false;
    document.getElementById(`pl-${player}`).classList.add('player-win');
  }
  document.getElementById(`current-${player}`).textContent = 0;
  player = player ? 0 : 1;
}
// function to make computer playing
const compRun = function () {
  if (playing) {
    diceBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    while (1) {
      const determineBtn = Math.trunc(Math.random() * 7);
      const newDice = Math.trunc(Math.random() * 6 + 1);
      diceNumEle.classList.remove('hidden');
      if (determineBtn > 2) {
        if (newDice !== 1) {
          setTimeout(() => {
            diceNumEle.textContent = newDice;
            easyDice1(newDice);
          }, time);
        } else {
          setTimeout(() => {
            diceNumEle.textContent = newDice;
            easyDice2();
            player = player ? 0 : 1;
            display0();
          }, time);
          break;
        }
      } else {
        setTimeout(() => {
          easyHold();
          display0();
        }, time);
        break;
      }
      time += 500;
    }
    setTimeout(() => {
      diceBtn.classList.remove('hidden');
      holdBtn.classList.remove('hidden');
    }, time);
    time = 500;
  }
};
// handler event function
vsComBtn.addEventListener('click', function () {
  toMainPage(1);
});
vsFriBtn.addEventListener('click', function () {
  toMainPage(0);
});
returnBtn.addEventListener('click', toLevelPage);
insBtn.addEventListener('click', showIns);
backBtn.addEventListener('click', hideIns);
diceBtn.addEventListener('click', genDiceNum);
newGameBtn.addEventListener('click', reset);
holdBtn.addEventListener('click', holdScore);
document.querySelectorAll('.container button').forEach(function (btn) {
  btn.addEventListener('click', () => {
    btn.classList.add('btn-animation');
    setTimeout(() => btn.classList.remove('btn-animation'), 300);
  });
});
