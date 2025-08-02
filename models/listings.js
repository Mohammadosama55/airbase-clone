const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId, // This specifies it's a MongoDB ObjectId
    ref: 'User', // This tells Mongoose that this ObjectId refers to documents in the 'User' collection
  },
});

// Use a function to lazily load the Review model
listingSchema.post("findOneAndDelete", async function(listing) {
  if (listing) {
    const Review = mongoose.model('Review'); // Lazy load
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;