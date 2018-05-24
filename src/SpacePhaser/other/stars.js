export default class Stars extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(
            config.world, 
            config.scene,
            {
                key: 'bigStar',
                repeat: 11,
                setXY: { x: 12, y: 0, stepX: 70 }
            }
        );
        this.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.scene.physics.add.collider(this, config.scene.layer);
        this.scene.physics.add.collider(this.scene.player, this, this.collectStar, null, this);
    }

    update(keys, time, delta) {

    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        this.scene.score += 10;
        this.scene.scoreText.setText('Score: ' + this.scene.score);

        if (this.countActive(true) === 0)
        {
            this.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            this.scene.bombs.createBomb();
        }
    }
}