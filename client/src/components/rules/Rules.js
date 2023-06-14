import React from "react";
import "./Rules.css";
import { Button } from "../button/Button";

function Rules() {
  const scrollToTop = () => {
    const navbarHeight = document.querySelector(".navbar").offsetHeight;
    const topOfPage = document.getElementById("topOfPage");
    const scrollToPosition = topOfPage.offsetTop - navbarHeight;
    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div id="rules">
        <div id="rules-bg">
          <div className="rules-container">
            <div className="rules">
              <h2 className="rules-title">RULES AND INFORMATION:</h2>
              <div className="rules-wrapper">
                <ol className="rules-items">
                  <li className="rules-list">
                    Level Up Your Life: Transform tasks into exciting adventures
                    and level up your life with Taskmaster Flex.
                  </li>
                  <li className="rules-list">
                    Gamified Task Management: Turn tasks into a thrilling game,
                    earning XP, gold, and energy for real-life task completion.
                  </li>
                  <li className="rules-list">
                    Customize Your Character: Create and customize your
                    character for an epic journey of task completion and skill
                    enhancement.
                  </li>
                  <li className="rules-list">
                    Shop for Productivity: Use earned gold to purchase
                    productivity-boosting items from the in-game shop.
                  </li>
                  <li className="rules-list">
                    Battle Against Procrastination: Face the challenge of
                    procrastination, staying focused to emerge victorious.
                  </li>
                  <li className="rules-list">
                    Restore Energy: Regain vitality by completing more tasks,
                    restoring energy for your productive adventure.
                  </li>
                  <li className="rules-list">
                    Exciting Task Actions: Use energy wisely for task
                    prioritization, breaking tasks into steps, and exploring new
                    strategies.
                  </li>
                  <li className="rules-list">
                    Level Progression: Gain XP, level up, and unlock new
                    abilities, rewards, and challenges in your task management
                    journey.
                  </li>
                  <li className="rules-list">
                    Stay Motivated: Taskmaster Flex keeps you accountable,
                    motivated, and rewarded for your real-life tasks.
                  </li>
                  <li className="rules-list">
                    Embrace the Productivity Adventure: Taskmaster Flex
                    transforms your routine into an immersive adventure of
                    self-improvement and productivity boost.
                  </li>
                </ol>
                <div className="back-to-top">
                  <Button
                    className="btns"
                    buttonstyle="bttbtn"
                    onClick={scrollToTop}
                    destination="#topOfPage"
                    style={{
                      fontFamily:
                        "Augusta, cursive, Times New Roman, Times, serif",
                    }}
                  >
                    <p className="bttbtn">Back to top?</p>
                  </Button>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rules;
