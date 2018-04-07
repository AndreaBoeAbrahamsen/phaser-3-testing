import Dude from './sprites/dude';

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
        /*const centerX = width / 2;
        const centerY = height / 2;
        const welcomeMessage = `Welcome to Phaser ${pkg.version}`;

        this.add.image(centerX, centerY * 1.2, 'study');

        this.add
            .text(centerX, centerY * 0.8, welcomeMessage, { font: "bold 19px Arial", fill: "#fff" })
            .setOrigin(0.5, 0.5);*/

        this.add.tileSprite(400, 304, 800, 608,'background');

        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('space16', 'ground');
        this.layer = this.map.createStaticLayer('Rutelag 1', this.tiles, 0, 0);
        //map.setCollisionByExclusion([0, 1, 13, 14, 15, 16, 46, 47, 48, 49, 50, 51]);
        //map.setCollisionBetween(1, 51);
        this.map.setCollision([ 1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 22, 23, 24, 35, 36, 37, 38, 39, 40, 41, 52, 53, 54, 55, 56, 57, 58, 64, 65 ]);

        this.score = 0;

        this.player = new Dude({
            scene: this,
            key: 'dude',
            x: 100, //16 * 6, 3500, 
            y: 450, //this.sys.game.config.height - 48 - 48
            input: this.input.keyboard.createCursorKeys()
        });

        this.physics.add.collider(this.player, this.layer);

        this.stars = this.physics.add.group({
            key: 'bigStar',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        this.physics.add.collider(this.stars, this.layer);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);

        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.layer);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

        var debugGraphics = this.add.graphics();
        this.map.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        }); 
    }

    update(time, delta)
    {
        this.player.update();
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);

        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
        }
    }

    hitBomb (player, bomb)
    {
        this.physics.pause();

        this.player.setTint(0xff0000);

        this.player.anims.play('turn');

        this.gameOver = true;
    }
}

export default PresentationScene;
