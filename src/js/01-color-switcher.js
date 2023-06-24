function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startBtn: document.querySelector('.start_button'),
  stopBtn: document.querySelector('.stop_button'),
  bodyStyle: document.querySelector('body'),
};
let timerId = null;
refs.startBtn.addEventListener('click', onStartButtonClick);
refs.stopBtn.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  timerId = setInterval(() => {
    refs.bodyStyle.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtn.disabled = true;
}

function onStopButtonClick() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
}
