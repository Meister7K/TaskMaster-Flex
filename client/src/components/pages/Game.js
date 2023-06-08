import React from 'react'
import { appendScript } from '../../utils/appender'


function Game() {

  appendScript('game/scene/Scene1.js');
  appendScript('../../../game/scene/Scene2.js')
  appendScript("../../game/start.js");

  return (
    <>
    <div className='canvas'>
      <canvas/>
    </div>
    </>
    
  )
}

export default Game