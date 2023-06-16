import Phaser from "phaser";

class GameObject extends Phaser.GameObjects.Sprite {
    
    
    constructor(scene, x,y,spriteSheet,frames ){
        super(scene,x,y,spriteSheet,frames)
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBody().setCollideWorldBounds(true);
    }
    
  flipSprite(){
    if(this.body.velocity.x < 0 ){
      this.scaleX = -1;
    } else {
      this.scaleX = 1;
    }
  }
    setBody(){
       return this.body;
    }
}

export default GameObject