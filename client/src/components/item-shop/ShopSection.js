import React from "react";
import ShopItem from "./item-section/ShopItem";
import "./ShopSection.css";

function ShopSection(props) {
  const blacksmith = (
    <div className="shopSection" id="blacksmithShop">
      <div className="blacksmithTitle">
        <h2>Blacksmith</h2>
      </div>
      <div>
        <div className="subtitle-container">
          <h3 className="subTitle blacksmithSubtitle">Armor:</h3>
        </div>
        <div className="itemList">
          <ShopItem itemTypes="armor" />
        </div>
      </div>
      <div>
        <h3 className="subTitle blacksmithSubtitle">Weapons:</h3>
        <div className="itemList">
          <ShopItem itemTypes="weapons" />
        </div>
      </div>
    </div>
  );

  const generalStore = (
    <div className="shopSection" id="itemShop">
      <div className="generalStoreTitle">
        <h2>General Store</h2>
      </div>
      <div>
        <h3 className="subTitle generalStoreSubtitle">Items:</h3>
        <div className="itemList">
          <ShopItem itemTypes="consumables" />
        </div>
      </div>
    </div>
  );

  const premiumStore = (
    <div className="shopSection premium" id="premium">
      <div className="premiumStoreTitle">
        <h2>Premium Items</h2>
      </div>
      <div>
        <h3 className="subTitle premiumStoreSubtitle">Currency:</h3>
        <div className="itemList">
          <ShopItem itemTypes="premium" />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {props.shopType === "blacksmith" && blacksmith}
      {props.shopType === "generalStore" && generalStore}
      {props.shopType === "premiumStore" && premiumStore}
    </div>
  );
}
export default ShopSection;
