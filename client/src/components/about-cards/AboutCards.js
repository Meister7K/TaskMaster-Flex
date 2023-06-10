import React from "react";
import CardItem from "../card-item/CardItem";
import "./AboutCards.css";

function AboutCards() {
  return (
    <>
      <h1 className="about">About the Developers</h1>
      <div className="cards">
        <div className="cards-container">
          <div className="cards-wrapper">
            <ul className="cards-items">
              
                <CardItem
                  src="images/developer.jpg"
                  text="Will Lord"
                  label="Will Lord"
                  path="https://github.com/Masterchef842"
                />
          
              
                <CardItem
                  src="images/developer.jpg"
                  text="Marquise West"
                  label="Marquise West"
                  path="https://github.com/sudo-apt-install"
                />
          
              
                <CardItem
                  src="images/developer.jpg"
                  text="Kevin Callaghan"
                  label="Kevin Callaghan"
                  path="https://github.com/Meister7K"
                />
          
              
                <CardItem
                  src="images/developer.jpg"
                  text="Karl Finkel"
                  label="Karl Finkel"
                  path="https://github.com/kevincallaghan"
                />
          
              
                <CardItem
                  src="images/developer.jpg"
                  text="Clint Reagan"
                  label="Clint Reagan"
                  path="https://github.com/MCReagan"
                />
          
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutCards;
