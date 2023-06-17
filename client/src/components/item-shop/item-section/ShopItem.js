import { React, useState } from "react";
import "./ShopItem.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  ALL_CONSUMABLES,
  ALL_ITEMS,
  ALL_ARMORS,
  ALL_WEAPONS,
  GET_GOLD
} from "../../../utils/queries";

import auth from "../../../utils/auth";

import { ADD_TO_INVENTORY, REMOVE_GOLD } from "../../../utils/mutations";

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

  const { loading2, data: wallet, refetch: refetchWallet } = useQuery(GET_GOLD, {
    variables: { userId: auth.getProfile().data._id },
  });

  const [purchaseState, setPurchaseState] = useState(false);

  const [removeGold] = useMutation(REMOVE_GOLD, {
    onError: (error) => {
      console.log(error);
    }
  });
  
  const [addToInventory] = useMutation(ADD_TO_INVENTORY, {
    onError: (error) => {
      console.log(error);
    }
  });

  const handlePurchaseItem = async (event) => {
    try {
      const identify = event.currentTarget.getAttribute("identify");
      const amount = event.currentTarget.getAttribute("price");
      console.log(amount);
      console.log(identify);
      const userId = auth.getProfile().data._id;
      console.log(wallet.playerGold)
      if(wallet.playerGold >= amount){

        await removeGold({variables: {userId: userId, amount: (+amount)}});
        await addToInventory({variables: {userId: userId, itemId: identify}});
        await refetchWallet();

      console.log("purchase successful")
      }
      else{
        console.log("Not enough gold")

      }
      //setPurchaseState(true);
      
      
      
    } catch (err) {
      console.log(err);
    }
  };

  //const itemsList= (data ? {...data} : []);
  const toMap =
    [{ ...itemsList }][0].armors ||
    [{ ...itemsList }][0].consumables ||
    [{ ...itemsList }][0].weapons ||
    [];
  let ShopItemXML = () => <div>loading</div>;

  if (!loading && itemsList) {
    ShopItemXML = () => {
      return toMap.map((item, i) => (
        <div key={item.name + "_" + i} className="item-outside-container">
          <div className="itemContainer">
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
              <button
                className="purchase-button"
                onClick={handlePurchaseItem}
                price={item.value}
                identify={item._id}
              >
                {item.value || "loading"}
                <div className="goldCoin"></div>
              </button>
            </div>
          </div>
        </div>
      ));
    };
  }

  return <>{ShopItemXML()}</>;
}
export default ShopItem;
