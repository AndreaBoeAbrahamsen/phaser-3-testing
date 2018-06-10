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
        this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    }

    update()
    {
        if(this.xKey.isDown){
            this.scene.start('GameScene');
        }
    }
}

export default TitleScene;