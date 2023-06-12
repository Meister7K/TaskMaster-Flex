import React from 'react'
import './ShopItem.css'

function ShopItem(props){

    return (
        <div className='itemContainer'>
            <div className='imgContainer'> 
            {/* <img className="itemImg" src="https://www.mariowiki.com/images/thumb/f/fc/ItemBoxMK8.png/1200px-ItemBoxMK8.png"/> */}
            </div>
            <div className='itemInfo'>
                <h3>Name: {props.itemName}</h3>
                <p>{props.itemDesc}</p>
                <button>${props.price || 20}</button>
            </div>
        </div>
    );

}
export default ShopItem