import Phaser from 'phaser';


class Scene2 extends Phaser.Scene{
    constructor(){
        super('play game');
    }

    preload() {}
    
      create() {

        this.background = this.add.image(0,0, 'background');
        this.background.setOrigin(0,0);

        this.add.text(20,20,'Playing Game', {
            font: '25px Arial',
            fill: 'white'
        })
        }
    
      update() {}
}

export default Scene2