import Phaser from "phaser";
import Back from "../game-assets/map-files/Taskmap1.png";
import Minotaur from "../game-assets/gameSprites/MinotaurSpritesheet.png";
import Warrior1 from "../game-assets/gameSprites/Warrior1SpriteNEW.png";
import MinotaurSprites from "../game-assets/gameSprites/MinotaurATLAS.png";
import startMap from "../game-assets/map-files/Map.json";
import tiles from "../game-assets/map-files/tileSet1.png";
import Warrior1Atlas from "../game-assets/gameSprites/Warrior1ATLAS.json";
import MinotaurAtlas from "../game-assets/gameSprites/MinotaurATLAS.json";

class Scene1 extends Phaser.Scene {
  constructor() {
    super("loadGame");
  }
  preload() {
    this.load.image("tile1", tiles);
    this.load.tilemapTiledJSON("map1", startMap);

    this.load.atlas(
      "a-warrior1",
      Warrior1,
      Warrior1Atlas,
      null,
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );

    this.load.atlas(
      "minotaur",
      MinotaurSprites,
      MinotaurAtlas,
      null,
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );

    this.load.image("background", Back);
  }

  create() {
    this.scale.displaySize.setAspectRatio(1632 / 1632);
    this.scale.refresh();

    this.scene.start("play game");
    this.scene.start("HUD");
  }

  update() {}
}

export default Scene1;
