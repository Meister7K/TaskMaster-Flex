import Phaser from "phaser";
import Back from "../game-assets/background.png";
import Pony from "../game-assets/pixel-pony.png";
import Bat from "../game-assets/bat.png";


class Scene1 extends Phaser.Scene {
  constructor() {
    super("loadGame");
  }
  preload() {
    // this.load.image("pony", Pony);

    // this.load.spritesheet("bat", Bat, {
    //   frameWidth: 36,
    //   frameHeight: 36,
    // });

    this.load.image("background", Back);
  }

  create() {
    this.scene.start("play game");
  }

  update() {}
}

export default Scene1;
