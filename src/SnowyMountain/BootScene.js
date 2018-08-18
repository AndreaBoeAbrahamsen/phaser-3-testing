class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload()
    {
        this.load.tilemapTiledJSON('map', 'assets/snowey.json');
        this.load.image('tiles', 'assets/img/snowey-town-trans-extruded.png');
        this.load.spritesheet(
            'people', 
            'assets/img/tiny-people.png',
            { frameWidth: 16, frameHeight: 17 }
        );
    }

    create()
    {
        this.scene.start('GameScene');
    }
}

export default BootScene;