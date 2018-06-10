import BootScene from './BootScene';
//import TitleScene from './TitleScene';
import GameScene from './GameScene';

const width = 800;
const height = 608;

var config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: 'elementId',
    title: "GameTitle",
    physics: {
      default: 'arcade',
      arcade: {
        //debug: true,
        gravity: { y: 200 }
      }
    },
    scene: [
      BootScene, 
      TitleScene,
      GameScene
    ],
    pixelArt: true
  };
  const game = new Phaser.Game(config);