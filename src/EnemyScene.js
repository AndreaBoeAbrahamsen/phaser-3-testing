import Droid from './sprites/droid';

class EnemyScene extends Phaser.Scene {
    constructor() {
      super({
        key: 'EnemyScene'
      });
    }

    create()
    {
        this.add.tileSprite(400, 300, 800, 600,'background');

        this.map = this.make.tilemap({ key: 'enemyMap2' });
        this.tiles = this.map.addTilesetImage('space16', 'ground');
        this.layer = this.map.createStaticLayer('Rutelag 1', this.tiles, 0, 0);
        this.map.setCollision([ 
            1, 2, 3, 4, 5, 6, 7, 18, 19, 20, 21, 
            22, 23, 24, 35, 36, 37, 38, 39, 40, 41, 
            52, 53, 54, 55, 56, 57, 58, 64, 65 ]);
        //this.showDebugging();

        /*
, 
                {
                 "gid":69,
                 "height":32,
                 "id":3,
                 "name":"",
                 "rotation":0,
                 "type":"",
                 "visible":true,
                 "width":31,
                 "x":224,
                 "y":144
                }
        */
        this.enemyGroup = this.add.group();
        this.map.getObjectLayer("Droids").objects.forEach(
            (enemy) => {
              let enemyObject;
              switch (enemy.gid) {
                case 69:
                  enemyObject = new Droid({
                    scene: this,
                    key: 'droid',
                    x: enemy.x - enemy.width / 2,
                    y: enemy.y - enemy.height / 2
                  });
                  break;
                default:
                  console.error("Unknown:", this.tileset.tileProperties[enemy.gid - 1]);
                  break;
              }
              this.enemyGroup.add(enemyObject);
            }
        );
     
    }

    update(time, delta)
    {
        this.enemyGroup.children.entries.forEach(
            (sprite) => { sprite.update(time, delta); }
          )
    }

    showDebugging ()
    {
        var debugGraphics = this.add.graphics();
        this.map.renderDebug(debugGraphics, {
            tileColor: null, // Non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 200), // Colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Colliding face edges
        }); 
    }
}

export default EnemyScene;
