require("dotenv").config();
const connection = require("../config/connection");
const Item = require("../models/Item");
connection.on("error", (err) => err);
const imgToString = require("./imageData");

connection.once("open", async () => {
  
  await Item.deleteMany({});
  const items = [
    {
      name: "Sword of Valor",
      itemType: "weapon",
      stats: ["damage"],
      desc: "A legendary sword imbued with great power.",
      consumable: false,
      value: 1000,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/SwordOfValor_puza8g.png",
    },
    {
      name: "Shield of Protection",
      itemType: "armor",
      stats: ["defense"],
      desc: "A sturdy shield that provides excellent protection.",
      consumable: false,
      value: 800,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/Shield_ri9ag4.png",
    },
    {
      name: "Health Potion",
      itemType: "consumable",
      stats: ["healing"],
      desc: "A magical potion that restores health.",
      consumable: true,
      value: 50,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/hp_potion_albcwf.png",
    },
    {
      name: "Plate Armor",
      itemType: "armor",
      stats: ["defense"],
      desc: "Heavy armor made from sturdy plates.",
      consumable: false,
      value: 1200,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/Warrior2_ekxqdz.png",
    },
    {
      name: "Light Armor",
      itemType: "armor",
      stats: ["defense", "agility"],
      desc: "Lightweight armor made from supple leather.",
      consumable: false,
      value: 300,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/Warrior1_xs3aly.png",
    },

    {
      name: "Mana Potion",
      itemType: "consumable",
      stats: ["mana restoration"],
      desc: "A potion that replenishes energy.",
      consumable: true,
      value: 75,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/mana_potion_yswq1q.png",
    },
    {
      name: "Amulet of Vitality",
      itemType: "armor",
      stats: ["defense", "max health"],
      desc: "An enchanted amulet that boosts vitality and health.",
      consumable: false,
      value: 600,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/amulet_ehycdt.png",
    },
    {
      name: "Elixir of Strength",
      itemType: "consumable",
      stats: ["strength boost"],
      desc: "An elixir that temporarily enhances physical strength.",
      consumable: true,
      value: 100,
      itemImage: "https://res.cloudinary.com/dqkftercz/image/upload/v1687230608/strength_potion_pxpagq.png",
    },
  ];

  const dbResponse = await Item.insertMany(items);
  console.log("Items added");
  process.exit(0);
});
