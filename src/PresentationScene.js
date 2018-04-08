import Dude from './sprites/dude';
import Bombs from './other/bombs';
import Stars from './other/stars';

class PresentationScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'PresentationScene'
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
        this.add.tileSprite(400, 304, 800, 608,'background');

        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('space16', 'ground');
        this.layer = this.map.createStaticLayer('Rutelag 1', this.tiles, 0, 0);
        //map.setCollisionByExclusion([0, 1, 13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);
        //map.setCollisionBetween(1, 51);
        this.map.setCollision([ 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23, 24, 35, 36, 37, 38, 39, 40, 41, 52, 53, 54, 55, 56, 57, 58, 64, 65 ]);

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        this.player = new Dude({
            scene: this,
            key: 'dude',
            x: 100, //16 * 6, 3500, 
            y: 450, //this.sys.game.config.height - 48 - 48
            input: this.input.keyboard.createCursorKeys()
        });

        this.stars = new Stars({
            world: this.physics.world,
            scene: this
        });

        this.bombs = new Bombs({
            world: this.physics.world,
            scene: this
        });

        this.showDebugging();
    }

    update(time, delta)
    {
        this.player.update();
    }

    showDebugging ()
    {
        var debugGraphics = this.add.graphics();
        this.map.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        }); 
    }
}

export default PresentationScene;
