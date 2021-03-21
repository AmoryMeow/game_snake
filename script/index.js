import { Snake } from './Snake.js';
import { config } from './config.js';
import { Point } from './Point.js';
import { Canvas } from './draw.js';
import { drawScore } from './drawScore.js';

let score = 0;
let timer;
let restartGame = false;
let speed = 1;

/*** объекты ***/
const snake = new Snake();
const point = new Point();
const canvas = new Canvas('canvas');

/*** кнопки ***/
const btnStart = document.querySelector('.button_play');
const btnPause = document.querySelector('.button_pause');
const btnStop = document.querySelector('.button_stop');

/*** таймер ***/
function stopTimer() {
  clearInterval(timer);
}

function startTimer(speed) {
  const timeout = Math.max(325 - speed * 25, 50);
  timer = setInterval( function() {
    step();
  },timeout);
}

/*** слушатели ***/
document.addEventListener("keydown", function (e) {
	if ( e.code == "ArrowUp" ) {
	 	snake.moveUp();
	} else if ( e.code == "ArrowLeft" ) {
	 	snake.moveLeft();
	} else if ( e.code == "ArrowDown" ) {
		snake.moveDown();
	} else if ( e.code == "ArrowRight" ) {
		snake.moveRight();
	}
});

btnStart.addEventListener('click', (e) => {
  e.preventDefault();
  if (restartGame) {
    refreshGame();
  }
  startTimer(0);
});

btnPause.addEventListener('click', (e) => {
  e.preventDefault();
  stopTimer();
});

btnStop.addEventListener('click', (e) => {
  e.preventDefault();
  stopTimer();
  refreshGame();
});

/*** игра ***/
// сбросить игру
function refreshGame() {
  canvas.clear();
  score = 0;
  drawScore(score);
  timer = 0;
  speed = 1;
  restartGame = false;

  point.getPosition();
  canvas.drawPoint(point);

  snake.getStartPosition();
  canvas.drawSnake(snake);
}

function checkCrash() {
  return snake.tail.some((item) => {
    return snake.x === item.x && snake.y === item.y;
  })
}

function gameOver() {
  stopTimer();
  restartGame = true;
  alert('Вы запутались...')
}

function step() {
  canvas.clear();
  snake.move();

  if (checkCrash()) {
    gameOver();
  };

  //проверим попадание
  if (snake.x === point.x && snake.y === point.y) {
    snake.addPoint();
    score += 1;
    drawScore(score);

    //перемещаем точку
    point.getPosition();

    //проверим не пересекается ли точка со змейкой
    let repeate = true;
    while (repeate) {
      point.getPosition();
      const pointOnSnake = (point.x === snake.x && point.y === snake.y)
        || snake.tail.some((item) => {
          return item.x === point.x && item.y === point.y;
        });
        repeate = pointOnSnake;
    }

  }

  canvas.drawPoint(point);
  canvas.drawSnake(snake);

  //ускорение
  if (score >  speed * 10) {
    speed += 1;
    stopTimer()
    startTimer(speed);
  }
}

function game() {
  refreshGame();
}

game()
