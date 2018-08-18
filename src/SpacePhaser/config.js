import BootScene from './BootScene';
import TitleScene from './TitleScene';
import PresentationScene from './PresentationScene';
import ObjectScene from './ObjectScene';
import EnemyScene from './EnemyScene';

const width = 800;
const height = 608;

export default {
  game: null,
  createGame: function(){
    var config = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: 'MyGameTests',
       title: "MyGameTests",
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

