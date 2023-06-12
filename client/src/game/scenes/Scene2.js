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
    this.physics.world.setBounds(0, 0, 1632, 1632);
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);

    // this.player = this.physics.add.sprite( 500, 500, "jinx");
    // this.player.setScale(.1);
    //!Player
    this.player = this.physics.add.sprite( 840, 780, "warrior1front");
    this.player.setScale(1);
    // this.cameras.main.startFollow(this.player);
    // this.cameras.main.setBounds(0, 0, 1632, 1632);
    this.cameras.main.setBounds(0,0,1632,1632);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

    console.log('character');

    this.player.setCollideWorldBounds(true);
  
    this.cursors = this.input.keyboard.createCursorKeys();

    //! add wsad keys if time
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      attack: Phaser.Input.Keyboard.KeyCodes.SPACE
    })

    this.anims.create({
      key: "warrior1FrontAnimation",
      frames: [
        { key: "warrior1front", frame: 0 },
        { key: "warrior1front", frame: 1 },
        { key: "warrior1front", frame: 2 },
        { key: "warrior1front", frame: 3 },
        { key: "warrior1front", frame: 4 },
        { key: "warrior1front", frame: 5 },
        { key: "warrior1front", frame: 6 },
        { key: "warrior1front", frame: 7 },
        { key: "warrior1front", frame: 8 },
        { key: "warrior1front", frame: 9 },
        { key: "warrior1front", frame: 10 },
        { key: "warrior1front", frame: 11 },
        { key: "warrior1front", frame: 12 },
        { key: "warrior1front", frame: 13 }
      ],
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "warrior1BackAnimation",
      frames: [
        { key: "warrior1back", frame: 0 },
        { key: "warrior1back", frame: 1 },
        { key: "warrior1back", frame: 2 },
        { key: "warrior1back", frame: 3 },
        { key: "warrior1back", frame: 4 },
        { key: "warrior1back", frame: 5 },
        { key: "warrior1back", frame: 6 },
        { key: "warrior1back", frame: 7 },
        { key: "warrior1back", frame: 8 },
        { key: "warrior1back", frame: 9 },
        { key: "warrior1back", frame: 10 },
        { key: "warrior1back", frame: 11 },
        { key: "warrior1back", frame: 12 },
        { key: "warrior1back", frame: 13 }
      ],
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "warrior1LeftAnimation",
      frames: [
        { key: "warrior1left", frame: 0 },
        { key: "warrior1left", frame: 1 },
        { key: "warrior1left", frame: 2 },
        { key: "warrior1left", frame: 3 },
        { key: "warrior1left", frame: 4 },
        { key: "warrior1left", frame: 5 },
        { key: "warrior1left", frame: 6 },
        { key: "warrior1left", frame: 7 },
        { key: "warrior1left", frame: 8 },
        { key: "warrior1left", frame: 9 },
        { key: "warrior1left", frame: 10 },
        { key: "warrior1left", frame: 11 },
        { key: "warrior1left", frame: 12 },
        { key: "warrior1left", frame: 13 }
      ],
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: "warrior1RightAnimation",
      frames: [
        { key: "warrior1right", frame: 0 },
        { key: "warrior1right", frame: 1 },
        { key: "warrior1right", frame: 2 },
        { key: "warrior1right", frame: 3 },
        { key: "warrior1right", frame: 4 },
        { key: "warrior1right", frame: 5 },
        { key: "warrior1right", frame: 6 },
        { key: "warrior1right", frame: 7 },
        { key: "warrior1right", frame: 8 },
        { key: "warrior1right", frame: 9 },
        { key: "warrior1right", frame: 10 },
        { key: "warrior1right", frame: 11 },
        { key: "warrior1right", frame: 12 },
        { key: "warrior1right", frame: 13 }
      ],
      frameRate: 16,
      repeat: -1,
    });



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
        const randomXVelocity = Phaser.Math.Between(-30,-20) + Phaser.Math.Between(0, 1) * 40;
        const randomYVelocity = Phaser.Math.Between(-30,-20) + Phaser.Math.Between(0, 1) * 40;

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
  
    this.add.text(20, 20, `Playing Game`, {
      font: "25px Arial",
      fill: "white",
    });
    
  }

  update() {
    const { left, right, up, down, input } = this.cursors;

    let isMoving = false;

    if (left.isDown || this.inputKeys.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("warrior1LeftAnimation", true);
      isMoving = true;
    } else if (right.isDown || this.inputKeys.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("warrior1RightAnimation", true);
      isMoving = true;
    } else {
      this.player.setVelocityX(0);
    }

    if (up.isDown || this.inputKeys.up.isDown) {
      this.player.setVelocityY(-100);
      this.player.anims.play("warrior1BackAnimation", true);
      isMoving = true;
    } else if (down.isDown || this.inputKeys.down.isDown) {
      this.player.setVelocityY(100);
      this.player.anims.play("warrior1FrontAnimation", true);
      isMoving = true;
    } else {
      this.player.setVelocityY(0);
    }

    // Adjust camera bounds when character reaches near the edge
    let cameraBounds = this.cameras.main.getBounds();
    let buffer = 0;

    if (this.player.x < cameraBounds.x + buffer) {
      this.cameras.main.setBounds(this.player.x - buffer, cameraBounds.y, cameraBounds.width, cameraBounds.height);
    } else if (this.player.x > cameraBounds.x + cameraBounds.width - buffer) {
      this.cameras.main.setBounds(this.player.x + buffer - cameraBounds.width, cameraBounds.y, cameraBounds.width, cameraBounds.height);
    }

    if (this.player.y < cameraBounds.y + buffer) {
      this.cameras.main.setBounds(cameraBounds.x, this.player.y - buffer, cameraBounds.width, cameraBounds.height);
    } else if (this.player.y > cameraBounds.y + cameraBounds.height - buffer) {
      this.cameras.main.setBounds(cameraBounds.x, this.player.y + buffer - cameraBounds.height, cameraBounds.width, cameraBounds.height);
    }

    //!normalize

    if (!isMoving) {
      this.player.anims.stop();
    } else {
      this.player.anims.resume();
    }

    //TODO add attack animation & interaction
    // if(input.isDown || this.inputKeys.attack.isDown){
    //   this.player.anims.play("warrior1AttackAnimation", true);
    // }

    // if(input.isDown & inEventArea){
    //   //!activate event
    // }

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
