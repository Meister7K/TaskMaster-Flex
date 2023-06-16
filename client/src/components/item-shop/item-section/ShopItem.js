import { React } from "react";
import "./ShopItem.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  ALL_CONSUMABLES,
  ALL_ITEMS,
  ALL_ARMORS,
  ALL_WEAPONS,
  
} from "../../../utils/queries";

import {ADD_TO_INVENTORY,
  REMOVE_GOLD} from '../../../utils/mutations'


function ShopItem(props) {
  const { loading, data: itemsList } = useQuery(
    props.itemTypes === "armor"
      ? ALL_ARMORS
      : props.itemTypes === "weapons"
      ? ALL_WEAPONS
      : props.itemTypes === "consumables"
      ? ALL_CONSUMABLES
      : ALL_ITEMS
  );

  const [removeGold, {error, data}]=useMutation(REMOVE_GOLD)
  const [addToInventory, {error2, data2}]=useMutation(ADD_TO_INVENTORY)

  const purchaseItem= async(itemId,amount)=>{
    
  }

  //const itemsList= (data ? {...data} : []);
  const toMap =
    [{ ...itemsList }][0].armors ||
    [{ ...itemsList }][0].consumables ||
    [{ ...itemsList }][0].weapons ||
    [];
  console.log(toMap);
  let ShopItemXML = () => <div>loading</div>;

  if (!loading && itemsList) {
    ShopItemXML = () => {
      return toMap.map((item, i) => (
        <div className="item-outside-container">
          <div key={item.name + "_" + i} className="itemContainer">
            <div className="imgContainer">
              <img
                className="itemImg"
                src={"data:image/png;base64," + item.itemImage}
                alt={item.name}
              />
            </div>
            <div className="itemInfo">
              <h3>Name: {item.name || "loading"}</h3>
              <p>{item.desc || "loading"}</p>
              <button className="purchase-button" onClick={purchaseItem(item._id, item._value)}>${item.value || "loading"}</button>
            </div>
          </div>
        </div>
      ));
    };
  }

  return <>{ShopItemXML()}</>;
}
export default ShopItem;
