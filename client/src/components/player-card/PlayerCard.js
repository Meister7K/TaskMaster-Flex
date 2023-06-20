import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ONE_PLAYER } from "../../utils/queries";
import "./PlayerCard.css";
import { EQUIP_ITEM, REMOVE_GOLD } from "../../utils/mutations";

import Auth from "../../utils/auth";
import ReactModal from "react-modal";

function PlayerCard() {
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  if (!user) {
    window.location.assign("/");
  }

  const { loading, data: playerData, refetch: refetchInv } = useQuery(ONE_PLAYER, {
    variables: { userId: Auth.getProfile().data._id },
  });

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
  

  // console.log(playerData.onePlayer);
  let playerInventoryXML = <h3>loading</h3>;
  if (!loading) {
    playerInventoryXML = playerData.onePlayer.inventory.map((item, i) => (
      <div key={"playerinv" + i}>
        {/*include code to hover and see more details*/}
        <h4>Inventory</h4>
        <ul>
          <li>{item.name}</li>
          <li>{item.value}</li>
        </ul>

        <button cost={item.value}>sell</button>
        <button itemidentifier={item._id} onClick={item.itemType==='consumable'? null : handleEquip} >{item.itemType==='consumable'? 'use':'equip'}</button>

      </div>
    ));
  }

  let playerXML = <h3>Loading</h3>;

  if (!loading) {
    playerXML = (
      <div className="playerCard">
        <div className="username">{user.username}</div>

        {/* //adding divs instead of UL */}
        <div className="playerStats">
          <h3>Stats:</h3>
          <div className="stats-container">
            <div className="level-wrapper">
              Level: {playerData.onePlayer.level}
            </div>

            <div className="xp-wrapper">
              XP: {playerData.onePlayer.xp || 0}
            </div>

            <div className="health-wrapper">
              Max Health: {playerData.onePlayer.health}
            </div>
          </div>
        </div>
        <div className="armorEquip">
          <div>
            <div className="current-armor-title">
              <h4>Current Armor:</h4>
            </div>
            <div className="armor-image">
              <img
              src={
                "data:image/png;base64," +
                playerData.onePlayer.playerArmor.itemImage
              }
              ></img>
            </div>
            <div className="armor-container">
              <div className="armor-name-wrapper">
                <div className="stat-label">
                  Name: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.name}
                </div>
              </div>
              <div className="armor-stats-wrapper">
                <div className="stat-label">
                  Stats: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.stats}
                </div>
              </div>
              <div className="armor-desc-wrapper">
                <div className="stat-label">
                  Description: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.desc}
                </div>
              </div>
              <div className="armor-value-wrapper">
                <div className="stat-label">
                  Value: 
                </div>
                <div className="stat-data">
                  {playerData.onePlayer.playerArmor.value}
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="weaponEquip">
          <div>
            <div className="current-weapon-title">
              <h4>Current Weapon</h4>
            </div>
            <img className="weapon-image"
              src={
                "data:image/png;base64," +
                playerData.onePlayer.playerWeapon.itemImage
              }
            ></img>
            <ul>
              <li>Name: {playerData.onePlayer.playerWeapon.name}</li>
              <li>Stats: {playerData.onePlayer.playerWeapon.stats}</li>
              <li>Description: {playerData.onePlayer.playerWeapon.desc}</li>
              <li>Value: {playerData.onePlayer.playerWeapon.value}</li>
            </ul>
          </div>
        </div>
        <div className="playerInv"></div>
      </div>
    );
  }

  return (
    <div className="player-container">
      <div className="player-wrapper">
        <div className="player-content-wrapper">
          {playerXML}
          {playerInventoryXML}
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
