import Phaser from "phaser";
import Back from "../game-assets/background.png";
import Pony from "../game-assets/pixel-pony.png";
import Ball from '../game-assets/ball.png';
import Jinx from '../game-assets/jinx1.png';

class Scene2 extends Phaser.Scene {
  constructor() {
    super("play game");
  }

  preload() {

    //! potential work around if Karl can't fix image sizes
this.load.image('jinx', Jinx)
this.load.image('ball',Ball)

// let dataURI = localStorage.getItem(Pony)

// let data = new Image();

// data.src = dataURI

// this.textures.addBase64(Pony, dataURI, data)


    // this.load.spritesheet("bat", Bat, {
    //   frameWidth: 36,
    //   frameHeight: 36,
    // });

    this.load.image("background", Back);
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.player = this.physics.add.sprite( 500, 500, "jinx");
    this.player.setScale(.1);

    this.ball = this.add.image(0,0, "ball");
    this.ball.setScale(.2);
    this.ball.setOrigin(0,0);
    

    // this.anims.create({
    //   key: "idle",
    //   frames: this.anims.generateFrameNumbers("bat", {
    //     frames: [0, 1, 2, 3, 4],
    //   }),
    //   frameRate: 8,
    //   repeat: -1,
    // });


    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(20, 20, `Playing Game`, {
      font: "25px Arial",
      fill: "white",
    });

 
  }

  update() {
    const { left, right, up, down } = this.cursors;

    if (left.isDown) {
      this.player.setVelocityX(-100);
    } else if (right.isDown) {
      this.player.setVelocityX(100);
    } else {
      this.player.setVelocityX(0);
    }

    if (up.isDown) {
      this.player.setVelocityY(-100);
    } else if (down.isDown) {
      this.player.setVelocityY(100);
    } else {
      this.player.setVelocityY(0);
    }
  }
}

console.log(Ball)

export default Scene2;
