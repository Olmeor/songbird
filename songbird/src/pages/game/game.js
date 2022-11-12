import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import './game.css'
import './player.css'
import './win_popup.css'

import birdsData from '../../assets/js/birds'
import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'
import { setDurationTime } from './player'
import { winPopupOpen, winPopupClose} from './win_popup'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;



export let randomBird = getRandomNum();
export let questionIndex = 0;
export let gameScore = 0;
let currentScore = 5;
export let winGame = false;

function getRandomNum(num = 6) {
  return Math.floor(Math.random() * num); // 0 - num-1
}

export function initLevel() {
  winPopupClose();
  const gameBirdList = document.querySelector(".game-bird__list");
  gameBirdList.textContent = '';
  if (!questionIndex) { resetScore() };

  for (let i = 0; i < 6; i++) {
    const li = document.createElement("li");
    gameBirdList.append(li)
    li.classList.add("game-bird__item");
    li.id = `bird-${i}`;
    const span = document.createElement("span");
    li.prepend(span);
    span.classList.add("game-bird__button");
    li.append(`${birdsData[questionIndex][i].name}`);
  }

  const nextButton = document.querySelector(".game__footer-button");
  nextButton.textContent = "Следующий вопрос";
  if (!nextButton.hasAttribute("disabled")) {
    nextButton.disabled = true;
  }

  const choiceBird = document.querySelectorAll(".game-bird__item");
  choiceBird.forEach(e => e.onclick = checkRandomBird);

  resetLevel();
  const level = document.querySelectorAll(".game__item");
  level[questionIndex].classList.add("game__item_active");

  resetBird();
  resetSolution();

  const audioDurationTime = document.querySelector(".play-duration-time");
  setDurationTime(audioDurationTime, randomBird);
}

initLevel();

function resetLevel() {
  const level = document.querySelectorAll(".game__item");
  level.forEach(e => {
    if (e.classList.contains("game__item_active")) {
      e.classList.remove("game__item_active");
    }
  });
}

function resetScore() {
  const score = document.querySelector(".game-random__score");
  score.lastChild.textContent = "0";
  gameScore = 0;
}

function resetBird() {
  const birdName = document.querySelector(".game-random__header");
  birdName.textContent = "* * * * * *";
  const birdImage = document.querySelector(".game-random__image");
  birdImage.style.background = `url('../../assets/images/back.jpg') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
}

resetBird();
resetScore();

function resetSolution() {
  const birdName = document.querySelector(".game-bird__name");
  birdName.textContent = "Прослушайте голос птицы";
  const birdSubName = document.querySelector(".game-bird__species");
  birdSubName.textContent = "Выберите птицу из списка";
  const birdImage = document.querySelector(".game-bird__image");
  birdImage.style.background = `url('../../assets/images/back-game.jpg') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
  const birdPlayer = document.querySelectorAll(".game-random__player-wrapper");
  birdPlayer[1].classList.add('hidden-block');
  const birdDesc = document.querySelector(".game-bird__description");
  birdDesc.textContent = "";
}

function addSolution(birdChoice) {
  const birdName = document.querySelector(".game-bird__name");
  birdName.textContent = `${birdsData[questionIndex][birdChoice].name}`;
  const birdSubName = document.querySelector(".game-bird__species");
  birdSubName.textContent = `${birdsData[questionIndex][birdChoice].species}`;
  const birdImage = document.querySelector(".game-bird__image");
  birdImage.style.background = `url('${birdsData[questionIndex][birdChoice].image}') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
  const birdPlayer = document.querySelectorAll(".game-random__player-wrapper");
  birdPlayer[1].classList.remove('hidden-block');
  const birdDesc = document.querySelector(".game-bird__description");
  birdDesc.textContent = `${birdsData[questionIndex][birdChoice].description}`;
  birdDesc.classList.remove('hidden-block');
}

function checkRandomBird(e) {
  let birdNum = e.target.closest(".game-bird__item");
  let birdChoice = e.path[0].id.slice(-1);

  if (!birdNum || birdNum.firstChild.classList.contains("_error")) {
    return;
  }
  addSolution(birdChoice);
  const audioDurationTime = document.querySelector(".play-duration-time_current");
  setDurationTime(audioDurationTime, birdChoice);

  if (birdNum.lastChild.textContent == birdsData[questionIndex][randomBird].name) {
    addWinLevel(birdNum);
    gameScore += currentScore;
    currentScore = 5;
    const score = document.querySelector(".game-random__score");
    score.lastChild.textContent = `${gameScore}`;
    if (questionIndex < 5) {
      questionIndex+= 5;
      playTrue();
    } else {
      initWin();
      playWin();
      winPopupOpen();
      // window.location.href = "result.html";
      winGame = true;
    }
    randomBird = getRandomNum();
  } else {
    birdNum.firstChild.classList.add("_error");
    currentScore--;
    playFalse();
  }
}

const nextButton = document.querySelector(".game__footer-button");
nextButton.onclick = initLevel;

function addWinLevel(birdNum) {
  const choiceBird = document.querySelectorAll(".game-bird__item");
  choiceBird.forEach(e => e.onclick = null);
  birdNum.firstChild.classList.add("_success");
  const nextButton = document.querySelector(".game__footer-button");
  nextButton.removeAttribute("disabled");
  const birdName = document.querySelector(".game-random__header");
  birdName.textContent = `${birdsData[questionIndex][randomBird].name}`;
  const birdImage = document.querySelector(".game-random__image");
  birdImage.style.background = `url('${birdsData[questionIndex][randomBird].image}') no-repeat center`;
  birdImage.style.backgroundSize = "cover";
}

function initWin () {
  const nextButton = document.querySelector(".game__footer-button");
  nextButton.textContent = "Новая игра";
  questionIndex = 0;
}


// Player



// setDurationTime();

function playFalse() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/false.mp3';
  audio.play();
}

function playTrue() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/true.mp3';
  audio.play();
}

function playWin() {
  let audio = new Audio();
  audio.src = '../../assets/sounds/win.mp3';
  audio.play();
}