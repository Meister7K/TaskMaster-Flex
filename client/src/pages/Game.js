import React from "react";
import { useLocation } from "react-router-dom";
import Phaser from "phaser";
import config from "../Phaser";

let game;

function Game() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/game") {
      game = new Phaser.Game(config);
    } else if (game) {
      game.destroy();
    }

    return () => {
      if (game) {
        game.destroy();
      }
    };
  }, [location]);

  return <div id="phaser-container" />;
}

export default Game;
