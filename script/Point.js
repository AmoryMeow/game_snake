import {config} from './config.js';

export class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  _getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getPosition() {
    this.x = this._getRandomInt(config.width/config.sizeCell)*config.sizeCell;
    this.y = this._getRandomInt(config.height/config.sizeCell)*config.sizeCell;
  }
}
