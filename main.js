const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let score = 0;
let timer;

const config = {
  width: 320,
  height: 400,
  sizeCell: 16,
  sizePoint: 4
}

const point = {
  x: 0,
  y: 0
}

const snake = {
  x: 160,
  y: 192,
  dx: 0,
  dy: -config.sizeCell,
  tail: [],
}

let pointToAdd = [];

function refreshGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x = 160;
  snake.y = 192;
  snake.dx = 0;
  snake.dy = -config.sizeCell;
  snake.tail= [];

  positionPoint();

  drawPoint();
  drawSnake();

}
function game() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  //обновляем точку
  positionPoint();
  //устанавливаем точку
  drawPoint();
  //рисуем змейку
  drawSnake();
}

function drawPoint() {


  context.beginPath();
  context.fillStyle = "#FFFFFF";
  const x = point.x + config.sizeCell / 2;
  const y = point.y + config.sizeCell / 2;
  context.arc(x, y, config.sizePoint, 0, 2 * Math.PI);
  context.fill();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function positionPoint() {
  let repeateRandom = true;
  while (repeateRandom) {
    point.x = getRandomInt(config.width/config.sizeCell)*config.sizeCell;
    point.y = getRandomInt(config.height/config.sizeCell)*config.sizeCell;

    const pointOnSnake = (point.x === snake.x && point.y === snake.y)
      || snake.tail.some((item) => {
        return item.x === point.x && item.y === point.y;
      });
    repeateRandom = pointOnSnake;
  }
}

function drawSnake() {
  context.beginPath();
  context.fillStyle = "#e05b39";
  context.fillRect(snake.x, snake.y, config.sizeCell, config.sizeCell);

  for (let i=0; i<snake.tail.length;i++) {
    context.beginPath();
    context.fillStyle = "#e05b39";
    context.fillRect(snake.tail[i].x , snake.tail[i].y, config.sizeCell, config.sizeCell);
  }
}

document.addEventListener("keydown", function (e) {
	if ( e.code == "ArrowUp" ) {
	 	snake.dx = 0;
    snake.dy = -config.sizeCell;
	} else if ( e.code == "ArrowLeft" ) {
	 	snake.dx = -config.sizeCell;
	 	snake.dy = 0;
	} else if ( e.code == "ArrowDown" ) {
		snake.dx = 0;
  	snake.dy = config.sizeCell;
	} else if ( e.code == "ArrowRight" ) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
});

function checkCrash() {
  return snake.tail.some((item) => {
    return snake.x === item.x && snake.y === item.y;
  })
}

game()

function gameOver() {
  stopTimer();
  alert('Вы запутались...')
}
const btnStart = document.querySelector('.btn-start');
const btnPause = document.querySelector('.btn-pause');
const btnStop = document.querySelector('.btn-stop');

function step() {
  //очищаем поле
  context.clearRect(0, 0, canvas.width, canvas.height);
  //запоминаем текущую точку
  const current = {
    x: snake.x,
    y: snake.y
  }
  //смещаем змейку
  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.y > config.height) {
    snake.y = 0;
  } else if (snake.y < 0) {
    snake.y = config.height - config.sizeCell;
  }
  if (snake.x > config.width) {
    snake.x = 0;
  } else if (snake.x < 0) {
    snake.x = config.width - config.sizeCell;
  }


  if (snake.tail.length > 0) {
    //сдвигаем хвост
    snake.tail.pop();
    snake.tail.unshift(current);
  }

  if (checkCrash()) {
    gameOver();
  };

  if (snake.x === point.x && snake.y === point.y) {

    //в хвосте удваиваем последнюю точку
    if (snake.tail.length > 0) {
      snake.tail.push(snake.tail[snake.tail.length-1]);
    } else {
      //или добавляем в хвост первую точку
      snake.tail.push({x: snake.x, y: snake.y})
    }

    //перемещаем точку
    positionPoint();
    score += 1;
  }

  //перерисовываем змейку
  drawSnake();
  //перерисовываем точку
  drawPoint();
}

function stopTimer() {
  clearInterval(timer);
}

btnStart.addEventListener('click', (evt) => {
  evt.preventDefault();

  timer = setInterval( function() {
    step();
  },250);


})

btnPause.addEventListener('click', (evt) => {
  evt.preventDefault();

  stopTimer()
})

btnStop.addEventListener('click', (evt) => {
  evt.preventDefault();
  stopTimer()
  refreshGame();
})



