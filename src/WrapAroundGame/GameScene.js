import Boy from './sprites/boy';
import Coin from './sprites/coin';
import Door from './sprites/door';
import Key from './sprites/key';

class GameScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'GameScene'
      });
    }

    create()
    {
        this.createBackground();

        this.map = this.make.tilemap({ key: 'seasonMap' });
        this.tiles = this.map.addTilesetImage('seasonTilesExtended', 'seasonTiles');
        this.layer = this.map.createDynamicLayer('ground', this.tiles, 0, 0);

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.map.setCollisionByExclusion([1, 2, 3, 38]);

        this.createDoorAndKey();

        var playerObject = this.map.getObjectLayer("people").objects.find(
            (object) => { return object.gid == 84; });

        this.player = new Boy({
            scene: this,
            key: 'boy',
            x: playerObject.x + playerObject.width / 2,
            y: playerObject.y,
            input: this.input
        });

        //this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, 0, this.layer.width * this.layer.scaleX, this.layer.height * this.layer.scaleY);
        this.cameras.main.startFollow(this.player.sprite); //true
        //this.cameras.main.setRoundPixels(true);

        this.createCoins();
        
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
        this.dynamicText.setScrollFactor(0);
    }

    update(time, delta)
    {
        this.player.update();

        this.coins.children.entries.forEach(
            (sprite) => { sprite.update(time, delta); }
        )

        this.key.update();
    }

    createBackground()
    {
        this.background = this.add.tileSprite(200*0.5, 144*0.5, 160*4, 144,'background');
        //this.add.image(200*0.5, 144*0.5, 'background');
        //this.background.setInteractive({ pixelPerfect: true });
        //this.background.setScrollFactor(0);

        /*this.sky = this.add.tileSprite(160/2, 144/2, 160*4, 144,'sky');
        this.sky.setScrollFactor(0);

        this.forest = this.add.tileSprite(160/2, 144/2, 160*4, 144,'forest');
        this.forest.setScrollFactor(0);*/
    }

    createCoins()
    {
        this.coins = this.add.group();

        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'glitter',
            frames: this.anims.generateFrameNumbers('coin', { start: 4, end: 7 }),
            frameRate: 20,
            repeat: 0
        });

        this.map.getObjectLayer("coins").objects.forEach(
            (object) => {
              let coin;
              switch (object.gid) {
                case 75:
                  coin = new Coin({
                    scene: this,
                    key: 'coin',
                    x: object.x + object.width / 2,
                    y: object.y - object.height / 2
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
    }

    collectCoin()
    {
        this.coinValue = this.coinValue + 1;
        this.dynamicText.text = 'cx' + this.coinValue;
    }

    createDoorAndKey()
    {
        var doorObject = this.map.getObjectLayer("other").objects.find(
            (object) => { return object.gid == 88; });

        this.door = new Door({
            scene: this,
            x: doorObject.x + doorObject.width / 2, 
            y: doorObject.y - doorObject.height / 2, 
            key: 'door'
        });


        var keyObject = this.map.getObjectLayer("other").objects.find(
            (object) => { return object.gid == 76; });

        this.key = new Key({
            scene: this,
            x: keyObject.x + keyObject.width / 2, 
            y: keyObject.y - keyObject.height / 2, 
            key: 'key'
        });
    }
}

export default GameScene;
