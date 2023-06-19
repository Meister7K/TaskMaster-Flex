import Enemies from "./Enemies";


class Minotaur extends Enemies{
    constructor(scene,x,y,spriteSheet,frames,health, attack, target){
        super(scene,x,y,spriteSheet,frames,health, attack, target);

        this.setBody().setSize(32,32);

        this.setScale(0.5);
    
        // this.scene.anims.create({
        //     key: "MinotaurRightRun",
        //     frames: this.scene.anims.generateFrameNames("minotaur", {
        //     prefix: "Minotaur_02_Walking_",
        //     start: 1,
        //     end: 5,
        //     zeroPad: 3,
        //   }),
        //   repeat: -1,
        //   frameRate: 28,
        // });
    
       
    }
   
     
}

export default Minotaur 