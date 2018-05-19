export default class Bombs extends Phaser.Physics.Arcade.Group {
    constructor(config) {
        super(config.world, config.scene);
        this.scene.physics.add.collider(this, config.scene.layer);
        this.scene.physics.add.collider(this.scene.player, this, this.hitBomb, null, this);

        this.createBomb();
    }

    update(keys, time, delta) {
        var children = this.getChildren();
        for (var i = 0; i < children.length; i++)
        {
            var length = Math.abs(this.scene.player.body.x - children[i].body.x);
            if(length > 400){
                var playerPastBomb = this.scene.player.body.x > children[i].body.x;
                if((playerPastBomb && children[i].body.velocity.x < 0) ||
                  (!playerPastBomb && children[i].body.velocity.x > 0)){
                    var x = children[i].body.velocity.x;
                    children[i].body.setVelocityX(-x);
                } 
            }
        }
    }

    createBomb() {
        var x = (this.scene.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = this.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
        //bomb.setTint(0x0000ff);
    }

    hitBomb (player, bomb)
    {
        this.scene.physics.pause();
        this.scene.player.setTint(0xff0000);
        this.scene.player.anims.play('turn');
        this.scene.gameOver = true;
    }
}