require('dotenv').config();
const connection = require('../config/connection');
const Item = require('../models/Item');
connection.on('error', (err) => err);
const imgToString =require("./imageData")

connection.once('open', async () => {
  console.log(imgToString("utils/shopAssets/Warrior1.png",(result)=>{
    return result;
  }));
  await Item.deleteMany({})
  const items=[

    {
        name: "Sword of Valor",
        itemType: "weapon",
        stats: ["damage"],
        desc: "A legendary sword imbued with great power.",
        consumable: false,
        value: 1000,
        itemImage: await imgToString("utils/shopAssets/SwordOfValor.png")

    },
      {
        name: "Shield of Protection",
        itemType: "armor",
        stats: ["defense"],
        desc: "A sturdy shield that provides excellent protection.",
        consumable: false,
        value: 800,
        itemImage: await imgToString("utils/shopAssets/Shield.png")
      
      },
      {
        name: "Health Potion",
        itemType: "consumable",
        stats: ["healing"],
        desc: "A magical potion that restores health.",
        consumable: true,
        value: 50,
        itemImage: await imgToString("utils/shopAssets/hp_potion.png")
      },
      {
        name: "Plate Armor",
        itemType: "armor",
        stats: ["defense"],
        desc: "Heavy armor made from sturdy plates.",
        consumable: false,
        value: 1200,
        itemImage: await imgToString("utils/shopAssets/Warrior2.png")
      },
      {
        name: "Light Armor",
        itemType: "armor",
        stats: ["defense", "agility"],
        desc: "Lightweight armor made from supple leather.",
        consumable: false,
        value: 300,
        itemImage: await imgToString("utils/shopAssets/Warrior1.png")
      },

      {
        name: "Mana Potion",
        itemType: "consumable",
        stats: ["mana restoration"],
        desc: "A potion that replenishes energy.",
        consumable: true,
        value: 75,
        itemImage: await imgToString("utils/shopAssets/mana_potion.png")
      },
      {
        name: "Amulet of Vitality",
        itemType: "armor",
        stats: ["defense", "max health"],
        desc: "An enchanted amulet that boosts vitality and health.",
        consumable: false,
        value: 600,
        itemImage: await imgToString("utils/shopAssets/amulet.png")
      },
      {
        name: "Elixir of Strength",
        itemType: "consumable",
        stats: ["strength boost"],
        desc: "An elixir that temporarily enhances physical strength.",
        consumable: true,
        value: 100,
        itemImage: await imgToString("utils/shopAssets/strength_potion.png")
      }
      
]

const dbResponse = await Item.insertMany(items);
console.log("Items added");
process.exit(0);

});