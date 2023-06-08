import React from 'react'
import { appendScript } from '../../utils/appender'


function Game() {

  appendScript('../../game/start.js');

  return (
    <>
    <div className='canvas'>
      <canvas/>
    </div>
    </>
    
  )
}

export default Game