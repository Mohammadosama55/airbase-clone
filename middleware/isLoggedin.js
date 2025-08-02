const Listing = require('../models/listings');

// Authentication middleware
module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("error", "You must be logged in to access this page");
        return res.redirect("/login");
    }
    next();
};

// Session returnTo helper
module.exports.saveReturnTo = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};

// Ownership verification middleware
module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    // Check ownership
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission for this action!");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};

// // Optional: Add review ownership middleware
// // Add to middleware/auth.js
//  module.exports={
//     isReviewAuthor: async (req, res, next) => {
//         const { reviewId } = req.params;
//         const review = await Review.findById(reviewId);
        
//         if (!review.author.equals(req.user._id)) {
//             req.flash("error", "You don't have permission to do that!");
//             return res.redirect(`/listings/${req.params.id}`);
//         }
//         next();
//     }
//  }