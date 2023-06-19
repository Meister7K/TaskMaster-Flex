const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const Item = require("./Item");

const playerSchema = new Schema({
  level: {
    type: Number,
    default: 1,
    required: true,
  },
  health: {
    type: Number,
    required: true,
    default: 100,
    //total hp
  },
  energy: {
    type: Number,
    required: true,
    default: 100,
    //num
  },
  gold: {
    type: Number,
    required: true,
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },

    xp:{
        type: Number,
        default: 0,
        required: true,
    },
  

    //num
  },
  playerArmor: {
    type: Schema.Types.ObjectId,
    ref: "item",
    validate: {
      validator: async function (value) {
        const validType = await Item.findById(value).exec();
        return validType.itemType === "armor";
      },
      message: "Not armor",

    },
  },

  playerWeapon: {
    type: Schema.Types.ObjectId,
    ref: "item",
    validate: {
      validator: async function (value) {
        const validType = await Item.findById(value).exec();
        return validType.itemType === "weapon";
      },
      message: "Not a weapon",
    },
  },
  inventory: {
    type: [Schema.Types.ObjectId],
    ref: "item",
    required: true,
    default: [],
    //array of [items] ref Item.js
  },
});

async function getDefaultPlayerArmor() {
  const lightArmor = await Item.findOne({ name: "Light Armor" }).exec();
  return lightArmor ? lightArmor._id : null;
}

async function getDefaultPlayerWeapon() {
  const sword = await Item.findOne({ name: "Sword of Valor" }).exec();
  return sword ? sword._id : null;
}


playerSchema.pre('save', async function(){
    if(!this.playerArmor)
        this.playerArmor= await getDefaultPlayerArmor()
    if(!this.playerWeapon)
        this.playerWeapon= await getDefaultPlayerWeapon()
    if(this.xp>=this.level*100){
        this.xp=(this.xp%(this.level*100));
        this.level=this.level+1;
    }
})


const PlayerCharacter = model("playerCharacter", playerSchema);
module.exports = PlayerCharacter;
