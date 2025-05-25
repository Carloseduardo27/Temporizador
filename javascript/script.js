const timerDisplay = document.getElementById('timer');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const customTimeInput = document.getElementById('customTime');
const rocket = document.getElementById('rocket');

//2.Variables de estado del temporizado
let timeLeft = parseInt(customTimeInput.value, 10); // el tiempo inicial en segundos
let timerId = null; //Para almacenar el ID de la funcion setInterval
let isRunning = false; //Bandera para saber si el temporizador está corriendo

//3.formateador de tiempo de MM:SS
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// permitirá ver en tiempo real cómo la pantalla del temporizador se actualiza a medida que el tiempo cambia.
const updateDisplay = () => {
  timerDisplay.textContent = formatTime(timeLeft);
};

// funcion para iniciar e temporizador
const startTimer = () => {
  if (isRunning || timeLeft <= 0) return;

  //de la 34 a 38 disminuyo el valor de timeleft de 1 en cada segundo//
  isRunning = true; // indica que el temporizador esta en ejecucion
  timerId = setInterval(() => {
    timeLeft--; //resta uno al valor actual de time left
    updateDisplay(); //toma el valor actualizado de timeLeft le da formato MM:SS y lo usa para mostrarlo en el pagina

    if (timeLeft <= 0) {
      clearInterval(timerId); //detiene el temporizador que se inicio con setInterval
      isRunning = false; // le indicamos al programa que el temporizador ya no esta activo
      document.querySelector('.container').style.display = 'none';
      message.style.display = 'block'; // le estoy diciendo al navegador que muestre el elemento en bloque lo cual ocupara todo el ancho disponible del mensaje (terminado)
      rocket.style.display = 'block';
      rocket.classList.add('launch');
    }
  }, 1000); // el setInterval se ejecutara cada 1000 milisegundos es decir 1 segundo
};

// Función para pausar el temporizador
const pauseTimer = () => {
  clearInterval(timerId);
  isRunning = false;
};

// Función para resetear el temporizador
const resetTimer = () => {
  pauseTimer();
  timeLeft = parseInt(customTimeInput.value, 10);
  updateDisplay();
  document.querySelector('.container').style.display = 'block'; //no aseguramos el que temporizador se muestre en la pagina
  message.style.display = 'none'; // oculta el mensaje
  rocket.style.display = 'none';
  rocket.classList.remove('launch');
};

// Asignar los eventlisteners a los botones
playBtn.addEventListener('click', startTimer); // inicia el temporizador
pauseBtn.addEventListener('click', pauseTimer); //pausar el temporizador
resetBtn.addEventListener('click', resetTimer); //resetear el temporizador

// Inicializar la pantalla del temporizador al cargar la página
updateDisplay();
