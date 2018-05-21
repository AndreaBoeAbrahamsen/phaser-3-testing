export default class Boy extends Phaser.GameObjects.Sprite {
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
        //this.scene.physics.add.collider(this, config.scene.layer);
    }

    update(keys, time, delta) {
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            this.flipX = true;
            this.anims.play('walk', true);
        }
        else if (this.cursors.right.isDown){
            this.body.setVelocityX(160);
            this.flipX = false;
            this.anims.play('walk', true);
        }
        else{
            this.body.setVelocityX(0);
            this.anims.play('idle');
        }
      
        if (this.cursors.up.isDown && this.body.onFloor()){
            this.body.setVelocityY(-430);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('boy', { start: 10, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [ { key: 'boy', frame: 2 } ],
            frameRate: 20
        });
        
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'boy', frame: 1 } ],
            frameRate: 20
        });
    }
}