
import Phaser from 'phaser'
import Health from '../classes/hud/Healthbar';
import Text from '../classes/hud/Text';

class HUD extends Phaser.Scene {
    constructor() {
      super("HUD");
    }
    preload(){

    }
    create(){
      this.healthBar = new Health(this,20, 20)
    }
    update(){

    }
}

export default HUD;