const Listing = require('../models/listings');
const Review = require('../models/Review');
const { ExpressError } = require('../middleware/errorHandler');

module.exports = {
    // Create - Add new review
    createReview: async (req, res) => {
        const foundListing = await Listing.findById(req.params.id);
        
        if (!foundListing) {
            throw new ExpressError('Listing not found', 404);
        }
        
        const newReview = new Review(req.body.review);
        foundListing.reviews.push(newReview);

        await newReview.save();
        await foundListing.save();
        req.flash("success", "New review created successfully");
        res.redirect(`/listings/${foundListing._id}`);
    },

    // Delete - Remove review
    deleteReview: async (req, res) => {
        const { id, reviewId } = req.params;
        
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        
        req.flash("success", "Review deleted successfully");
        res.redirect(`/listings/${id}`);
    }
};