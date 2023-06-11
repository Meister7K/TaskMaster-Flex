import Phaser from "phaser";
import Back from "../game-assets/background.png";
import Jinx from '../game-assets/jinx1.png';
import Minotaur from '../game-assets/Minotaur2Spritesheet.png';

class Scene1 extends Phaser.Scene {
  constructor() {
    super("loadGame");
  }
  preload() {

    this.load.image('jinx', Jinx)

    this.load.spritesheet("minotaur", Minotaur, {
      frameWidth: 96,
      frameHeight: 80,
    });

    this.load.image("background", Back);

  }

  create() {
    this.scene.start("play game");
  }

  update() {}
}

export default Scene1;
