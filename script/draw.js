import { config } from "./config.js";

export class Canvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
  }

  //очистка поля
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //нарисовать точку
  drawPoint({x, y}) {
    this.context.beginPath();
    this.context.fillStyle = config.colorPoint;
    const pointX = x + config.sizeCell / 2;
    const pointY = y + config.sizeCell / 2;
    this.context.arc(pointX, pointY, config.sizePoint, 0, 2 * Math.PI);
    this.context.fill();
  }

  //нарисовать змейку
  drawSnake({x, y, tail}) {
    this.context.beginPath();
    this.context.fillStyle = config.colorSnake;
    this.context.fillRect(x, y, config.sizeCell, config.sizeCell);

    for (let i=0; i<tail.length; i++) {
      this.context.beginPath();
      this.context.fillStyle = config.colorSnake;
      this.context.fillRect(tail[i].x , tail[i].y, config.sizeCell, config.sizeCell);
    }
  }

}
