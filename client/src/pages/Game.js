import React from 'react'
//import { appendScript } from '../utils/appender'
import Phaser from 'phaser';
import Scene1 from '../../src/game/scenes/Scene1'
import Scene2 from '../../src/game/scenes/Scene2'

//TODO fix script for phazer 



function Game() {

  //TODO fix script for phazer 
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 'black',
  scene:[Scene1, Scene2] 
};

const game = new Phaser.Game(config);

  // appendScript('../../game/scenes/Scene1.js');
  // appendScript('../../game/scenes/Scene2.js')
  // appendScript('../../game/start.js');

  return (
    <>
    <div className='game' game={game}>

    </div>
    </>
    
  )
}

export default Game