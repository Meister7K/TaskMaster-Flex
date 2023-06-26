import GameObject from "./GameObject";
import Enemies from "./enemies/Enemies";



class AttackType extends GameObject {
    constructor(scene, x, y, w, h) {
      super(scene, x, y);
      this.h = h;
      this.w = w;

  
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setSize(w,h);
      this.body.setCollideWorldBounds(true);
      this.body.setImmovable(true);
      //scene.physics.world.enableBody(this);
    scene.physics.world.on('collide', this.handleCollision, this);
  }

  handleCollision(obj1, obj2, attack) {
    if (obj2 instanceof Enemies){
        obj2.loseHealth(obj1.doDamage(attack));
    }
  }
}

   
  
  export default AttackType;