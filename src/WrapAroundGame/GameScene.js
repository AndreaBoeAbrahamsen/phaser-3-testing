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
        this.map = this.make.tilemap({ key: 'seasonMap' });
        this.tiles = this.map.addTilesetImage('seasonTiles', 'seasonTiles');
        this.layer = this.map.createStaticLayer('ground', this.tiles, 0, 0);

        this.map.setCollisionByExclusion([1, 2, 3, 38]);

        var playerObject = this.map.getObjectLayer("people").objects.find(
            (object) => { return object.gid == 73; });

        this.player = new Boy({
            scene: this,
            key: 'boy',
            x: playerObject.x + playerObject.width / 2,
            y: playerObject.y,
            input: this.input.keyboard.createCursorKeys()
        });

        this.coins = this.add.group();

        this.map.getObjectLayer("coins").objects.forEach(
            (object) => {
              let coin;
              switch (object.gid) {
                case 74:
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

        this.events.on('collectCoin', this.collectCoin, this);

        this.coinValue = 0;
        var config = {
            image: 'retroFont',
            width: 8,
            height: 8,
            chars: "012345acx6789",
            charsPerRow: 9,
            spacing: { x: 0, y: 0 }
        };
        this.cache.bitmapFont.add('retroFont', Phaser.GameObjects.RetroFont.Parse(this, config));
        this.dynamicText = this.add.bitmapText(5, 5, 'retroFont', 'cx' + this.coinValue);
    }

    update(time, delta)
    {
        this.player.update();

        this.coins.children.entries.forEach(
            (sprite) => { sprite.update(time, delta); }
        )
    }

    collectCoin()
    {
        this.coinValue = this.coinValue + 1;
        this.dynamicText.text = 'cx' + this.coinValue;
    }
}

export default GameScene;
