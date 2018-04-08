export default class Bomb extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setBounce(1);
        this.body.setCollideWorldBounds(true);
        this.body.setVelocity(Phaser.Math.Between(-200, 200), 20);
        this.body.allowGravity = false;
        //this.scene.physics.world.collide(this, this.scene.layer);
    }

    update(keys, time, delta) {

    }
}