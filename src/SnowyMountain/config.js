import BootScene from './BootScene';
import GameScene from './GameScene';

const width = 200;
const height = 144;

export default {
  game: null,
  createGame: function(){
    var config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: 'SnowyMountain',
       title: "SnowyMountain",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 }
        }
      },
      scene: [
        BootScene, 
        GameScene
      ],
      pixelArt: true,
      antialias: false
    };
    
    this.game = new Phaser.Game(config);
    return this;
  },
  destroyGame: function(){
    this.game.destroy(true);
  }
};