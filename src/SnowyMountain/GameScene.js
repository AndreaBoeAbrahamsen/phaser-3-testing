import Person from './sprites/tiny-person';

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      });
    }

    create()
    {
      this.map = this.make.tilemap({ key: "map" });

      this.tileset = this.map.addTilesetImage("snowey-town-trans-extruded", "tiles");
      
      this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, 0, 0);
      this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
      this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, 0, 0);
      
      this.worldLayer.setCollisionByProperty({ collide: true });
      
      this.aboveLayer.setDepth(10);

      this.spawnPoint = this.map.findObject("Objects", obj => obj.name === "Spawn Point");

      this.player = new Person(this, this.spawnPoint.x, this.spawnPoint.y)


      this.physics.add.collider(this.player.sprite, this.worldLayer);

      this.camera = this.cameras.main;
      this.camera.startFollow(this.player.sprite);
      this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

      /*this.add
      .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
        font: "11px monospace",
        fill: "#000000",
        padding: { x: 5, y: 5 },
        backgroundColor: "#ffffff"
      })
      .setScrollFactor(0)
      .setDepth(30);*/
  
      this.input.keyboard.once("keydown_D", event => {
        this.physics.world.createDebugGraphic();
    
        const graphics = this.add
          .graphics()
          .setAlpha(0.75)
          .setDepth(20);
        this.worldLayer.renderDebug(graphics, {
          tileColor: null, 
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), 
          faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
        });
      });
    }

    update(time, delta)
    {
      this.player.update();
    }
}

export default GameScene;
