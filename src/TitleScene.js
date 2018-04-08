import pkg from '../node_modules/phaser/package.json';

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
      
        this.add.image(centerX, centerY * 0.8, 'study');
      
        this.add
          .text(centerX, centerY * 0.4, welcomeMessage, { font: "bold 19px Arial", fill: "#fff" })
          .setOrigin(0.5, 0.5);

          this.add
          .text(centerX, centerY * 1.2, pressToMessage, { font: "bold 17px Arial", fill: "#fff" })
          .setOrigin(0.5, 0.5);
        
        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update()
    {
        if(this.startKey.isDown){
            this.scene.start('PresentationScene');
        }
    }
}

export default TitleScene;
