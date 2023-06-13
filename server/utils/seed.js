require('dotenv').config();
const connection = require('../config/connection');
const Item = require('../models/Item');
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Item.deleteMany({})
  const items= [
    {
        name: "Sword of Valor",
        itemType: "weapon",
        stats: ["damage"],
        desc: "A legendary sword imbued with great power.",
        consumable: false,
        value: 1000,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Shield of Protection",
        itemType: "armor",
        stats: ["defense"],
        desc: "A sturdy shield that provides excellent protection.",
        consumable: false,
        value: 800,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Health Potion",
        itemType: "consumable",
        stats: ["healing"],
        desc: "A magical potion that restores health.",
        consumable: true,
        value: 50,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      // Add more items here...
      {
        name: "Fireball Scroll",
        itemType: "consumable",
        stats: ["damage"],
        desc: "A scroll that unleashes a powerful fireball when used.",
        consumable: true,
        value: 200,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Plate Armor",
        itemType: "armor",
        stats: ["defense"],
        desc: "Heavy armor made from sturdy plates.",
        consumable: false,
        value: 1200,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      // Additional items
      {
        name: "Staff of Wisdom",
        itemType: "weapon",
        stats: ["damage", "intelligence"],
        desc: "A staff infused with ancient knowledge and great power.",
        consumable: false,
        value: 1500,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Leather Gloves",
        itemType: "armor",
        stats: ["defense", "agility"],
        desc: "Lightweight gloves made from supple leather.",
        consumable: false,
        value: 300,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Mana Potion",
        itemType: "consumable",
        stats: ["mana restoration"],
        desc: "A potion that replenishes magical energy.",
        consumable: true,
        value: 75,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Bow of Accuracy",
        itemType: "weapon",
        stats: ["damage", "precision"],
        desc: "A finely crafted bow that enhances accuracy.",
        consumable: false,
        value: 900,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Amulet of Vitality",
        itemType: "armor",
        stats: ["defense", "max health"],
        desc: "An enchanted amulet that boosts vitality and health.",
        consumable: false,
        value: 600,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      },
      {
        name: "Elixir of Strength",
        itemType: "consumable",
        stats: ["strength boost"],
        desc: "An elixir that temporarily enhances physical strength.",
        consumable: true,
        value: 100,
        itemImage: "https://thomaskinkade.com/wp-content/uploads/2020/08/mystery-box-7.jpg"
      }
      
]

const dbResponse = await Item.insertMany(items);
console.log("Items added");
process.exit(0);

});