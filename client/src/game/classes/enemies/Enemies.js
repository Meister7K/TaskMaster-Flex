import GameObject from "../GameObject";
import Phaser from "phaser";
import Text from "../hud/Text";

class Enemies extends GameObject {
  _maxHealth=100;
  constructor(
    scene,
    x,
    y,
    spriteSheet,
    frames,
    health,
    attack,
    target
  ) {
    super(scene, x, y, spriteSheet, frames);

    
    this.flip=true;
    this.target = target;
    this.health = health;
    this.healthValue = new Text(
      this.scene,
      this.x,
      this.y,
      this.health.toString()
    );
    this.attack = attack;
    this.ATTACK_RADIUS = 100; //px
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene.physics.world.enable(this);
    // this.getHit=()=>{
    //   if(Phaser.Math.Distance.BetweenPoints({x:this.x, y:this.y},
    //     {x:this.target.x, y:this.target.y})<this.target.width){
    //       this.loseHealth(target.doDamage())
    //     }
    // }
  }

  preUpdate() {
    if (
      Phaser.Math.Distance.BetweenPoints(
        { x: this.x, y: this.y },
        { x: this.target.x, y: this.target.y },
      ) < this.ATTACK_RADIUS
    ) {
      this.setBody().setVelocityX(this.target.x - this.x);
      this.setBody().setVelocityY(this.target.y - this.y);
      if(this.target === null){
        if(this.flip === true){
          this.setBody().setVelocity(20,0);
          this.scene.time.delayedCall(10000, ()=>{
            this.flip = false;
          })}else if(this.flip === false){
            this.setBody().setVelocity(-20,0);
            this.scene.time.delayedCall(10000, ()=>{
              this.flip = true;
            })
          }
      }
    } else {
      if(this.flip === true){
        this.setBody().setVelocity(20,0);
        this.scene.time.delayedCall(5000, ()=>{
          this.flip = false;
        })}else if(this.flip === false){
          this.setBody().setVelocity(-20,0);
          this.scene.time.delayedCall(5000, ()=>{
            this.flip = true;
          })
        }
    
    }
  }

  setTarget() {
    this.target = this.target;
  }

  loseHealth(damage) {
    this.health -= damage;
    
    this.setAlpha(0.5);
    this.scene.time.delayedCall(100, () => {
      this.setAlpha(1);
    });

    if(this.health <= 0){
      this.disableBody(true,false);
        this.scene.time.delayedCall(300, ()=>{
          this.destroy();
          this.drop();
        })
    }
    this.healthValue.setText(this.health.toString());
  }

  drop(){
    
  }

  doDamage() {
    if(this.target.health >0){
      return this.attack;
  } else {
    return ''
  }
}

  update() {
    this.body.velocity.x < 0 ? this.setFlipX(true) : this.setFlipX(false);

    this.healthValue.setPosition(this.x, this.y-10);
    this.healthValue.setOrigin(0.5, 1.5);
    this.healthValue.setScale(0.4);

  }
}

export default Enemies;
