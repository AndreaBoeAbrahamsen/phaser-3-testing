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
        this.load.tilemapTiledJSON('seasonMap', 'assets/seasonLevel08.json');
        this.load.image('seasonTiles', 'assets/img/seasonTilesExtended.png');
        
        //this.load.image('door', 'assets/img/wood-door-sheet.png');
        this.load.spritesheet(
            'door', 
            'assets/img/wood-door-sheet.png',
            { frameWidth: 28, frameHeight: 34 }
        );

        this.load.image('key', 'assets/img/door-key.png');

        this.load.image('sky', 'assets/img/springSky.png');
        this.load.image('forest', 'assets/img/springForest.png');
    }

    create()
    {
        this.scene.start('GameScene');
    }
}

export default BootScene;