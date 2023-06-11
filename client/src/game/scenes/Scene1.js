import Phaser from "phaser";
import Back from "../game-assets/Taskmap1.png";
import Jinx from '../game-assets/jinx1.png';
import Minotaur from '../game-assets/MinotaurSpritesheet.png';
import Warrior1Front from '../game-assets/Warrior1FrontSpritesheet.png';
import Warrior1Back from '../game-assets/Warrior1BackSpritesheet.png';
import Warrior1Left from '../game-assets/Warrior1LeftSpritesheet.png';
import Warrior1Right from '../game-assets/Warrior1RightSpritesheet.png';

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

    this.load.spritesheet("warrior1front", Warrior1Front, {
      frameWidth: 141,
      frameHeight: 90,
    });

    this.load.spritesheet("warrior1back", Warrior1Back, {
      frameWidth: 141,
      frameHeight: 90,
    });

    this.load.spritesheet("warrior1left", Warrior1Left, {
      frameWidth: 141,
      frameHeight: 90,
    });

    this.load.spritesheet("warrior1right", Warrior1Right, {
      frameWidth: 141,
      frameHeight: 90,
    });

    this.load.image("background", Back);

  }

  create() {
    this.scale.displaySize.setAspectRatio(1632/1632);
    this.scale.refresh();
    this.scene.start("play game");
  }

  update() {}
}

export default Scene1;
