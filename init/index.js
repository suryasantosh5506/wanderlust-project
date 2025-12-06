const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing");

main()
  .then((res) => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initialization = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "692fada0945540ab7ea0f5db",
  }));
  await Listing.insertMany(initData.data).then((data) => console.log(data));
};

initialization();
