import GameObject from './GameObject.js'
import Phaser from 'phaser'

class Enemies extends GameObject{
    constructor(scene,x,y,spriteSheet,frames,health, attack, target= this.player){
        super(scene,x, y, spriteSheet, frames);

        this.target = target;
        this.health = health;
        this.attack = attack;
        this.ATTACK_RADIUS = 100; //px
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    preUpdate(){
        if(Phaser.Math.Distance.BetweenPoints(
            {x:this.x, y: this.y},
            {x:this.target.x, y:this.target.y}
        )<this.ATTACK_RADIUS){
            this.getBody().setVelocity(this.target.x - this.x);
            this.getBody().setVelocity(this.target.y - this.y);
        }
        else {
            this.getBody().setVelocity(0);//!change to random within a range
        }
    }

    setTarget(){
        this.target = this.target;
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