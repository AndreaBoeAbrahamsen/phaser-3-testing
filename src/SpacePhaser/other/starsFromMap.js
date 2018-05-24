export default class Stars extends Phaser.Physics.Arcade.Group {
    constructor(config) {

        super(
            config.world,
            config.scene
        );
        
        /*this.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });*/

        this.createStars();

        this.scene.physics.add.collider(this, config.scene.layer);
        this.scene.physics.add.collider(this.scene.player, this, this.collectStar, null, this);
    }

    update(keys, time, delta) {

    }

    createStars ()
    {
        var stars = this.scene.map.createFromObjects('Stars', 69, { key: 'bigStar' });
        for (var i = 0; i < stars.length; i++)
        {
            //debugger;
            var star = this.create(stars[i].x, stars[i].y, 'bigStar');
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            stars[i].destroy();
        }
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