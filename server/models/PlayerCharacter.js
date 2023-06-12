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
    
    inventory : {

        type: [Item],
        required: true,
        //array of [items] ref Item.js
    }
});

const PlayerCharacter = new model("playerCharacter", playerSchema);
module.exports=PlayerCharacter;
