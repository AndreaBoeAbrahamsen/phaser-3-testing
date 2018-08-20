import Behaviors from './behaviors';
import Animations from './animations';

export default class Boy {
    constructor(config) {
        this.scene = config.scene;

        this.sprite = this.scene.physics.add
            .sprite(config.x, config.y, config.key)
            .setCollideWorldBounds(true)
            .setGravityY(300)
            //.setBounce(0.2)
            .setSize(18, 25)
            .setOffset(7, 6)
            .setDrag(1000, 0)
            .setMaxVelocity(150, 200);
        this.scene.physics.add.collider(this.sprite, config.scene.layer);

        this.isFalling = false;
        this.direction = 'right';

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
            jump: 200,
            airSpeed: 90,
            landing: 40,
        };

        const { LEFT, RIGHT, SPACE, B } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
          left: LEFT,
          right: RIGHT,
          space: SPACE,
          b: B
        });
    
    }

    update() {
        const { keys, sprite, behaviors, velocities } = this;
        const onFloor = sprite.body.onFloor();

        if (keys.left.isDown) {
            if (keys.b.isDown) {
                behaviors.handle('run', {velocity: velocities,  direction: 'left'});   
            } else {
                behaviors.handle('walk', {velocity: velocities,  direction: 'left'});  
            }
        }
        else if (keys.right.isDown){
            if (keys.b.isDown){
                behaviors.handle('run', {velocity: velocities, direction: 'right'});  
            } else {
                behaviors.handle('walk', {velocity: velocities, direction: 'right'});  
            }
        }
        else{
            behaviors.handle('idle'); 
        }

        if (keys.space.isDown && onFloor){
            behaviors.handle('jump', {velocity: velocities});  
        }

        if (this.isFalling && onFloor){
            behaviors.handle('land'); 
            this.isFalling = false; 
        }

        if (sprite.body.velocity.y >= 0 && !onFloor){
            behaviors.handle('fall'); 
            this.isFalling = true; 
        }
    }
}

