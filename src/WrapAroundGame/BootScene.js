class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload()
    {
        this.load.image('background', 'assets/img/background.png');
        this.load.spritesheet(
            'boy', 
            'assets/img/boy.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    create()
    {
        this.scene.start('GameScene');
    }
}

export default BootScene;