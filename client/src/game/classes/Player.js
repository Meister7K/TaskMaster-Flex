import GameObject from "./GameObject";
import Phaser from "phaser";

class Player extends GameObject {
  _maxHealth = 100;


  constructor(scene,x, y, spriteSheet, frames,health, weaponEquipped = 0, helmEquipped = 0, armorEquipped =0, shieldEquipped=0) {
    super(scene,x, y, spriteSheet, frames);

    this.experience = 0;
    this.coins = 0;
    this.defense = helmEquipped + armorEquipped + shieldEquipped; 
    this.attack = 5 + weaponEquipped;
    this.health = health;

    this.inputKeys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      up1: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      down1: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      left1: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      right1: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
      interact: Phaser.Input.Keyboard.KeyCodes.SPACE,
      interact1: Phaser.Input.Keyboard.KeyCodes.F,
    });
    
    //     this.player = this.physics.add.sprite( 840, 780, "warrior0front");
    // this.player.setScale(.5);
    this.setBody().setCircle(8,0,0);
  // this.physics.add.sprite(this.x, this.y, this.spriteSheet);
  }

  gainExperience(exp){
    this.experience += exp;
  }

  getCoins(num){
    this.coins += num;
  }

  gainHealth(heal){
    if(this.health + heal > this._maxHealth){
      this.health = this._maxHealth;
    } else{
      this.health += heal;
    }
  }

  loseHealth(damage){
    this.health -= (damage - this.defense)
  }

  doDamage(){
    return this.attack;
  }

  traverseMap(){
    //if (playerposition = specific map position){
      //call next scene function
    //}
  }
  interact(){
    return'';
  }


  update() {
    this.setBody().setVelocity(0);
  

    
    // const { left, right, up, down, input } = this.cursors;

    //let isMoving = false;

    if ( this.inputKeys.left.isDown || this.inputKeys.left1.isDown) {
      this.body.velocity.x = -100;
      this.flipSprite();
      this.body.setOffset(16,0);
      //!this.anims.isPlaying && this.anims.play('walk', true);
    }

    if ( this.inputKeys.right.isDown || this.inputKeys.right1.isDown) {
     
      this.body.velocity.x = 100;
      this.flipSprite();
      this.body.setOffset(16,0);
    }

   

    if((this.inputKeys.right.isDown ||this.inputKeys.right1.isDown)&& (this.inputKeys.left.isDown || this.inputKeys.left1.isDown)){
      this.body.velocity.x = 0;

    }

    if ( this.inputKeys.up.isDown || this.inputKeys.up1.isDown) {
      this.body.velocity.y = -100;}

    if(this.inputKeys.down.isDown || this.inputKeys.down1.isDown){
      this.body.velocity.y = 100;
    }

     if((this.inputKeys.up.isDown || this.inputKeys.up1.isDown) && (this.inputKeys.down.isDown || this.inputKeys.down1.isDown)){
      this.body.velocity.y = 0;
    }
    //   this.anims.play("warrior0BackAnimation", true);
    //   isMoving = true;
    // } else if ( this.inputKeys.down.isDown) {
    //   this.setVelocityY(100);
    //   this.player.anims.play("warrior0FrontAnimation", true);
    //   isMoving = true;
    // } else {
    //   this.player.setVelocityY(0);
    // }

    // //TODO add attack animation & interaction
    if (this.inputKeys.attack.isDown) {
      // this.player.anims.play("warrior1AttackAnimation", true);
      this.doDamage();
    }

    if(this.inputKeys.interact.isDown ){
      this.interact();
    }

    // // Adjust camera bounds when character reaches near the edge
    // let cameraBounds = this.cameras.main.getBounds();
    // let buffer = 0;

    // if (this.player.x < cameraBounds.x + buffer) {
    //   this.cameras.main.setBounds(
    //     this.player.x - buffer,
    //     cameraBounds.y,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // } else if (this.player.x > cameraBounds.x + cameraBounds.width - buffer) {
    //   this.cameras.main.setBounds(
    //     this.player.x + buffer - cameraBounds.width,
    //     cameraBounds.y,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // }

    // if (this.player.y < cameraBounds.y + buffer) {
    //   this.cameras.main.setBounds(
    //     cameraBounds.x,
    //     this.player.y - buffer,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // } else if (this.player.y > cameraBounds.y + cameraBounds.height - buffer) {
    //   this.cameras.main.setBounds(
    //     cameraBounds.x,
    //     this.player.y + buffer - cameraBounds.height,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // }

    //!normalize

    // if (!isMoving) {
    //   this.anims.stop();
    // } else {
    //   this.anims.resume();
    // }
  }
}

export default Player;
