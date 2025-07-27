const express = require('express');
const mongoose = require( 'mongoose');
const app = express();
const Listing = require('./models/listings');
const path = require("path");
const methodOverride = require("method-override");
const engine = require('ejs-mate');
const Review = require("./models/Review.js");
const { listingSchema,reviewSchema } = require('./schema.js')

// middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));

  

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/airbase-clone')
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.redirect("/listings");
});
//// Validation middleware for listings
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(',');
    return res.status(400).send(`Validation Error: ${errMsg}`);
  }
  next();
};

// Validation middleware for reviews
const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(',');
    return res.status(400).send(`Validation Error: ${errMsg}`);
  }
  next();
};

  //Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let {id}= req.params;
  const listing = await Listing.findById(id).populate('reviews');
  res.render('listings/show.ejs', { listing });
});

//Create Route
app.post("/listings",validateListing, async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// reviews for post route
app.post("/listings/:id/reviews",validateReview,async(req,res)=>{
  let foundlisting = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

 foundlisting.reviews.push(newReview);

  await newReview.save();
  await foundlisting.save();
  res.redirect(`/listings/${foundlisting._id}`);
});
// app.post("/listings/:id/reviews", async (req, res) => {
//   let foundListing = await Listing.findById(req.params.id); // Changed variable name and capitalized model
//   let newReview = new Review(req.body.review);

//   foundListing.reviews.push(newReview);

//   await newReview.save();
//   await foundListing.save();
//   console.log("new review saved");
//   res.send("new review saved");
// });





  // Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});