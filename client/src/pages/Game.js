import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Phaser from "phaser";
import config from "../Phaser";
import "./Game.css";
import Auth from "../utils/auth";

let game;

function Game() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = Auth.loggedIn()
      ? Auth.getProfile().data.username
      : null;
    setUser(loggedInUser);
  }, []);

  useEffect(() => {

    if(game) {
      game.destroy(true);
    }

    if (user && location.pathname === `/${user}/play`) {
      game = new Phaser.Game(config);
    } 

    return;
  }, [location, user]);

  return <div id="phaser-container" />;
}

export default Game;
