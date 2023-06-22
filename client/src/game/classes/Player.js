import GameObject from "./GameObject";
import Phaser from "phaser";
import Text from "./hud/Text";

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

    this.scene.physics.world.enable(this);
    this.body.setCircle(16, 36, 36);

    this.setOrigin(0.5, 0.5);
    this.setPosition(x + this.width / 2, y + this.height / 2);
    this.setScale(0.5);
    this.direction = "Front";
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
  update() {
    const { velocity } = this.body;

    let isMoving = false;

    if (this.inputKeys.up.isDown || this.inputKeys.up1.isDown) {
      this.body.velocity.y = -100;
      this.direction = "Back";
      !this.anims.isPlaying && this.anims.play("BackRun", true);
      isMoving = true;
    }

    if (this.inputKeys.down.isDown || this.inputKeys.down1.isDown) {
      this.body.velocity.y = 100;
      this.direction = "Front";
      !this.anims.isPlaying && this.anims.play("FrontRun", true);
      isMoving = true;
    }

    if (this.inputKeys.left.isDown || this.inputKeys.left1.isDown) {
      this.body.velocity.x = -100;
      this.direction = "Left";
      !this.anims.isPlaying && this.anims.play("LeftRun", true);
      isMoving = true;
    }

    if (this.inputKeys.right.isDown || this.inputKeys.right1.isDown) {
      this.body.velocity.x = 100;
      this.direction = "Right";
      !this.anims.isPlaying && this.anims.play("RightRun", true);
      isMoving = true;
    }

    if (this.inputKeys.attack.isDown && !this.isAttacking) {
      this.doDamage();
      this.scene.game.events.emit("attack");
    }

    this.setBody().setVelocity(0);

    this.healthValue.setPosition(this.x, this.y - this.height * 0.04);
    this.healthValue.setOrigin(0.5, 1.5);
    this.healthValue.setScale(0.5);

    if (this.inputKeys.attack.isDown) {
      this.doDamage();
      this.scene.game.events.emit("attack");
    }

    if (this.inputKeys.interact.isDown) {
      this.interact();
    }

    if (this.inputKeys.left.isDown || this.inputKeys.left1.isDown) {
      this.body.velocity.x = -100;
      !this.anims.isPlaying && this.anims.play("LeftRun", true);
    }

    if (this.inputKeys.right.isDown || this.inputKeys.right1.isDown) {
      this.body.velocity.x = 100;
      !this.anims.isPlaying && this.anims.play("RightRun", true);
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
      (this.inputKeys.right.isDown || this.inputKeys.right1.isDown) &&
      (this.inputKeys.left.isDown || this.inputKeys.left1.isDown)
    ) {
      this.body.velocity.x = 0;
    }

    if (
      (this.inputKeys.up.isDown || this.inputKeys.up1.isDown) &&
      (this.inputKeys.down.isDown || this.inputKeys.down1.isDown)
    ) {
      this.body.velocity.y = 0;
    }
  }

  doDamage() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      let attackAnim;

      switch (this.direction) {
        case "Back":
          attackAnim = this.anims.play("Attack_1", true);
          break;
        case "Front":
          attackAnim = this.anims.play("FrontAttack_1", true);
          break;
        case "Left":
          attackAnim = this.anims.play("LeftAttack_1", true);
          break;
        case "Right":
          attackAnim = this.anims.play("RightAttack_1", true);
          break;
      }
      attackAnim.on("animationcomplete", () => {
        this.isAttacking = false;
      });
    }
    return this.attack;
  }

  // gainExperience(exp) {
  //   this.experience += exp;
  // }

  // getCoins(num) {
  //   this.coins += num;
  // }

  // gainHealth(heal) {
  //   if (this.health + heal > this._maxHealth) {
  //     this.health = this._maxHealth;
  //   } else {
  //     this.health += heal;
  //   }
  // }

  // loseHealth(damage) {
  //   if (this.hittable === true) {
  //     this.health -= damage - this.defense;
  //     this.hittable = false;
  //     this.setAlpha(0.5);
  //     if (this.health <= 0) {
  //       this.setAlpha(0.5);
  //     } else {
  //       this.scene.time.delayedCall(1000, () => {
  //         this.hittable = true;
  //         this.setAlpha(1);
  //       });
  //     }
  //   }
  //   this.healthValue.setText(this.health.toString());
  // }

  // traverseMap() {}

  interact() {
    return "";
  }
}

export default Player;
