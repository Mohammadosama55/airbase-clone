const express = require('express');
const router = express.Router({ mergeParams: true });
const Listing = require('../models/listings');
const Review = require('../models/Review');
const { validateReview } = require('../middleware/validation');
const wrapAsync = require('../utils/wrapAsync');
const { ExpressError } = require('../middleware/errorHandler');

// Create Review Route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    let foundListing = await Listing.findById(req.params.id);
    
    if (!foundListing) {
        throw new ExpressError('Listing not found', 404);
    }
    
    let newReview = new Review(req.body.review);
    foundListing.reviews.push(newReview);

    await newReview.save();
    await foundListing.save();
     req.flash("success","new review created");
    res.redirect(`/listings/${foundListing._id}`);
}));

// Delete Review Route
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    
    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Delete the review
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","Review delete");
    console.log("Review deleted successfully");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;