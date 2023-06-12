const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return v === "weapon" || v === "armor" || v === "consumable";
      },
      message: "invalid item type",
    },
  },
  stats: {
    type: [String],
    //damage x2 health x4 etc ...
  },
  desc: {
    type: Text,
    required: true,
    //text describing item
  },
  consumable: {
    type: Boolean,
    required: true,
    //boolean y/n
  },
  value: {
    type: Number,
    required: true,
    //$$$$$$$$$$$
  },
});

const Item = new model("item", itemSchema);
module.exports=Item;
