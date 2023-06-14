const { Schema, model } = require("mongoose");
const Item = require("./Item")

const playerSchema = new Schema({
    level:{
        type: Number,
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
        default: 0
        //num
    },
    equipment:{
        type: [Schema.Types.ObjectId],
        ref: "item",
    },
    inventory : {

        type: [Schema.Types.ObjectId],
        ref: "item",
        required: true,
        //array of [items] ref Item.js
    }
});

const PlayerCharacter = model("playerCharacter", playerSchema);
module.exports=PlayerCharacter;
