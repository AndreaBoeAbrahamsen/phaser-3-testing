class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload()
    {
        this.load.image('background', 'assets/img/springBackground.png');
        this.load.tilemapTiledJSON('map', 'assets/springLevel1.json');
        this.load.image('springTiles', 'assets/img/springTiles.png');
        this.load.image('retroFont', 'assets/img/retroFont.png');
        this.load.spritesheet(
            'boy', 
            'assets/img/boy.png',
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.spritesheet(
            'coin', 
            'assets/img/coins.png',
            { frameWidth: 16, frameHeight: 16 }
        );
        this.load.tilemapTiledJSON('seasonMap', 'assets/seasonLevel05.json');
        this.load.image('seasonTiles', 'assets/img/seasonTiles.png');
    }

    create()
    {
        this.scene.start('GameScene');
    }
}

export default BootScene;