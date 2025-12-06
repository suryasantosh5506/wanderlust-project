const mongoose = require("mongoose");
const { data } = require("./data.js");
const Listing = require("../models/listing");

const MONGO_URL =
  "mongodb+srv://santoshreddyksb_db_user:UisLon5eLNBwzMzW@cluster0.oyijh9y.mongodb.net/wanderlust?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

const seedDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("Database seeded!");
};

seedDB().then(() => {
  mongoose.connection.close();
});
