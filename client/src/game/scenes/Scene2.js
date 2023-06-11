import Phaser from "phaser";
import Back from "../game-assets/background.png";
import Pony from "../game-assets/pixel-pony.png";
// import Ball from '../game-assets/ball.png';
import Jinx from '../game-assets/jinx1.png';
import Bat from '../game-assets/bat.png';
import Minotaur from '../game-assets/Minotaur2Spritesheet.png';

class Scene2 extends Phaser.Scene {
  constructor() {
    super("play game");
  }

  preload() {

    //! potential work around if Karl can't fix image sizes
    this.load.image('jinx', Jinx)
    // this.load.image('ball',Ball)

    // let dataURI = localStorage.getItem(Pony)

    // let data = new Image();

    // data.src = dataURI

    // this.textures.addBase64(Pony, dataURI, data)


    // this.load.spritesheet("bat", Bat, {
    //   frameWidth: 36,
    //   frameHeight: 36,
    // });

    this.load.spritesheet("minotaur", Minotaur, {
      frameWidth: 96,
      frameHeight: 80,
    });

    this.load.image("background", Back);
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.player = this.physics.add.sprite( 500, 500, "jinx");
    this.player.setScale(.1);

    // this.ball = this.add.image(0,0, "ball");
    // this.ball.setScale(.2);
    // this.ball.setOrigin(0,0);

    // this.minotaur = this.add.sprite(100, 100, "minotaur");
    // this.minotaur.setOrigin(0.5, 0.5);



    this.anims.create({
      key: "minotaurAnimation",
      frames: [
        { key: "minotaur", frame: 0 },
        { key: "minotaur", frame: 1 },
        { key: "minotaur", frame: 2 },
        { key: "minotaur", frame: 3 },
        { key: "minotaur", frame: 4 }
      ],
      frameRate: 8,
      repeat: -1,
    });

    const numMinotaurs = 3;
      
      for (let i = 0; i < numMinotaurs; i++) {
        const randomX = Phaser.Math.Between(0, this.game.config.width);
        const randomY = Phaser.Math.Between(0, this.game.config.height);
        const randomXVelocity = Phaser.Math.Between(-30,30);
        const randomYVelocity = Phaser.Math.Between(-30,30);

        const minotaur = this.add.sprite(randomX, randomY, 'minotaur');
        this.physics.add.existing(minotaur);

        minotaur.body.velocity.setTo(randomXVelocity, randomYVelocity);
        minotaur.body.bounce.set(1);
        minotaur.body.collideWorldBounds = true;

        minotaur.setOrigin(0.5, 0.5);
        minotaur.play('minotaurAnimation');
      }

  
    const batImg = new Image();
    batImg.onload = () => {
        const texture = this.textures.addSpriteSheet('batSheet', batImg, {
          frameWidth: 32,
          frameHeight: 32,
        });
        // const bat = this.add.sprite(0, 0, 'batSheet');
        // bat.setOrigin(0, 0);
        this.anims.create({
          key: 'batAnimation',
          frames: this.anims.generateFrameNumbers('batSheet', { start: 0, end: 4 }),
          frameRate: 8,
          repeat: -1,
        });
        
      const numBats = 7;
      
      for (let i = 0; i < numBats; i++) {
        const randomX = Phaser.Math.Between(0, this.game.config.width);
        const randomY = Phaser.Math.Between(0, this.game.config.height);
        const randomXVelocity = Phaser.Math.Between(-30,30);
        const randomYVelocity = Phaser.Math.Between(-30,30);

        const bat = this.add.sprite(randomX, randomY, 'batSheet');
        this.physics.add.existing(bat);

        bat.body.velocity.setTo(randomXVelocity, randomYVelocity);
        bat.body.bounce.set(1);
        bat.body.collideWorldBounds = true;

        bat.setOrigin(0, 0);
        bat.play('batAnimation');
      }
    };
    batImg.src = Bat;
  
  
  
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

// console.log(Ball)

export default Scene2;
