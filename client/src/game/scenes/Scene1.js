import Phaser from 'phaser';
import back from '../game-assets/background.png'



class Scene1 extends Phaser.Scene {
  constructor() {
    super("loadGame");
  }
  preload() {
    this.load.image('background', back)
  }

  create() {
    this.add.text(20,20,'Loading game...');
    this.scene.start('play game')
  }

  update() {}
}

export default Scene1