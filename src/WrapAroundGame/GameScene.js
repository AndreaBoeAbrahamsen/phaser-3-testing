import Boy from './sprites/boy';
import Coin from './sprites/coin';

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

        this.coins = this.add.group();
        this.player = null;

        this.map.getObjectLayer("Objektlag 1").objects.forEach(
            (object) => {
              let coin;
              switch (object.gid) {
                case 15:
                  this.player = new Boy({
                    scene: this,
                    key: 'boy',
                    x: object.x + object.width / 2,
                    y: object.y,
                    input: this.input.keyboard.createCursorKeys()
                  });
                break;
                case 16:
                  coin = new Coin({
                    scene: this,
                    key: 'coin',
                    x: object.x + object.width / 2,
                    y: object.y 
                  });
                  break;
                default:
                  //console.error("Unknown:", this.tileset.tileProperties[object.gid - 1]);
                  break;
              }
              if(coin)
                this.coins.add(coin);
            }
        );
    }

    update(time, delta)
    {
        this.player.update();
    }
}

export default GameScene;
