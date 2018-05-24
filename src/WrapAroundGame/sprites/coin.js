export default class Coin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setGravityY(300);
      
        this.createAnimations();
        this.anims.play('spin', true);

        this.scene.physics.add.collider(this, config.scene.layer);
    }

    update(keys, time, delta) {
        
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'spin',
            frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }
}