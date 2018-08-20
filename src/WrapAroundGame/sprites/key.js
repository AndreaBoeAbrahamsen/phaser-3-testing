export default class Door extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        //this.body.setGravityY(300);
        //this.body.immovable = true;
        this.body.allowGravity = false;
        this.touchable = true;
      
        this.createTween();
    }

    update(keys, time, delta) {
        if(this.touchable){
            this.scene.physics.world.overlap(this, this.scene.player.sprite, this.tiuch); 
        } 
    }

    tiuch(){
        console.log("touch");
    }

    createTween() {
        this.tween = this.scene.tweens.add({
            targets: this,
            y: '+=3',
            //ease: 'Bounce.easeIn',
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }
}