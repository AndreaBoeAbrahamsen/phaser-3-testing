import Behaviors from './behaviors';
import Animations from './animations';

export default class Boy extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        //this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);

        this.body.setSize(18, 25);
        this.body.offset.set(7, 6);  

        this.cursors = config.input.keyboard.createCursorKeys();
        this.bKey = config.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        this.scene.physics.add.collider(this, config.scene.layer);

        this.isFalling = false;

        this.animations = new Animations({
            scene: this.scene,
            entity: this
        });
        this.sequence = this.animations.sequence;

        this.behaviors = new Behaviors({
            scene: this.scene,
            entity: this
        });

        this.velocities = {
            walking: 100,
            running: 135,
            turning: 30,
            jump: 230,
            landing: 40,
        };
    }

    updateFsm() {
        const { behaviors, velocities } = this;
        const onFloor = this.body.onFloor();

        if (this.cursors.left.isDown) {
            if (this.bKey.isDown) {
                behaviors.handle('run', {velocity: -velocities.running});   
            } else {
                behaviors.handle('walk', {velocity: -velocities.walking});  
            }
            this.flipX = true;
        }
        else if (this.cursors.right.isDown){
            if (this.bKey.isDown){
                behaviors.handle('run', {velocity: velocities.running});  
            } else {
                behaviors.handle('walk', {velocity: velocities.walking});  
            }
            this.flipX = false;
        }
        else{
            behaviors.handle('idle'); 
        }

        if (this.cursors.space.isDown && onFloor){
            behaviors.handle('jump', {velocity: -velocities.jump});  
        }

        if (this.isFalling && onFloor){
            behaviors.handle('land'); 
            this.isFalling = false; 
        }

        if (this.body.velocity.y >= 0 && !onFloor){
            behaviors.handle('fall'); 
            this.isFalling = true; 
        }
    }
}

