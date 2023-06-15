import React, {useState, useEffect, useRef} from "react";
import homeMusic from '../../game/game-assets/music/Soliloquy.mp3'
import './Music.css'


function Music(){
    const [audio] = useState(new Audio(homeMusic));
    const[playing, setPlaying] = useState(false);

    const toggle =()=> setPlaying(!playing);

    useEffect(()=>{
        playing ? audio.play(): audio.pause();
    }, [playing]);

    useEffect(()=>{
        audio.addEventListener('ended',()=>setPlaying(true));
      //setPlaying(true);
       window.addEventListener('mousedown', ()=>setPlaying(true),{once: true});
        // toggle()
    }, []);

//onMousemove


 
    return (
        <div className="music">
            <button id='audio' onClick={toggle}>{playing ? 'Pause Audio' : 'Play Audio'}</button>
        </div>
    )
  
}
export default Music;