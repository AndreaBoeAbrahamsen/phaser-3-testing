import BootScene from './BootScene';
import GameScene from './GameScene';

var config = {
    type: Phaser.AUTO,
    width: 200,
    height: 144,
    parent: 'WrapAround',
    title: "WrapAround",
    physics: {
      default: 'arcade',
      arcade: {
        //debug: true,
        gravity: { y: 200 }
      }
    },
    scene: [
      BootScene, 
      GameScene
    ],
    pixelArt: true
  };
  const game = new Phaser.Game(config);