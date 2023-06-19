import Phaser from "phaser";
import Back from "../game-assets/map-files/Taskmap1.png";
import Minotaur from '../game-assets/gameSprites/MinotaurSpritesheet.png';
import Warrior1 from "../game-assets/gameSprites/Warrior1SpriteNEW.png";
// import Warrior0Back from '../game-assets/gameSprites/Warrior0BackSpritesheet.png';
// import Warrior0Left from '../game-assets/gameSprites/Warrior0LeftSpritesheet.png';
// import Warrior0Right from '../game-assets/gameSprites/Warrior0RightSpritesheet.png';
// import Warrior1Front from '../game-assets/gameSprites/Warrior1FrontSpritesheet.png';
// import Warrior1Back from '../game-assets/gameSprites/Warrior1BackSpritesheet.png';
// import Warrior1Left from '../game-assets/gameSprites/Warrior1LeftSpritesheet.png';
// import Warrior1Right from '../game-assets/gameSprites/Warrior1RightSpritesheet.png';
import startMap from '../game-assets/map-files/Map.json'
import tiles from'../game-assets/map-files/tileSet1.png'
import Warrior1Atlas from '../game-assets/gameSprites/Warrior1ATLAS.json'


class Scene1 extends Phaser.Scene {

  constructor() {
    super("loadGame");
  }
  preload() {

    //this.load.image('warrior',Warrior0Front);
   


 this.load.image('tile1', tiles);
    this.load.tilemapTiledJSON('map1',startMap);

    this.load.spritesheet("minotaur", Minotaur, {
      frameWidth: 96,
      frameHeight: 80,
    });

    // this.load.spritesheet(Warrior1);
    this.load.atlas(
      "a-warrior1",
      Warrior1,
      Warrior1Atlas,
      null,
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );


    // this.load.spritesheet("warrior0front", Warrior0Front, {
    //   frameWidth: 90,
    //   frameHeight: 90,
    // });

    // this.load.spritesheet("warrior0back", Warrior0Back, {
    //   frameWidth: 90,
    //   frameHeight: 90,
    // });

    // this.load.spritesheet("warrior0left", Warrior0Left, {
    //   frameWidth: 90,
    //   frameHeight: 90,
    // });

    // this.load.spritesheet("warrior0right", Warrior0Right, {
    //   frameWidth: 90,
    //   frameHeight: 90,
    // });



    

    // this.load.spritesheet("warrior1front", Warrior1Front, {
    //   frameWidth: 141,
    //   frameHeight: 90,
    // });

    // this.load.spritesheet("warrior1back", Warrior1Back, {
    //   frameWidth: 141,
    //   frameHeight: 90,
    // });

    // this.load.spritesheet("warrior1left", Warrior1Left, {
    //   frameWidth: 141,
    //   frameHeight: 90,
    // });

    // this.load.spritesheet("warrior1right", Warrior1Right, {
    //   frameWidth: 141,
    //   frameHeight: 90,
    // });

    this.load.image("background", Back);

  }

  create() {
    this.scale.displaySize.setAspectRatio(1632/1632);
    this.scale.refresh();
    
    this.scene.start("play game");
    this.scene.start('HUD')
  }

  update() {}
}

export default Scene1;
