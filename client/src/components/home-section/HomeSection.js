import React from "react";
import "../../App";
import { Button } from "../button/Button";
import "./HomeSection.css";
import Warrior0 from './homeAssets/Warrior0.png';
import Warrior1 from './homeAssets/Warrior1.png';
import Warrior2 from './homeAssets/Warrior2.png';

function HomeSection() {
  const scrollToRules = () => {
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const rulesSection = document.getElementById("rules");
    const scrollToPosition = rulesSection.offsetTop - navbarHeight;
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  };

  const isLoggedIn = localStorage.getItem("id_token") !== null;

  return (
    <>
      <div className="home-container" id="topOfPage">
        <video src="/videos/home-video-1.mp4" autoPlay loop muted />
        <div className="home-warrior-container">
          <div className="home-warrior-wrapper">
            <img className="warrior-0" src={Warrior0} alt="Warrior 0" />
            <img className="warrior-1" src={Warrior1} alt="Warrior 1" />
            <img className="warrior-3" src={Warrior2} alt="Warrior 2" />
          </div>
        </div>
        <h1>TASKMASTER FLEX</h1>
        {isLoggedIn ? (
          <p>Thanks for logging in, you may now play the game!</p>
        ) : (
          <p>Level up your life, one task at a time!</p>
        )}
        <div className="home-btns">
          <Button
            className="btns"
            buttonstyle="btn-outline"
            buttonSize="btn-large"
            onClick={scrollToRules}
            destination="#rules"
          >
            Rules and Info
          </Button>
          <Button
            className="btns play-btn"
            buttonstyle="btn-outline"
            buttonSize="btn-large"
            destination="/sign-up"
          >
            Sign Up Now!
          </Button>
          <Button
            className="btns play-btn"
            buttonstyle="btn-outline"
            buttonSize="btn-large"
            destination="/:username/play"
          >
            Play Game <i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomeSection;
