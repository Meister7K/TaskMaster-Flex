import React from "react";
import "./Rules.css";
import { Button } from "./Button";

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
                This is where the rules will go. This is where the rules will
                go. This is where the rules will go. This is where the rules
                will go. This is where the rules will go.
              </li>
              <li>
                This is where the rules will go. This is where the rules will
                go. This is where the rules will go. This is where the rules
                will go. This is where the rules will go.
              </li>
              <li>
                This is where the rules will go. This is where the rules will
                go. This is where the rules will go. This is where the rules
                will go. This is where the rules will go.
              </li>
              <li>
                This is where the rules will go. This is where the rules will
                go. This is where the rules will go. This is where the rules
                will go. This is where the rules will go.
              </li>
              <li>
                This is where the rules will go. This is where the rules will
                go. This is where the rules will go. This is where the rules
                will go. This is where the rules will go.
              </li>
            </ol>
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
