import React from 'react'
import CardItem from '../card-item/CardItem'
import './AboutCards.css'

function AboutCards() {
  return (
    <>
     <h1 className='about'>About the Developers</h1>
       <div className='cards'>
        <div className="cards-container">
          <div className="cards-wrapper">
            <ul className="cards-items">
              <CardItem 
              src="images/developer.jpg"
              text="Will Lord"
              label="Will Lord"
              path="/Will"
              />
              <CardItem 
              src="images/developer.jpg"
              text="Marquise West"
              label="Marquise West"
              path="/Marquise"
              />
              <CardItem 
              src="images/developer.jpg"
              text="Kevin Callaghan"
              label="Kevin Callaghan"
              path="/Kevin"
              />
              <CardItem 
              src="images/developer.jpg"
              text="Karl Finkel"
              label="Karl Finkel"
              path="/Karl"
              />
              <CardItem 
              src="images/developer.jpg"
              text="Clint Reagan"
              label="Clint Reagan"
              path="/Clint"
              />                        
            </ul>          
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutCards