import 'phaser';

import pkg from '../node_modules/phaser/package.json';
import Dude from './sprites/dude';
import PresentationScene from './PresentationScene';

// This is the entry point of your game.

const width = 800;
const height = 608;

var config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [PresentationScene],
  pixelArt: true
};

const game = new Phaser.Game(config);