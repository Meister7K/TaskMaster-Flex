
import Phaser from 'phaser'
import Coins from '../classes/hud/Coins';
//import Text from '../classes/hud/Text';

class HUD extends Phaser.Scene {
    constructor() {
      super("HUD");
    }
    preload(){

    }
    create(){
      this.coins = new Coins(this,20, 20)
    }
    update(){

    }
}

export default HUD;