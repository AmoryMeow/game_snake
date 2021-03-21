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
}
