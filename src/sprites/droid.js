export default class Droid extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
        this.body.setBounce(0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setGravityY(300);

        this.body.setSize(32, 32);
        //this.body.offset.set(2, 7);  
      
        this.createAnimations();

        this.isAJumper = true;
        this.collideMethod = this.isAJumper ? this.onTileOverlapJump : this.onTileOverlapTurn;

        this.cursors = config.input;
        this.scene.physics.add.collider(this, config.scene.layer, this.onTileOverlapbyIndex); //, this.onTileOverlapTurn
        //this.scene.physics.add.overlap(this, config.scene.layer, this.onTileOverlapbyIndex, this.processOverlap);
        //config.scene.layer.setTileIndexCallback([1,7,8,9], this.onTileOverlapbyIndex, config.scene);

        this.anims.play('droidLeft', true);

        this.shouldTurn = false;
        this.shouldJump = false;
        this.direction = -1;
        this.speed = 50;

        this.body.setVelocityX(this.speed * this.direction);
        this.body.debugShowBody = true;
    }

    update(keys, time, delta) {
        if (this.body.velocity.x < 0) {
            this.flipX = false;
        } else if (this.body.velocity.x > 0) {
            this.flipX = true;
        }

        if (this.body.blocked.left && this.body.blocked.down) this.direction = 1;
        else if (this.body.blocked.right && this.body.blocked.down) this.direction = -1;

        if (this.shouldTurn){
            this.direction *= -1;
            this.shouldTurn = false;
        } 

        if (this.shouldJump){
            this.body.setVelocityY(-200);
            this.shouldJump = false;
        } 

        this.body.setVelocityX( this.speed *  this.direction);
    }

    onTileOverlapTurn(robot, tile) {
        if (robot.body.velocity.x > 0) {
            var isGround = tile.tilemapLayer.hasTileAtWorldXY(
                robot.x + robot.width/2 + tile.width/2,
                robot.y + robot.height/2 + tile.width/2
            );
            if(!isGround){
                robot.shouldTurn = true;
            }
        } 
        else if (robot.body.velocity.x < 0) {
            var isGround = tile.tilemapLayer.hasTileAtWorldXY(
                robot.x - robot.width/2 - tile.width/2,
                robot.y + robot.height/2 + tile.width/2
            );
            if(!isGround){
                robot.shouldTurn = true;
            }
        }
      }

      onTileOverlapJump(robot, tile) {
        if(robot.body.onFloor() && !(robot.body.blocked.left || robot.body.blocked.right)){
            if (robot.flipX) {
                var isGround = tile.tilemapLayer.hasTileAtWorldXY(
                    robot.x + robot.width/2 + tile.width/2,
                    robot.y + robot.height/2 + tile.width/2
                );
                if(!isGround){
                    robot.shouldJump = true;
                } 
            } 
            else if (!robot.flipX) {
                var isGround = tile.tilemapLayer.hasTileAtWorldXY(
                    robot.x - robot.width/2 - tile.width/2,
                    robot.y + robot.height/2 + tile.width/2
                );
                if(!isGround){
                    robot.shouldJump = true;
                } 
            }
        }
      }

      processOverlap(robot, tile) {
        if (!tile) return false;
        var index = tile.index;
        if (index === -1) return false;
        if (index == 7 || index == 9 || index == 1 || index == 8) {
            return true;
        }
      }

      onTileOverlapbyIndex(robot, tile) {
        if (!tile) return;

        /*
        if ((index == 7 || index == 9) && robot.body.velocity.x > 0) {
            if(robot.x > tile.pixelX){
                robot.shouldJump = true;
            }
        } 
        */

        var index = tile.index;
        if (robot.body.velocity.x > 0) {
            var bTile = tile.tilemapLayer.getTileAt(tile.x + 1, tile.y);
            if (!bTile) return;
            var bIndex = bTile.index;
            if(bIndex == 7 || bIndex == 9){
                robot.shouldTurn = true;
            }
        } 
        else if ((index == 1 || index == 8) && robot.body.velocity.x < 0) {
            if(robot.x < (tile.pixelX + tile.width)){
                robot.shouldTurn = true;
            }
        }
      }


    createAnimations() {
        this.scene.anims.create({
            key: 'droidLeft',
            frames: this.scene.anims.generateFrameNumbers('droid', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.scene.anims.create({
            key: 'droidRight',
            frames: this.scene.anims.generateFrameNumbers('droid', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
    }
}