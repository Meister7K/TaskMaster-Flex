import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ONE_PLAYER } from "../../utils/queries";
import Auth from "../../utils/auth";
import ReactModal from "react-modal";

function PlayerCard() {
  const user = Auth.loggedIn() ? Auth.getProfile().data : null;
  if (!user) {
    window.location.assign("/");
  }

  const { loading, data: playerData } = useQuery(ONE_PLAYER, {
    variables: { userId: Auth.getProfile().data._id },
  });

    //console.log(playerData.onePlayer);
  let playerInventoryXML=<h3>loading</h3>
  if(!loading){
    playerInventoryXML=playerData.onePlayer.inventory.map((item,i)=>(
        <div key={"playerinv"+i}>
            {/*include code to hover and see more details*/}
            <h4>Inventory</h4>
            <ul>
                <li>{item.name}</li>
                <li>{item.value}</li>
            </ul>
            <button>sell</button>
            <button>equip</button>
        </div>
      ));

  }
  

    let playerXML=<h3>Loading</h3>

    if(!loading){
        playerXML= (

            <div className="playerCard">
              <h2>{user.username}</h2>
              
              <div className="playerStats">
                <h3>Stats:</h3>
                <ul>
                  <li>Level: {playerData.onePlayer.level}</li>
                  <li>XP: {playerData.onePlayer.level}</li>
                  <li>Max Health: {playerData.onePlayer.health}</li>
                </ul>
              </div>
              <div className="playerEquip">
                <div>
                  <h4>Current Armor:</h4>
                  <img
                src={
                  "data:image/png;base64," + playerData.onePlayer.playerArmor.itemImage
                }
              ></img>
                  <ul>
                    <li>Name: {playerData.onePlayer.playerArmor.name}</li>
                    <li>Stats: {playerData.onePlayer.playerArmor.stats}</li>
                    <li>Description: {playerData.onePlayer.playerArmor.desc}</li>
                    <li>Value: {playerData.onePlayer.playerArmor.value}</li>
                  </ul>
                </div>
                <div>
                  <h4>Current Weapon</h4>
                  <img
                src={
                  "data:image/png;base64," + playerData.onePlayer.playerWeapon.itemImage
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
        <div>
        {playerXML}
        {playerInventoryXML}     
        </div>
    );
    
}

export default PlayerCard;
