import Phaser from "phaser";

export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    this.createAnimation();

    this.sprite = scene.physics.add
        .sprite(x, y, "people")
        .setSize(11, 6)
        .setOffset(3, 10);
    
    const { LEFT, RIGHT, UP, DOWN } = Phaser.Input.Keyboard.KeyCodes;
    this.keys = scene.input.keyboard.addKeys({
      left: LEFT,
      right: RIGHT,
      up: UP,
      down: DOWN
    });

  }

  update() {
    const { keys, sprite } = this;

    const speed = 80;
    const prevVelocity = sprite.body.velocity.clone();
  
    sprite.body.setVelocity(0);
  
    if (keys.left.isDown) {
        sprite.body.setVelocityX(-speed);
        sprite.setFlipX(true);
    } else if (keys.right.isDown) {
        sprite.body.setVelocityX(speed);
        sprite.setFlipX(false);
    }

    if (keys.up.isDown) {
        sprite.body.setVelocityY(-speed);
    } else if (keys.down.isDown) {
        sprite.body.setVelocityY(speed);
    }

    sprite.body.velocity.normalize().scale(speed);

    if (keys.left.isDown) {
        sprite.anims.play("player-right-walk", true);
      } else if (keys.right.isDown) {
        sprite.anims.play("player-right-walk", true);
      } else if (keys.up.isDown) {
        sprite.anims.play("player-back-walk", true);
      } else if (keys.down.isDown) {
        sprite.anims.play("player-front-walk", true);
      } else {
        sprite.anims.stop();

        if (prevVelocity.x < 0) sprite.setFrame(1);
        else if (prevVelocity.x > 0) sprite.setFrame(1);
        else if (prevVelocity.y < 0) sprite.setFrame(2);
        else if (prevVelocity.y > 0) sprite.setFrame(0);
      }
  }

  createAnimation() {
    const anims = this.scene.anims;

    anims.create({
      key: "player-front-walk",
      frames: [
          {key:"people", frame: 0}, 
          {key:"people", frame: 3}, 
          {key:"people", frame: 0}, 
          {key:"people", frame: 6}
      ],
      frameRate: 7,
      repeat: -1
    });
    anims.create({
        key: "player-back-walk",
        frames: [
            {key:"people", frame: 2}, 
            {key:"people", frame: 5}, 
            {key:"people", frame: 2}, 
            {key:"people", frame: 8}
        ],
        frameRate: 7,
        repeat: -1
    });
    anims.create({
        key: "player-right-walk",
        frames: [
            {key:"people", frame: 1}, 
            {key:"people", frame: 4}, 
            {key:"people", frame: 1}, 
            {key:"people", frame: 7}
        ],
        frameRate: 7,
        repeat: -1
      });
  }
}
