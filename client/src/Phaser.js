import Phaser from "phaser";
import Scene1 from "./game/scenes/Scene1";
import Scene2 from "./game/scenes/Scene2";
import HUD from "./game/scenes/HUD";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "black",
  width: 1632,
  height: 1632,
  scale: {
    mode: Phaser.Scale.NONE,
    height: window.innerHeight - 100,
    width: window.innerWidth,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  canvasStyle: `display:block; width: 100%, height: 100%`,
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [Scene1, Scene2, HUD],
};

window.sizeChanged = () => {
  if (window.game) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);
      window.game.canvas.setAttribute(
        "style",
        `display: block; width: ${window.innerWidth}px; height: ${
          window.innerHeight - 100
        }px;`
      );
    }, 100);
  }
};
window.onresize = () => window.sizeChanged();

export default config;
