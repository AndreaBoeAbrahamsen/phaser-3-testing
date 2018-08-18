import BootScene from './BootScene';
import GameScene from './GameScene';

export default {
  game: null,
  createGame: function(){
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