import React, {useState, useEffect, useRef} from "react";
import homeMusic from '../../game/game-assets/music/Soliloquy.mp3'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faVolumeXmark} from '@fortawesome/free-solid-svg-icons'
import {faVolumeHigh} from '@fortawesome/free-solid-svg-icons'




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
       return ()=>{
        audio.removeEventListener('mousedown', setPlaying(false));
       }
       
        // toggle()
    }, []);

 

 
    return (
        <div className="music">
            <button id='audio' onClick={toggle}>{playing ? <FontAwesomeIcon icon={faVolumeHigh} /> : <FontAwesomeIcon icon={faVolumeXmark} />} </button>
            {/* <audio src={homeMusic} loop controls autoPlay/> */}
        </div>
    )
  
}
export default Music;