import Dude from './sprites/dude';
import Bombs from './other/bombs';
import Stars from './other/starsFromMap';

class PresentationScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'ObjectScene'
      });
    }

    create()
    {
        this.add.tileSprite(400, 300, 800, 600,'background');

        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('space16', 'ground');
        this.layer = this.map.createStaticLayer('Rutelag 1', this.tiles, 0, 0);
        //map.setCollisionByExclusion([1, 13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);
        //map.setCollisionBetween(1, 51);
        this.map.setCollision([ 
            1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 
            22, 23, 24, 35, 36, 37, 38, 39, 40, 41, 
            52, 53, 54, 55, 56, 57, 58, 64, 65 ]);
        //this.showDebugging();

        this.player = new Dude({
            scene: this,
            key: 'dude',
            x: 100, //16 * 6, 3500, 
            y: 450, //this.sys.game.config.height - 48 - 48
            input: this.input.keyboard.createCursorKeys()
        });

        this.score = 0;
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        this.stars = new Stars({
            world: this.physics.world,
            scene: this
        });

        this.bombs = new Bombs({
            world: this.physics.world,
            scene: this
        });
    }

    update(time, delta)
    {
        this.player.update();
        //this.bombs.update();
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
