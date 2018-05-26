export default class Coin extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setGravityY(300);
      
        this.createAnimations();
        this.play('spin', true);

        this.scene.physics.add.collider(this, config.scene.layer);

        this.touchable = true;
    }

    update(keys, time, delta) {
        if(this.touchable)
            this.scene.physics.world.overlap(this, this.scene.player, this.coinCollect.bind(this));
    }

    coinCollect(coin, player) {
        this.scene.events.emit('collectCoin');

        this.touchable = false;
        this.play('glitter');
        this.on('animationcomplete', this.goAway, this);
    }

    goAway(animation, frame) {
        this.destroy();
    }

    createAnimations() {
        this.scene.anims.create({
            key: 'spin',
            frames: this.scene.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'glitter',
            frames: this.scene.anims.generateFrameNumbers('coin', { start: 4, end: 7 }),
            frameRate: 20,
            repeat: 0
        });
    }
}