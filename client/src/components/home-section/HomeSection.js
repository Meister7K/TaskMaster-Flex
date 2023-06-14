import React from "react";
import "../../App";
import { Button } from "../button/Button";
import "./HomeSection.css";
import Warrior0 from './homeAssets/Warrior0.png';
import Warrior1 from './homeAssets/Warrior1.png';
import Warrior2 from './homeAssets/Warrior2.png';
import Logo from './homeAssets/TaskmasterLogo.png';
import Auth from "../../utils/auth"

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

  const isLoggedIn = Auth.loggedIn();
  let user = null;
  
  if(isLoggedIn) {
    const userFind = Auth.getProfile();
    user = userFind.data.username;
  }
  return (
    <>
      <div className="home-container" id="topOfPage">
        <video src="/videos/Taskmaster-Demo.mp4" autoPlay loop muted />
        <div className="home-warrior-container">
          <div className="home-warrior-wrapper">
            {/* <img className="warrior-0" src={Warrior0} alt="Warrior 0" />
            <img className="warrior-1" src={Warrior1} alt="Warrior 1" />
            <img className="warrior-3" src={Warrior2} alt="Warrior 2" /> */}
            <img className="warrior-1" src={Warrior1} alt="Warrior 1" />
            <img className="taskmaster-logo" src={Logo} alt="Taskmaster Logo" />
            <img className="warrior-2" src={Warrior2} alt="Warrior 2" />
          </div>
        </div>
        <div className="home-bottom-container">
          {/* <h1>&nbsp;</h1> */}
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
            {isLoggedIn ? (
              <Button
                className="btns play-btn"
                buttonstyle="btn-outline"
                buttonSize="btn-large"
                destination={`/${user}/play`}
              >
                Play Game <i className="far fa-play-circle" />
              </Button>
            ) : (
              <Button
                className="btns play-btn"
                buttonstyle="btn-outline"
                buttonSize="btn-large"
                destination="/sign-up"
              >
                Play Game <i className="far fa-play-circle" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSection;
