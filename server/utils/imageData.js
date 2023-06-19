const fs = require("fs");

const imgToString = async (imgUrl) => {
  try {
    const data = await fs.promises.readFile(imgUrl);
    const base64 = data.toString("base64");
    return base64;
  } catch (err) {
    console.error(err);
    return "error parsing image";
  }
};

module.exports = imgToString;
