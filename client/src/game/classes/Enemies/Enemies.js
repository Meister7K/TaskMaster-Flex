import GameObject from './GameObject'

class Enemies extends GameObject{
    constructor(x,y,spriteSheet,frames,health, attack){
        super(x, y, spriteSheet, frames);


        this.health = health;
        this.attack = attack;
    }

    loseHealth(damage){
        this.health -= damage;
    }

    doDamage(){
        return this.attack;
    }
    
    update(){
        this.body.velocity.x <0 ? this.setFlipX(true) : this.setFlipX(false);
    }


}

export default Enemies