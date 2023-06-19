const { Schema, model } = require("mongoose");

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  itemType: {
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
    //Item
    //damage x2 health x4 etc ...
  },
  desc: {
    type: String,
    required: true,
    //text describing item
  },
  premium: {
    type: Boolean,
    required: true,
    default: false,
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
  itemImage: {
    type: String,
  },
});

const Item = model("item", itemSchema);
module.exports = Item;
