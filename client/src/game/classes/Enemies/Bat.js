import Enemies from "./Enemies";

class Bat extends Enemies{
    constructor(scene,x,y,spriteSheet,frames,health, attack, target= this.player){
        super(scene,x,y,spriteSheet,frames,health, attack, target= this.player)

        this.setBody().setSize(16,16);
    }
}

export default Bat 