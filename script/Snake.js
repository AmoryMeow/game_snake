import { config } from "./config.js";

export class Snake {
  constructor() {
    this.getStartPosition();
  }

  getStartPosition() {
    this.x = config.startSnake.x;
    this.y = config.startSnake.y;
    this.tail = [];
    this.dx = 0;
    this.dy = - config.sizeCell;
  }

  moveUp() {
    this.dx = 0;
    this.dy = - config.sizeCell;
  }

  moveDown() {
    this.dx = 0;
    this.dy = config.sizeCell;
  }

  moveLeft() {
    this.dx = - config.sizeCell;
    this.dy = 0;
  }

  moveRight() {
    this.dx = config.sizeCell;
    this.dy = 0;
  }

  //сделать шаг
  move() {

   //запоминаем текущую точку
    const current = {
      x: this.x,
      y: this.y
    }

    //сдвиг головы
    this.x += this.dx;
    this.y += this.dy;

    //проход через стены
    if (this.y > config.height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = config.height - config.sizeCell;
    }
    if (this.x > config.width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = config.width - config.sizeCell;
    }

    if (this.tail.length > 0) {
      //сдвигаем хвост
      this.tail.pop();
      this.tail.unshift(current);
    }

  }

  //увеличить змейку
  addPoint() {
    //в хвосте удваиваем последнюю точку
    if (this.tail.length > 0) {
      this.tail.push(this.tail[this.tail.length - 1]);
    } else {
      //или добавляем в хвост первую точку
      this.tail.push({
        x: this.x,
        y: this.y
      })
    }
  }

}
