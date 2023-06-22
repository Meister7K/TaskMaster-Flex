import React from "react";
import Phaser from "phaser";

import Scene1 from "../../game/scenes/Scene1";
import Scene2 from "../../game/scenes/Scene2";



function GameCanvas() {
    //TODO fix script for phazer

    const config = {
      type: Phaser.CANVAS,
      canvas: document.querySelector("#gameDisplay"),
      width: 960,
      height: 693, //540
      scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE,
        width: window.innerWidth/2,
        height: window.innerHeight/2,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true
        },
        plugins:{
          scene:[{
            plugin: Phaser
          }]
        }
      },
      scene: [Scene1,Scene2],
    }
    return (
      <>
       <button>START</button>
      </>
    );
  }
  export default GameCanvas;
  