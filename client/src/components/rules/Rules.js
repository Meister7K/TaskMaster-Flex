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
      <div id="rules"></div>
      <div className="rules-container">
        <div className="rules">
          <h1>TASKMASTER FLEX:</h1>
          <h2>RULES AND INFORMATION</h2>
          <div className="rules-wrapper">
            <ol className="rules-items">
              <li>
                Level Up Your Life: "Level up your life one task at a time."
                Taskmaster Flex is here to transform your daily tasks into
                exciting adventures!
              </li>
              <li>
                Gamified Task Management: Taskmaster Flex turns your tasks into
                a thrilling game. Earn experience points (XP), gold, and energy
                for completing real-life tasks that you enter on the task page.
              </li>
              <li>
                Customize Your Character: Create and customize your character to
                embark on an epic journey. Level up your character and allocate
                skill points to enhance your strength, health, damage, attack
                speed, critical hit chance, or critical hit damage.
              </li>
              <li>
                Shop for Power: Use the gold you earn to visit the in-game shop
                and purchase items that boost your character's stats. Choose
                wisely and strategize to become a formidable force in the game.
              </li>
              <li>
                Battle Against Enemies: Face off against challenging enemies
                that will attack your character. Be prepared to defend yourself
                and use your skills wisely to emerge victorious.
              </li>
              <li>
                Restore Health: As enemies attack, your character's health may
                deplete. Restore your health by completing more real-life tasks
                and regain the vitality to continue your adventure.
              </li>
              <li>
                Exciting In-Game Actions: Spend energy to perform various
                in-game actions such as opening chests, fighting boss battles,
                and traveling to new areas. Conserve and manage your energy
                wisely to explore more of the game world.
              </li>
              <li>
                Level Progression: Gain experience points (XP) by completing
                tasks and level up your character. Unlock new abilities,
                rewards, and challenges as you progress through the game.
              </li>
              <li>
                Stay Motivated: Taskmaster Flex provides a fun and engaging way
                to stay motivated and accountable for your real-life tasks. Get
                rewarded for your hard work and enjoy the satisfaction of
                leveling up both in the game and in your life.
              </li>
              <li>
                Embrace the Adventure: Taskmaster Flex is not just a task
                management app; it's an immersive experience that transforms
                your daily routine into a captivating adventure. Embark on a
                journey of self-improvement and watch as your character and
                productivity soar.
              </li>
            </ol>
            Remember, Taskmaster Flex is here to help you level up your life one
            task at a time. Are you ready to embark on this exciting quest and
            become a true Taskmaster? Start your adventure today!
          </div>
        </div>
        <div className="back-to-top">
          <Button
            className="btns"
            buttonstyle="btn-outline-rules"
            buttonSize="btn-large-rules"
            onClick={scrollToTop}
            destination="#topOfPage"
          >
            Back To Top
          </Button>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Rules;
