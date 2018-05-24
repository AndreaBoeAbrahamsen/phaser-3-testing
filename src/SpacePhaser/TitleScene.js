import pkg from '../../node_modules/phaser/package.json';

class TitleScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'TitleScene'
      });
    }

    preload(){
    }

    create()
    {
        const centerX = 800 / 2;
        const centerY = 600 / 2;
        const welcomeMessage = `Welcome to Phaser ${pkg.version}`;
        const pressToMessage = 'Press x to play 1th';
      
        this.add.image(400, 300, 'sky');

        var particles = this.add.particles('red');
    
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
    
        var logo = this.physics.add.image(400, 100, 'logo');
    
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    
        emitter.startFollow(logo);
      
        this.add
          .text(centerX, centerY * 0.4, welcomeMessage, { font: "bold 19px Arial", fill: "#fff" })
          .setOrigin(0.5, 0.5);

        this.add
          .text(centerX, centerY * 1.2, pressToMessage, { font: "bold 17px Arial", fill: "#fff" })
          .setOrigin(0.5, 0.5);
        
        this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    }

    update()
    {
        if(this.xKey.isDown){
            this.scene.start('PresentationScene');
        } else if(this.cKey.isDown){
            this.scene.start('ObjectScene');
        }else if(this.vKey.isDown){
            this.scene.start('EnemyScene');
        }
    }
}

export default TitleScene;
