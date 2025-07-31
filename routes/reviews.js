const express = require('express');
const router = express.Router({ mergeParams: true });
const reviewController = require('../controllers/reviews');
const { validateReview } = require('../middleware/validation');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedin } = require('../middleware/isLoggedin');

// Create Review Route
router.post("/", 
    isLoggedin,
    validateReview, 
    wrapAsync(reviewController.createReview)
);

// Delete Review Route
router.delete("/:reviewId", 
    isLoggedin,
    wrapAsync(reviewController.deleteReview)
);


module.exports = router;