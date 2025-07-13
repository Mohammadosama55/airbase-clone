const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");



/// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/airbase-clone')
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

 const initDB = async () => {
 await Listing.deleteMany({});
 await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();