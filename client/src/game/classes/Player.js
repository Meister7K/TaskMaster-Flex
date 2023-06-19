import GameObject from "./GameObject";
import Phaser from "phaser";
import Text from "./hud/Text";
//import CONST from "./Const";

class Player extends GameObject {
  _maxHealth = 100;

  constructor(
    scene,
    x,
    y,
    spriteSheet,
    frames,
    health = 100,
    weaponEquipped = 0,
    helmEquipped = 0,
    armorEquipped = 0,
    shieldEquipped = 0
    
  ) {
    super(scene, x, y, spriteSheet, frames);

    this.height = 32;
    this.experience = 0;
    this.coins = 0;
    this.defense = helmEquipped + armorEquipped + shieldEquipped;
    this.attack = 5 + weaponEquipped;
    this.health = health;
    this.healthValue = new Text(
      this.scene,
      this.x,
      this.y - this.height,
      this.health.toString()
    );
    this.hittable = true;
    this.isAttacking = false;

    this.setAnims();

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

    //this.scene.game.events.emit();

    //     this.player = this.physics.add.sprite( 840, 780, "warrior0front");
    this.scene.physics.world.enable(this);
    this.body.setCircle(16, 36, 36);

    this.setOrigin(0.5, 0.5);
    this.setPosition(x + this.width / 2, y + this.height / 2);
    this.setScale(0.5);
    // this.physics.add.sprite(this.x, this.y, this.spriteSheet);
  }

  setAnims() {
    this.scene.anims.create({
      key: "LeftRun",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_LeftRun_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),
      repeat: -1,
      frameRate: 28,
    });
    this.scene.anims.create({
      key: "RightRun",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_RightRun_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),
      repeat: -1,
      frameRate: 28,
    });
    this.scene.anims.create({
      key: "BackRun",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_BackRun_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),
      repeat: -1,
      frameRate: 28,
    });
    this.scene.anims.create({
      key: "FrontRun",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_FrontRun_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),
      repeat: -1,
      frameRate: 28,
    });
    this.scene.anims.create({
      key: "Attack_1",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_Attack_1_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),

      frameRate: 28,
    });
    this.scene.anims.create({
      key: "RightAttack_1",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_RightAttack_1_",

        end: 14,
        zeroPad: 3,
      }),

      frameRate: 28,
    });
    this.scene.anims.create({
      key: "FrontAttack_1",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_FrontAttack_1_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),

      frameRate: 28,
    });
    this.scene.anims.create({
      key: "LeftAttack_1",
      frames: this.scene.anims.generateFrameNames("a-warrior1", {
        prefix: "0_Warrior_LeftAttack_1_",
        start: 1,
        end: 14,
        zeroPad: 3,
      }),

      frameRate: 28,
    });
  }

  gainExperience(exp) {
    this.experience += exp;
  }

  getCoins(num) {
    this.coins += num;
  }

  gainHealth(heal) {
    if (this.health + heal > this._maxHealth) {
      this.health = this._maxHealth;
    } else {
      this.health += heal;
    }
  }

  loseHealth(damage) {
    if (this.hittable === true) {
      this.health -= damage - this.defense;
      this.hittable = false;
      this.setAlpha(0.5);
      if (this.health <= 0) {
        //this.disableBody(true,false);
        // this.scene.time.delayedCall(300, ()=>{
        //   this.destroy()}) //!review
        this.setAlpha(0.5);
      }else{this.scene.time.delayedCall(1000, () => {
        this.hittable = true;
        this.setAlpha(1);
      });}
      
    }
    this.healthValue.setText(this.health.toString());

    //insert damAGE animation
    
  }

  doDamage() {
    //const {isFacing}  =  this.body.velocity;
    if(!this.isAttacking && this.body.y < 0){
      this.anims.play("Attack_1");
      this.isAttacking = true;
      this.scene.time.delayedCall(500, ()=>{
        this.isAttacking = false;
      },this);
    }
    if(!this.isAttacking && this.body.y > 0){
      this.anims.play("FrontAttack_1");
      this.isAttacking = true;
     this.scene.time.delayedCall(500, ()=>{
        this.isAttacking = false;
      },this);
    }
    if(!this.isAttacking && this.body.x > 0){
      this.anims.play("RightAttack_1");
      this.isAttacking = true;
      this.scene.time.delayedCall(500, ()=>{
        this.isAttacking = false;
      },this);
    }
    if(!this.isAttacking && this.body.x < 0){
      this.anims.play("LeftAttack_1");
      this.isAttacking = true;
      this.scene.time.delayedCall(500, ()=>{
        this.isAttacking = false;
      },this);
    }
    return this.attack;
  }

  traverseMap() {
    //if (playerposition = specific map position){
    //call next scene function
    //}
  }
  interact() {
    return "";
  }

  update() {
    const { velocity } = this.body;

    if (velocity.y < 0) {
      this.anims.play("BackRun", true);
    } else if (velocity.y > 0) {
      this.anims.play("FrontRun", true);
    } else if (velocity.x < 0) {
      this.anims.play("LeftRun", true);
    } else if (velocity.x > 0) {
      this.anims.play("RightRun", true);
    } else {
      this.anims.stop();
    }

    this.setBody().setVelocity(0);

    this.healthValue.setPosition(this.x, this.y - this.height * 0.04);
    this.healthValue.setOrigin(0.5, 1.5);
    this.healthValue.setScale(0.5);

    // if (this.inputKeys.attack.isDown && (this.inputKeys.left.isDown || this.inputKeys.left1.isDown)) {
    //    this.anims.play("LeftAttack_1", true);
    //   this.doDamage();
    // }
    // if (this.inputKeys.attack.isDown && (this.inputKeys.right.isDown || this.inputKeys.right1.isDown)) {
    //   this.anims.play("RightAttack_1", true);
    //   this.doDamage();
    // }
    // if (this.inputKeys.attack.isDown && (this.inputKeys.up.isDown || this.inputKeys.up1.isDown)) {
    //   this.anims.play("Attack_1", true);
    //   this.doDamage();
    // }
    // if (this.inputKeys.attack.isDown && (this.inputKeys.down.isDown || this.inputKeys.down1.isDown)) {
    //   this.anims.play("FrontAttack_1", true);
    //   this.doDamage();
    //   this.scene.game.events.emit('attack');
    // }
  
    if(this.inputKeys.attack.isDown){
     
      this.doDamage();
      this.scene.game.events.emit('attack');
    }
    

    if (this.inputKeys.interact.isDown) {
      this.interact();
    }

    if (this.inputKeys.left.isDown || this.inputKeys.left1.isDown) {
      this.body.velocity.x = -100;
      !this.anims.isPlaying && this.anims.play("LeftRun", true);
      // this.body.setOffset(20,0);
    }

    if (this.inputKeys.right.isDown || this.inputKeys.right1.isDown) {
      this.body.velocity.x = 100;
      !this.anims.isPlaying && this.anims.play("RightRun", true);
      // this.body.setOffset(0,0);
    }

    if (
      (this.inputKeys.right.isDown || this.inputKeys.right1.isDown) &&
      (this.inputKeys.left.isDown || this.inputKeys.left1.isDown)
    ) {
      this.body.velocity.x = 0;
    }

    if (this.inputKeys.up.isDown || this.inputKeys.up1.isDown) {
      this.body.velocity.y = -100;
      !this.anims.isPlaying && this.anims.play("BackRun", true);
    }

    if (this.inputKeys.down.isDown || this.inputKeys.down1.isDown) {
      this.body.velocity.y = 100;
      !this.anims.isPlaying && this.anims.play("FrontRun", true);
    }

    if (
      (this.inputKeys.up.isDown || this.inputKeys.up1.isDown) &&
      (this.inputKeys.down.isDown || this.inputKeys.down1.isDown)
    ) {
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
    // if (this.inputKeys.attack.isDown) {
    //   // this.player.anims.play("warrior1AttackAnimation", true);
    //   this.doDamage();
    // }

    // if (this.inputKeys.interact.isDown) {
    //   this.interact();
    // }

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
