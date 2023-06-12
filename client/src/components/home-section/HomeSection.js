import React from "react";
import "../../App";
import { Button } from "../button/Button";
import "./HomeSection.css";

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
            destination="/game"
          >
            Play Game <i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default HomeSection;
