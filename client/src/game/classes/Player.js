import GameObject from './GameObject'
import Phaser from 'phaser'

class Player extends GameObject{
    
    constructor(x,y,spriteSheet, frames, weapon, helm, armor,shield){
        super(x,y,spriteSheet,frames)


    //     this.player = this.physics.add.sprite( 840, 780, "warrior0front");
    // this.player.setScale(.5);


        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE
          })
    }

    preload(){
        this.player = this.physics.add.sprite( this.x, this.y, this.spriteSheet);

        this.player.setScale(.3);
    }

    update(){
        const { left, right, up, down, input } = this.cursors;

        let isMoving = false;
    
        if (left.isDown || this.inputKeys.left.isDown) {
          this.player.setVelocityX(-100);
          this.player.anims.play("warrior0LeftAnimation", true);
          isMoving = true;
        } else if (right.isDown || this.inputKeys.right.isDown) {
          this.player.setVelocityX(100);
          this.player.anims.play("warrior0RightAnimation", true);
          isMoving = true;
        } else {
          this.player.setVelocityX(0);
        }
    
        if (up.isDown || this.inputKeys.up.isDown) {
          this.player.setVelocityY(-100);
          this.player.anims.play("warrior0BackAnimation", true);
          isMoving = true;
        } else if (down.isDown || this.inputKeys.down.isDown) {
          this.player.setVelocityY(100);
          this.player.anims.play("warrior0FrontAnimation", true);
          isMoving = true;
        } else {
          this.player.setVelocityY(0);
        }
    
        // Adjust camera bounds when character reaches near the edge
        let cameraBounds = this.cameras.main.getBounds();
        let buffer = 0;
    
        if (this.player.x < cameraBounds.x + buffer) {
          this.cameras.main.setBounds(this.player.x - buffer, cameraBounds.y, cameraBounds.width, cameraBounds.height);
        } else if (this.player.x > cameraBounds.x + cameraBounds.width - buffer) {
          this.cameras.main.setBounds(this.player.x + buffer - cameraBounds.width, cameraBounds.y, cameraBounds.width, cameraBounds.height);
        }
    
        if (this.player.y < cameraBounds.y + buffer) {
          this.cameras.main.setBounds(cameraBounds.x, this.player.y - buffer, cameraBounds.width, cameraBounds.height);
        } else if (this.player.y > cameraBounds.y + cameraBounds.height - buffer) {
          this.cameras.main.setBounds(cameraBounds.x, this.player.y + buffer - cameraBounds.height, cameraBounds.width, cameraBounds.height);
        }
    
        //!normalize
    
        if (!isMoving) {
          this.player.anims.stop();
        } else {
          this.player.anims.resume();
        }
    
    }
}

export default Player