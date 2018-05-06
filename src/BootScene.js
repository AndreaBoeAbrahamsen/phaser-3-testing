class BootScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'BootScene'
      });
    }

    preload()
    {
        this.load.image('sky', 'assets/img/space.png');
        this.load.image('logo', 'assets/img/phaser3-logo.png');
        this.load.image('red', 'assets/img/red-particle.png');
        //this.load.tilemapTiledJSON('map', 'assets/level1-5.json');
        this.load.tilemapTiledJSON('map', 'assets/level1-stars.json');
        this.load.tilemapTiledJSON('enemyMap', 'assets/enemyLevel.json');
        this.load.tilemapTiledJSON('enemyMap2', 'assets/enemyLevelv2.json');
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
        this.load.spritesheet(
            'droid', 
            'assets/img/droid.png',
            { frameWidth: 32, frameHeight: 32 }
        );
    }

    create()
    {
        this.scene.start('TitleScene');
    }
}

export default BootScene;
