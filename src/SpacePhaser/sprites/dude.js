export default class Dude extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);

        this.body.setSize(27, 40);
        this.body.offset.set(2, 7);  
      
        this.createAnimations();

        this.cursors = config.input;
        this.scene.physics.add.collider(this, config.scene.layer);
    }

    update(keys, time, delta) {
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            this.anims.play('left', true);
        }
        else if (this.cursors.right.isDown){
            this.body.setVelocityX(160);
            this.anims.play('right', true);
        }
        else{
            this.body.setVelocityX(0);
            this.anims.play('turn');
        }
      
        if (this.cursors.up.isDown && this.body.onFloor()){
            this.body.setVelocityY(-430);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }
}