export default class Boy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);

        this.body.setSize(18, 25);
        this.body.offset.set(7, 6);  
      
        this.createAnimations();

        this.cursors = config.input.keyboard.createCursorKeys();
        this.bKey = config.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        this.scene.physics.add.collider(this, config.scene.layer);

        this.animationsName = 'idle';
    }

    update(keys, time, delta) {
        if (this.cursors.left.isDown) {
            if (this.bKey.isDown) {
                this.body.setVelocityX(-135);     
            } else {
                this.body.setVelocityX(-100);
            }
            this.flipX = true;
        }
        else if (this.cursors.right.isDown){
            if (this.bKey.isDown){
                this.body.setVelocityX(135);
            } else {
                this.body.setVelocityX(100);
            }
            this.flipX = false;
        }
        else{
            this.body.setVelocityX(0); 
        }

        if (this.cursors.space.isDown && this.body.onFloor()){
            this.body.setVelocityY(-230);
        }

        let animationName = this.getAnimationName();
        this.anims.play(animationName, true); 
    }

    getAnimationName() {
        let name = 'idle'; 
 
        if (this.body.velocity.y < 0 && !this.body.onFloor()) {
            name = 'jump';
        }
        else if (this.body.velocity.y >= 0 && !this.body.onFloor()) {
            name = 'down';
        }
        else if (this.body.velocity.x !== 0 && this.body.onFloor()) {
            if (Math.abs(this.body.velocity.x) > 110) {
                name = 'run';
            } else {
                name = 'walk';
            }
        }
    
        return name;
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('boy', { start: 10, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('boy', { start: 20, end: 27 }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: [ { key: 'boy', frame: 1 } ],
            frameRate: 20
        });
        
        this.scene.anims.create({
            key: 'turn',
            frames: [ { key: 'boy', frame: 0 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'jump',
            frames: [ { key: 'boy', frame: 6 } ],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'down',
            frames: [ { key: 'boy', frame: 7 } ],
            frameRate: 20
        });
    }
}