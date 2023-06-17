import Enemies from "./Enemies";


class Minotaur extends Enemies{
    constructor(scene,x,y,spriteSheet,frames,health, attack, target){
        super(scene,x,y,spriteSheet,frames,health, attack, target);

        this.setBody().setSize(32,32);
    }

    
   
}

export default Minotaur 