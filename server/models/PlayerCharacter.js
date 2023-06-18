const { Schema, model } = require("mongoose");
const mongoose= require("mongoose");
const Item = require("./Item");

const playerSchema = new Schema({
    level:{
        type: Number,
        default: 1,
        required: true,
    },
    health: {

        type: Number,
        required: true,
        default: 100
        //total hp
    },
    energy: {
        type: Number,
        required: true,
        default: 100
        //num

    },
    gold: {
        type: Number,
        required: true,
        default: 0,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
          }
        //num
    },
    playerArmor:{
        type: Schema.Types.ObjectId,
        ref: "item",
        required: true,
        validate : {
            validator: async (value)=>{

                const validType=await Item.findById(value)
                return validType.itemType==='armor'
            },
            message: "Not armor"
        },
        default:'648c862d1ff5615e1476ff95'
    },
    playerWeapon:{
        type: Schema.Types.ObjectId,
        ref: "item",
        required: true,
        validate : {
            validator: async (value)=>{

                const validType=await Item.findById(value)
                return validType.itemType==='weapon'
            },
            message: "Not a weapon"
        },
        default:'648c862d1ff5615e1476ff91'
    },
    inventory : {

        type: [Schema.Types.ObjectId],
        ref: "item",
        required: true,
        default: []
        //array of [items] ref Item.js
    }
});

const PlayerCharacter = model("playerCharacter", playerSchema);
module.exports=PlayerCharacter;
