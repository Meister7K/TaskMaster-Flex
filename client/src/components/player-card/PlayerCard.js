import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ONE_PLAYER } from "../../utils/queries";
import "./PlayerCard.css";
import { EQUIP_ITEM, ADD_GOLD, REMOVE_ITEM } from "../../utils/mutations";

import Auth from "../../utils/auth";
import ReactModal from "react-modal";

function PlayerCard() {
  const [showPlayerXML, setShowPlayerXML] = useState(true);
  const [showPlayerInventoryXML, setShowPlayerInventoryXML] = useState(false);

  const handlePlayerXMLClick = () => {
    setShowPlayerXML(true);
    setShowPlayerInventoryXML(false);
  };

  const handlePlayerInventoryXMLClick = () => {
    setShowPlayerXML(false);
    setShowPlayerInventoryXML(true);
  };

  //logged in
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  if (!user) {
    window.location.assign("/");
  }

  //get player inventory
  const { loading, data: playerData, refetch: refetchInv } = useQuery(ONE_PLAYER, {
    variables: { userId: Auth.getProfile().data._id },
  });


  //equip data and functions
  const [equipItem]= useMutation(EQUIP_ITEM, {
    onError: (error) => {
      console.log(error);
    },
  })
  
  async function handleEquip(e){
    const itemToEquip=e.currentTarget.getAttribute("itemidentifier")
    const newPlayer= await equipItem({ variables : {userId: user._id, itemId: itemToEquip}});
    refetchInv();
    

  }

  //sell data and functions
  const [removeItem]= useMutation(REMOVE_ITEM, {
    onError: (error) => {
      console.log(error);
    },
  });

  const [addGold] = useMutation(ADD_GOLD, {
    onError: (error) => {
      console.log(error);
    },
  });

  async function handleSell(event){
    console.log("here")
    let price=event.currentTarget.getAttribute("cost")
    let itemIndex=event.currentTarget.getAttribute("index")
    if(itemIndex>=0){
      await addGold({variables : {userId: Auth.getProfile().data._id , amount: +price}});
      await removeItem({variables : {userId: Auth.getProfile().data._id, index: +itemIndex}})

    }
    
    refetchInv()
  }
  

  // console.log(playerData.onePlayer);
  let playerInventoryXML = <h3>loading</h3>;
  if (!loading) {
    playerInventoryXML = playerData.onePlayer.inventory.map((item, i) => (
      <div className="playerCard">
        <div className="inventoryEquip">
          <div key={"playerinv" + i}>
            {/*include code to hover and see more details*/}
            <div className="current-armor-title">
              <h3>{item.name}</h3>
            </div>
            <div className="inventory-item-value">
              Item Value: {item.value}
            </div>
            {/* <ul>
              <li>{item.name}</li>
              <li>{item.value}</li>
            </ul> */}
            <div className="button-container">
              <button className="sell-button" cost={item.value} itemidentifier={item._id} index={i} onClick={handleSell}>Sell</button>
              <button className="equip-button" itemidentifier={item._id} index={i} onClick={item.itemType==='consumable'? null : handleEquip} >{item.itemType==='consumable'? 'Use':'Equip'}</button>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  let playerXML = <h3>Loading</h3>;

  if (!loading) {
    playerXML = (
      <div className="playerCard lastCard">
        {/* <div className="username">
          {user.username}
        </div> */}
        <div className="playerStats">
          <div className="player-stats-title">
            <h3>Stats:</h3>
          </div>
          <div className="stats-container">
            <div className="player-stat-wrapper">
              Level: {playerData.onePlayer.level}
            </div>

            <div className="player-stat-wrapper">
              XP: {playerData.onePlayer.xp || 0}
            </div>

            <div className="player-stat-wrapper">
              Max Health: {playerData.onePlayer.health}
            </div>
          </div>
        </div>
        <div className="armorEquip">
            <div className="current-armor-title">
              <h3>Current Armor:</h3>
            </div>
            <div className="armor-image-wrapper">
              <img className="armor-image" 
              src={playerData.onePlayer.playerArmor.itemImage}></img>
            </div>
            <div className="armor-container">
              <div className="armor-stat-wrapper">
                <div className="stat-label">
                  Name: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.name}
                </div>
              </div>
              <div className="armor-stat-wrapper">
                <div className="stat-label">
                  Stats: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.stats}
                </div>
              </div>
              <div className="armor-stat-wrapper">
                <div className="stat-label">
                  Description: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.desc}
                </div>
              </div>
              <div className="armor-stat-wrapper">
                <div className="stat-label">
                  Value: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.value}
                </div>
              </div>
            </div>
          </div>
          <div className="weaponEquip">
            <div className="current-weapon-title">
              <h3>Current Weapon</h3>
            </div>
            <div className="armor-image">
              <img className="weapon-image"
                src={playerData.onePlayer.playerWeapon.itemImage}></img>
            </div>
            <div className="weapon-container">
              <div className="weapon-stat-wrapper">
                <div className="stat-label">
                  Name: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerWeapon.name}
                </div>
              </div>
              <div className="weapon-stat-wrapper">
                <div className="stat-label">
                  Stats: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerWeapon.stats}
                </div>
              </div>
              <div className="weapon-stat-wrapper">
                <div className="stat-label">
                  Description: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerWeapon.desc}
                </div>
              </div>
              <div className="weapon-stat-wrapper">
                <div className="stat-label">
                  Value: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerWeapon.value}
                </div>
              </div>
            </div>
          </div>
        <div className="playerInv"></div>
      </div>
    );
  }

  let content = null;

  if (showPlayerXML) {
    content = (
      [playerXML]
    )

  } else if (showPlayerInventoryXML) {
    content = (
      [playerInventoryXML]
    )
  }

  return (
    <div className="player-container">
      <div className="player-wrapper">
        <div className="player-content-wrapper">
          <div className="username">
            {user.username}
          </div>
          <div className="toggle-button-container">
            <button className="toggle-button" onClick={handlePlayerXMLClick}>View Account</button>
            <button className="toggle-button" onClick={handlePlayerInventoryXMLClick}>View Inventory</button>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
