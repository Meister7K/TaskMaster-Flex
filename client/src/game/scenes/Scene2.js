 import Phaser from "phaser";
import Bat from "../game-assets/gameSprites/bat.png";
import createPlayerAnimations from "../classes/animations/PlayerAnims";
import Player from "../classes/Player";
import createMinotaurAnimations from "../classes/animations/MinotaurAnims";
import Minotaur from "../classes/enemies/Minotaur";




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
    // ! Level Logic section


    
    
    this.physics.world.setBounds(0, 0, 1632, 1632);
    // this.background = this.add.image(0, 0, "background");
    // this.background.setOrigin(0, 0);

    // ! End logic Section

  
    //! Map area start
    let map = this.make.tilemap({ key: "map1" });
    let tiles = map.addTilesetImage(
      "set1",
      "tile1",
      32,
      32,
      0,
      0
    );

console.log(map);
console.log(map.layers)

const layer1 = map.createLayer('Layer1','set1',0,0);
const layer2 = map.createLayer('Layer2','set1',0,0);
const layer3 = map.createLayer('Layer3','set1',0,0);


    //   const mapArr=[]
    

      
    // map.layers.forEach((layer,index)=>{
      
    //   let newlayer= map.createLayer(layer.name,'set1',0,0);

    //   mapArr.push(newlayer)
    // }
    // )

    let blockGroup = [];

    map.objects[0].objects.forEach(obj =>{
      let block = this.physics.add.sprite(obj.x,obj.y,null,null).setVisible(false).setActive(true).setOrigin(0,0);
      
      block.body.width = obj.width;
      block.body.height = obj.height;
      block.body.setImmovable(true);

      blockGroup.push(block);
    })
    
    //! Map area end







      //!Player
    // this.playerSprite = this.add.sprite(0,0,'warrior')
    let sword= 10;

    this.player = new Player(this,760,750,'a-warrior1',0,100,sword);

    console.log(this.player);


  //  !Player End


  //! Enemies
const randomX = Phaser.Math.Between(0, this.game.config.width);
  const randomY = Phaser.Math.Between(0, this.game.config.height);
  const randomXVelocity =
    Phaser.Math.Between(-30, -20) + Phaser.Math.Between(0, 1) * 40;
  const randomYVelocity =
    Phaser.Math.Between(-30, -20) + Phaser.Math.Between(0, 1) * 40;


    const minoutarnum = 5;
    const minotaurs = []
    for(let i=0;i<minoutarnum;i++){
      const randomX = Phaser.Math.Between(0, this.game.config.width);
      const randomY = Phaser.Math.Between(0, this.game.config.height);
      

       this.minotaur = new Minotaur(this, randomX, randomY, 'minotaur',0, 100,50,this.player);
       if (this.minotaur.velocity === 0){
        this.minotaur.velocity.setTo(randomXVelocity,randomYVelocity);
       }
       minotaurs.push(this.minotaur);
    }
       this.minotaurs = minotaurs;

     
      this.cameras.main.setBounds(0, 0, 1632, 1632);
      this.cameras.main.startFollow(this.player, true, 0.09,0.09);
      this.cameras.main.setZoom(3);
  // !Enemies Ends 

      // ! Animations Section
  
   //createMinotaurAnimations(this.anims);
   

    //! End animations

    const layer4 = map.createLayer('Layer4','set1',0,0);
    const layer5 = map.createLayer('Layer5','set1',0,0);
    const layer6 = map.createLayer('Layer6','set1',0,0);
    const layer7 = map.createLayer('Layer7','set1',0,0);
    // const numMinotaurs = 3;

    // for (let i = 0; i < numMinotaurs; i++) {
    //   const randomX = Phaser.Math.Between(0, this.game.config.width);
    //   const randomY = Phaser.Math.Between(0, this.game.config.height);
    //   const randomXVelocity =
    //     Phaser.Math.Between(-30, -20) + Phaser.Math.Between(0, 1) * 40;
    //   const randomYVelocity =
    //     Phaser.Math.Between(-30, -20) + Phaser.Math.Between(0, 1) * 40;

    //   const minotaur = this.add.sprite(randomX, randomY, "minotaur");//! change
    //   this.physics.add.existing(minotaur);

    //   minotaur.body.velocity.setTo(randomXVelocity, randomYVelocity);
    //   minotaur.body.bounce.set(1);
    //   minotaur.body.collideWorldBounds = true;
      


    //   minotaur.setOrigin(0.5, 0.5);//! look into this
    //   minotaur.play("minotaurAnimation");

    //   this.minotaurs.push(minotaur);
    // }

    const batImg = new Image();
    batImg.onload = () => {
      const texture = this.textures.addSpriteSheet("batSheet", batImg, {
        frameWidth: 32,
        frameHeight: 32,
      });

      this.anims.create({
        key: "batAnimation",
        frames: this.anims.generateFrameNumbers("batSheet", {
          start: 0,
          end: 3,
        }),
        frameRate: 8,
        repeat: -1,
      });

      const numBats = 7;

      for (let i = 0; i < numBats; i++) {
        const randomX = Phaser.Math.Between(0, this.game.config.width);
        const randomY = Phaser.Math.Between(0, this.game.config.height);
        const randomXVelocity = Phaser.Math.Between(-30, 30);
        const randomYVelocity = Phaser.Math.Between(-30, 30);

        const bat = this.add.sprite(randomX, randomY, "batSheet");
        this.physics.add.existing(bat);
        this.physics.add.collider(bat.body, this.player)
        this.physics.add.collider(bat.body, minotaurs)
        this.physics.add.collider(bat.body, blockGroup)
        bat.body.velocity.setTo(randomXVelocity, randomYVelocity);
        bat.body.bounce.set(1);
        bat.body.collideWorldBounds = true;
        

        bat.setOrigin(0, 0);
        bat.play("batAnimation");
      }
    };
    batImg.src = Bat;
// ! Add collisions at the end of every create method for all game objects

    this.physics.add.collider(minotaurs, this.player,(obj1,obj2)=>{
      (obj2).loseHealth((obj1).doDamage());
    })

    
    this.physics.add.collider(this.player, map.objects);

    this.physics.add.collider(this.player, blockGroup );

    this.physics.add.collider(minotaurs, blockGroup);
    this.physics.add.collider(minotaurs, minotaurs);

    this.physics.add.collider(this.player, minotaurs,(obj1,obj2)=>{
      (obj1).loseHealth((obj2).doDamage());

    })

    this.physics.add.collider(minotaurs, this.player.playerAttack,(obj1,obj2)=>{
      (obj1).loseHealth((obj2).doDamage());

    })

// ! End Collision section
   
  }

  update() {
    

    this.player.update();
   
    
    this.minotaurs.forEach((minotaur) => {
      minotaur.update();
    });
    
    this.scale.displaySize.setAspectRatio(
      window.innerWidth / window.innerHeight
    );
    this.scale.refresh();

    // const { left, right, up, down, input } = this.cursors;

    // let isMoving = false;

  //   if (left.isDown || this.inputKeys.left.isDown) {
  //     this.player.setVelocityX(-100);
  //     this.player.anims.play("warrior0LeftAnimation", true);
  //     isMoving = true;
  //   } else if (right.isDown || this.inputKeys.right.isDown) {
  //     this.player.setVelocityX(100);
  //     this.player.anims.play("warrior0RightAnimation", true);
  //     isMoving = true;
  //   } else {
  //     this.player.setVelocityX(0);
  //   }

  //   if (up.isDown || this.inputKeys.up.isDown) {
  //     this.player.setVelocityY(-100);
  //     this.player.anims.play("warrior0BackAnimation", true);
  //     isMoving = true;
  //   } else if (down.isDown || this.inputKeys.down.isDown) {
  //     this.player.setVelocityY(100);
  //     this.player.anims.play("warrior0FrontAnimation", true);
  //     isMoving = true;
  //   } else {
  //     this.player.setVelocityY(0);
  //   }
  // //TODO add attack animation & interaction
  //   if(this.inputKeys.attack.isDown){
  //     this.player.anims.play("warrior1AttackAnimation", true);
  //   }

    // if(input.isDown & inEventArea){
    //   //!activate event
    // }

    //! Adjust camera bounds when character reaches near the edge
    // let cameraBounds = this.cameras.main.getBounds();
    // let buffer = 0;

    // if (this.player.x < cameraBounds.x + buffer) {
    //   this.cameras.main.setBounds(
    //     this.player.x - buffer,
    //     cameraBounds.y,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // } else if (this.player.x > cameraBounds.x + cameraBounds.width - buffer) {
    //   this.cameras.main.setBounds(
    //     this.player.x + buffer - cameraBounds.width,
    //     cameraBounds.y,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // }

    // if (this.player.y < cameraBounds.y + buffer) {
    //   this.cameras.main.setBounds(
    //     cameraBounds.x,
    //     this.player.y - buffer,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // } else if (this.player.y > cameraBounds.y + cameraBounds.height - buffer) {
    //   this.cameras.main.setBounds(
    //     cameraBounds.x,
    //     this.player.y + buffer - cameraBounds.height,
    //     cameraBounds.width,
    //     cameraBounds.height
    //   );
    // }

    // //!normalize

    // if (!isMoving) {
    //   this.player.anims.stop();
    // } else {
    //   this.player.anims.resume();
    // }

  

    // this.minotaurs.forEach((minotaur) => {
    //   if (minotaur.body.velocity.x < 0) {
    //     minotaur.setFlipX(true);
    //   } else {
    //     minotaur.setFlipX(false);
    //   }
    // });
  }
}

export default Scene2;
