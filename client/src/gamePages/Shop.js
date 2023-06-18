import React from "react";
import ShopSection from "../components/item-shop/ShopSection";
import Auth from "../utils/auth";
import "./Shop.css";

function Shop() {
  const user = Auth.loggedIn();
  if (!user) {
    window.location.assign("/");
    return null;
  }
  return (
    <div id="shop">
      <ShopSection shopType="blacksmith" />
      <ShopSection shopType="generalStore" />
      <ShopSection shopType="premiumStore" />
    </div>
  );
}

export default Shop;
