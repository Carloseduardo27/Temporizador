const timerDisplay = document.getElementById('timer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let timeLeft = 60;
let timerId = null;
let isRunning = false;

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const updateDisplay = () => {
  timerDisplay.textContent = formatTime(timeLeft);
};

const startTimer = () => {
  if (isRunning || timeLeft <= 0) return;

  isRunning = true;
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      isRunning = false;
      document.querySelector('.container').style.display = 'none';
      message.style.display = 'block';
    }
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timerId);
  isRunning = false;
};

const resetTimer = () => {
  pauseTimer();
  timeLeft = 60;
  updateDisplay();
  document.querySelector('.container').style.display = 'block';
  message.style.display = 'none';
};

playBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Inicialización
updateDisplay();
