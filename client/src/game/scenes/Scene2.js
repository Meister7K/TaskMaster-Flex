import Phaser from "phaser";
import Bat from '../game-assets/bat.png';

class Scene2 extends Phaser.Scene {
  constructor() {
    super("play game");
    this.minotaurs = [];
  }

  preload() {

    //! potential work around if Karl can't fix image sizes
    
    // let dataURI = localStorage.getItem(Pony)
    
    // let data = new Image();
    
    // data.src = dataURI
    
    // this.textures.addBase64(Pony, dataURI, data)
  }

  create() {
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    this.player = this.physics.add.sprite( 500, 500, "jinx");
    this.player.setScale(.1);

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

        this.minotaurs.push(minotaur);
      }

  
    const batImg = new Image();
    batImg.onload = () => {
        const texture = this.textures.addSpriteSheet('batSheet', batImg, {
          frameWidth: 32,
          frameHeight: 32,
        });

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

    this.minotaurs.forEach((minotaur) => {
      if (minotaur.body.velocity.x < 0) {
        minotaur.setFlipX(true);
      } else {
        minotaur.setFlipX(false);
      }
    });
  }
}

export default Scene2;
