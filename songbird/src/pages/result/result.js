import '../../assets/styles/fonts.css'
import '../../assets/styles/normalize.css'
import '../../assets/styles/body.css'
import '../../assets/styles/header.css'
import '../../assets/styles/footer.css'
import './result.css'

import { burgerOpen, openBurger, closeBurger } from '../../assets/js/burger'
import { translation, setLang, lang, changeLang, flag, setFlag, toggleFlag, translateHeader } from '../../assets/js/translate'

burgerOpen.onclick = openBurger;
document.onclick = closeBurger;

let outputScore = (localStorage.getItem("score")) ? (localStorage.getItem("score")) : 0;

const initResult = () => {
  setFlag();
  setLang();
  translateHeader();
  initResultLayout();
}
initResult();

function initResultLayout() {
  if (+outputScore) {
    return;
  }

  const header = document.querySelector(".result__header");
  header.textContent = translation[lang].resultHeader;
  const paragraph = document.querySelector(".result__paragraph");
  paragraph.textContent = translation[lang].resultParagraph;
  const button = document.querySelector(".result__button");
  button.textContent = translation[lang].resultButton;
}

export function showWin() {
  if (!(+outputScore)) {
    return;
  }

  const header = document.querySelector(".result__header");
  header.textContent = translation[lang].resultWinHeader;
  const paragraph = document.querySelector(".result__paragraph");
  paragraph.innerHTML = translation[lang].resultWinParagraph;
  const score = document.querySelector(".result__score");
  score.textContent = outputScore;
  const button = document.querySelector(".result__button");
  button.textContent = translation[lang].resultWinButton;
}

showWin();

const resultButton = document.querySelector(".result__button");
resultButton.onclick = function() {
  outputScore = 0;
  localStorage.setItem("score", 0);
  window.location.href = "main.html";
};

flag.onclick = function() {
  changeLang();
  toggleFlag();
  translateHeader();
  initResultLayout();
  showWin();
};