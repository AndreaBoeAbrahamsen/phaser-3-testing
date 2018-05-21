import Boy from './sprites/boy';

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      });
    }

    create()
    {
        this.add.tileSprite(200, 150, 400, 300,'background');

        this.player = new Boy({
            scene: this,
            key: 'boy',
            x: 50, 
            y: 50,
            input: this.input.keyboard.createCursorKeys()
        });
    }
}

export default GameScene;
