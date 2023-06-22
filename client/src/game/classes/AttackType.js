import GameObject from "./GameObject";



class AttackType extends GameObject {
    constructor(scene, x, y) {
      super(scene, x, y);
  
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setSize(30,30);
    }
  }
  
  export default GameObject;