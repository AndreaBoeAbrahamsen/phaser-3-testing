export default class Animations {
    constructor({ scene, entity }) {
        this.createAnimations({ scene, entity });
        this.scene = scene;
        this.entity = entity;
    }

    sequence(name) {
        return new Promise((resolve, reject) => {
          this.anims.play(name, true);
          this.on(
            'animationcomplete',
            (animation, frame) => {
              resolve(name);
            },
            this
          );
        });
    }

    createAnimations({ scene, entity }) {
        scene.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNumbers('boy', { start: 10, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('boy', { start: 20, end: 27 }),
            frameRate: 15,
            repeat: -1
        });

        scene.anims.create({
            key: 'idle',
            frames: [ { key: 'boy', frame: 1 } ],
            frameRate: 20
        });
        
        scene.anims.create({
            key: 'turn',
            frames: [ { key: 'boy', frame: 0 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'jump',
            frames: [ { key: 'boy', frame: 6 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'down',
            frames: [ { key: 'boy', frame: 7 } ],
            frameRate: 20
        });

        scene.anims.create({
            key: 'land',
            frames: [ { key: 'boy', frame: 8 } ],
            frameRate: 10
        });
    }
}