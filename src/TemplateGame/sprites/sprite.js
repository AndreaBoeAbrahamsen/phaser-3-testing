export default class Boy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        /*this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);

        this.body.setSize(18, 25);
        this.body.offset.set(7, 6);  
      
        this.createAnimations();

        this.cursors = config.input;

        this.scene.physics.add.collider(this, config.scene.layer);

        this.animationsName = 'idle';*/
    }

    update(keys, time, delta) {

    }

    createAnimations() {
        /*this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('boy', { start: 10, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [ { key: 'boy', frame: 1 } ],
            frameRate: 20
        });*/
    }
}