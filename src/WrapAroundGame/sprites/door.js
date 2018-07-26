export default class Door extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        //this.body.setGravityY(300);
        //this.body.immovable = true;
        this.body.allowGravity = false;
      
        this.createAnimations();

        this.scene.physics.add.collider(this, config.scene.layer);

        this.touchable = false;
    }

    update(keys, time, delta) {
        //if(this.touchable)
            //this.scene.physics.world.overlap(this, this.scene.player, this.coinCollect.bind(this));
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'open',
            frames: this.scene.anims.generateFrameNumbers('door', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });
   
    }
}