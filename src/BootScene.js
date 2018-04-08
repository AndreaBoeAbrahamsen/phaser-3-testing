class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload()
    {
        this.load.image('study', 'assets/img/study.png');
        this.load.tilemapTiledJSON('map', 'assets/level1-5.json');
        this.load.image('ground', 'assets/img/tiles-1.png');
        this.load.image('background', 'assets/img/background.png');
        this.load.image('star', 'assets/img/star.png');
        this.load.image('bigStar', 'assets/img/star2.png');
        this.load.image('bomb', 'assets/img/bomb.png');
        this.load.spritesheet(
            'dude', 
            'assets/img/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create()
    {
        this.scene.start('TitleScene');
    }
}

export default BootScene;
