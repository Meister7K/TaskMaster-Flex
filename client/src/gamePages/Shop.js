import React from 'react'
import ShopSection from '../components/item-shop/ShopSection';


function Shop() {


  return (
    <div id="shop">
      <h1>SHOP</h1>
      <ShopSection shopType="blacksmith"/>
      <ShopSection shopType="generalStore"/>
      <ShopSection shopType="premiumStore"/>
      
     
      
    </div>
  );
}

export default Shop;