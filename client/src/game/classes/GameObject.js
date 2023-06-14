import Phaser from "phaser";

class GameObject extends Phaser.GameObjects.Sprite {
    
    
    constructor(scene, x,y,spriteSheet,frames ){
        super(scene,x,y,spriteSheet,frames)
        
        this.physics.add.collidesWorldBounds(true);
        this.scene.add.existing(this);
    }
}

export default GameObject