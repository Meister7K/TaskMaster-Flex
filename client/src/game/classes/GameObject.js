import Phaser from "phaser";

class GameObject extends Phaser.GameObjects.Sprite {
    
    
    constructor(scene, x,y,spriteSheet,frames ){
        super(scene,x,y,'Texture','frames')

        this.physics.add.collidesWorldBounds(true);
        
    }
}

export default GameObject