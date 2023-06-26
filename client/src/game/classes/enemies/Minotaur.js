import Enemies from "./Enemies";

class Minotaur extends Enemies {
  constructor(scene, x, y, spriteSheet, frames, health, attack, target) {
    super(scene, x, y, spriteSheet, frames, health, attack, target);

    this.setBody().setSize(70, 100);

    this.setScale(0.5);

    if (!this.scene.anims.exists("MinotaurRightRun")) {
      this.scene.anims.create({
        key: "MinotaurRightRun",
        frames: this.scene.anims.generateFrameNames("minotaur", {
          prefix: "Minotaur_02_Walking_",
          start: 1,
          end: 5,
          zeroPad: 3,
        }),
        repeat: -1,
        frameRate: 16,
      });
    }

    if (!this.scene.anims.exists("MinotaurLeftRun")) {
      const leftFrames = this.scene.anims
        .generateFrameNames("minotaur", {
          prefix: "Minotaur_02_Walking_",
          start: 1,
          end: 5,
          zeroPad: 3,
        })
        .reverse();

      this.scene.anims.create({
        key: "MinotaurLeftRun",
        frames: leftFrames,
        repeat: -1,
        frameRate: 16,
      });
    }

    this.anims.play("MinotaurRightRun", true);
  }

  update() {
    const { velocity } = this.body;

    this.flipX = velocity.x < 0;

    if (velocity.x < 0 && !this.anims.isPlaying) {
      this.anims.play("MinotaurLeftRun", true);
    } else if (velocity.x > 0 && !this.anims.isPlaying) {
      this.anims.play("MinotaurRightRun", true);
    } else if (velocity.x === 0) {
      this.anims.stop();
    }

    this.healthValue.setPosition(this.x, this.y-20);
    this.healthValue.setOrigin(0.5, 1.5);
    this.healthValue.setScale(0.4);
  }
}

export default Minotaur;