const express = require('express');
const router = express.Router();
const Listing = require('../models/listings');
const { validateListing } = require('../middleware/validation');
const wrapAsync = require('../utils/wrapAsync');
const { ExpressError } = require('../middleware/errorHandler');
const { isLoggedin } = require('../middleware/isLoggedin');
// Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// New Route
router.get("/new",isLoggedin, (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews');
    
    if (!listing) {
        // throw new ExpressError('Listing not found', 404);
        req.flash("error","listing you try to access is not exit");
        res.redirect("/listings");
    }
    
    res.render('listings/show.ejs', { listing });
}));

// Create Route
router.post("/", validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New listing csuccessfully added");
    res.redirect("/listings");
}));

// Edit Route
router.get("/:id/edit",isLoggedin, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    if (!listing) {
        throw new ExpressError('Listing not found', 404);
    }
    
    res.render("listings/edit.ejs", { listing });
}));

// Update Route
router.put("/:id",isLoggedin, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if (!listing) {
        throw new ExpressError('Listing not found', 404);
    }
    
    res.redirect(`/listings/${id}`);
}));

// Delete Route
router.delete("/:id",isLoggedin, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    
    if (!deletedListing) {
        throw new ExpressError('Listing not found', 404);
    }
     req.flash("success","listing csuccessfully deleted");
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;