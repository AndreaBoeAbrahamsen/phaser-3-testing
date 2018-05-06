import 'phaser';

import BootScene from './BootScene';
import TitleScene from './TitleScene';
import PresentationScene from './PresentationScene';
import ObjectScene from './ObjectScene';
import EnemyScene from './EnemyScene';

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
  scene: [
    BootScene, 
    TitleScene,
    PresentationScene,
    ObjectScene,
    EnemyScene
  ],
  pixelArt: true
};

const game = new Phaser.Game(config);