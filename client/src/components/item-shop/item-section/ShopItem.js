import {React} from "react";
import "./ShopItem.css";
import { useQuery } from "@apollo/client";
import { ALL_CONSUMABLES,ALL_ITEMS, ALL_ARMORS } from "../../../utils/queries";

function ShopItem(props) {
  

  const { loading, data: itemsList } = useQuery(props.itemTypes === 'armor'? ALL_ARMORS : ALL_CONSUMABLES);

  //const itemsList= (data ? {...data} : []);
  const toMap= ([{...itemsList}][0]).armors || ([{...itemsList}][0]).consumables || []
  console.log(toMap)
  let ShopItemXML=()=> <div>loading</div>;

  if(!loading && itemsList){
    ShopItemXML =()=> {return toMap.map((item, i) => (
    <div key={item.name+"_"+i} className="itemContainer">
      <div className="imgContainer">
        <img className="itemImg" src={item.itemImage}/>
      </div>
      <div className="itemInfo">
        <h3>Name: {item.name || "loading"}</h3>
        <p>{item.desc || "loading"}</p>
        <button>${item.value || "loading"}</button>
      </div>
    </div>
  ));}
  }
  

  return (
    <>
    {ShopItemXML()}
    </>
    )
}
export default ShopItem;
