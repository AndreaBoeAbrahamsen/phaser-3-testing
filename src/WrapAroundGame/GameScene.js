import Boy from './sprites/boy';

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      });
    }

    create()
    {
        this.add.tileSprite(200, 150, 400, 300,'background');

        /*
        "columns":3,
        "firstgid":1,
        "image":"img\/springTiles.png",
        "imageheight":64,
        "imagewidth":48,
        "margin":0,
        "name":"springTiles",
        "spacing":0,
        "tilecount":12,
        "tileheight":16,
        "tilewidth":16
        */
        this.map = this.make.tilemap({ key: 'map' });
        this.tiles = this.map.addTilesetImage('springTiles', 'springTiles');
        this.layer = this.map.createStaticLayer('Rutelag 1', this.tiles, 0, 0);

        this.map.setCollisionByExclusion([1, 2, 3, 11]);

        this.player = new Boy({
            scene: this,
            key: 'boy',
            x: 50, 
            y: 50,
            input: this.input.keyboard.createCursorKeys()
        });
    }

    update(time, delta)
    {
        this.player.update();
    }
}

export default GameScene;
