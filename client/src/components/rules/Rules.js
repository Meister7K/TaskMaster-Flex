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
                    Level Up Your Life: Transform your daily tasks into exciting
                    adventures and level up your life one task at a time with
                    Taskmaster Flex.
                  </li>
                  <li className="rules-list">
                    Gamified Task Management: Turn your tasks into a thrilling
                    game and earn experience points (XP), gold, and energy for
                    completing real-life tasks on the task page.
                  </li>
                  <li className="rules-list">
                    Customize Your Character: Create and customize your
                    character to embark on an epic journey of task completion,
                    leveling up, and enhancing your skills.
                  </li>
                  <li className="rules-list">
                    Shop for Productivity: Use the gold you earn to visit the
                    in-game shop and purchase items that boost your productivity
                    and efficiency in real-life tasks.
                  </li>
                  <li className="rules-list">
                    Battle Against Procrastination: Face off against the
                    challenging enemy of procrastination, and use your skills
                    wisely to stay focused, complete tasks, and emerge
                    victorious.
                  </li>
                  <li className="rules-list">
                    Restore Energy: Restore
                    your energy by completing more real-life tasks and regain
                    the vitality to continue your productive adventure.
                  </li>
                  <li className="rules-list">
                    Exciting Task Actions: Spend your energy wisely to perform
                    various in-game actions such as task prioritization,
                    breaking tasks into smaller steps, and exploring new
                    strategies for task completion.
                  </li>
                  <li className="rules-list">
                    Level Progression: Gain experience points (XP) by completing
                    tasks and level up your character, unlocking new abilities,
                    rewards, and challenges as you progress in your real-life
                    task management journey.
                  </li>
                  <li className="rules-list">
                    Stay Motivated: Taskmaster Flex provides a fun and engaging
                    way to stay motivated and accountable for your real-life
                    tasks, getting rewarded for your hard work and enjoying the
                    satisfaction of leveling up in both the game and your life.
                  </li>
                  <li className="rules-list">
                    Embrace the Productivity Adventure: Taskmaster Flex is an
                    immersive task management app that transforms your daily
                    routine into a captivating adventure of self-improvement,
                    boosting your character's productivity and watching your own
                    productivity soar.
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
