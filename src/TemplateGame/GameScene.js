//import Sprite from './sprites/sprite';

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      });
    }

    create()
    {
        /*this.map = this.make.tilemap({ key: 'seasonMap' });
        this.tiles = this.map.addTilesetImage('seasonTilesExtended', 'seasonTiles');
        this.layer = this.map.createDynamicLayer('ground', this.tiles, 0, 0);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.map.setCollisionByExclusion([1, 2, 3, 38]);

        var playerObject = this.map.getObjectLayer("people").objects.find(
            (object) => { return object.gid == 84; });

        this.player = new Sprite({
            scene: this,
            key: 'boy',
            x: playerObject.x + playerObject.width / 2,
            y: playerObject.y,
            input: this.input.keyboard.createCursorKeys()
        });*/
    }

    update(time, delta)
    {
        //this.player.update();
    }
}

export default GameScene;
