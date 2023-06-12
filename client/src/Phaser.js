import Phaser from "phaser";
import Scene1 from "./game/scenes/Scene1";
import Scene2 from "./game/scenes/Scene2";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "black",
  width: 1632,
  height: 1632,
  scale: {
    mode: Phaser.Scale.FIT,
	height: window.innerHeight-100,
	width: window.innerWidth,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Scene1, Scene2],
};



export default config;
