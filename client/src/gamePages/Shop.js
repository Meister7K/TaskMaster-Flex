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
      <div className="shop-page-title">
        <div className="shop-page-title-wrapper">
          <h2>Welcome, valiant warrior, to our emporium of splendor, where armor, weapons, and elixirs await to fortify your journey and fuel your triumphs!</h2>
        </div>
      </div>
      <ShopSection shopType="blacksmith" />
      <ShopSection shopType="generalStore" />
      <ShopSection shopType="premiumStore" />
    </div>
  );
}

export default Shop;
