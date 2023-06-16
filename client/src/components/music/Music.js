import React, { useState, useEffect } from "react";
import homeMusic from "../../game/game-assets/music/Soliloquy.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

function Music() {
  const [audio] = useState(new Audio(homeMusic));
  const [playing, setPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  const toggle = () => setPlaying(!playing);

  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
  };

  useEffect(() => {
    const storedPreference = localStorage.getItem("musicPreference");
    const initialPreference = storedPreference
      ? JSON.parse(storedPreference)
      : true;
    setPlaying(initialPreference);

    audio.addEventListener("ended", () => setPlaying(true));

    window.addEventListener("mousedown", handleUserInteraction, { once: true });

    return () => {
      audio.removeEventListener("ended", () => setPlaying(true));
      window.removeEventListener("mousedown", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (userInteracted) {
      if (playing) {
        audio.play().catch((error) => console.log(error));
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
      localStorage.setItem("musicPreference", JSON.stringify(playing));
    }
  }, [playing, userInteracted]);

  return (
    <div className="music">
      <button id="audio" onClick={toggle}>
        {playing ? (
          <FontAwesomeIcon icon={faVolumeHigh} />
        ) : (
          <FontAwesomeIcon icon={faVolumeXmark} />
        )}
      </button>
    </div>
  );
}

export default Music;
