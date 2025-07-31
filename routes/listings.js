const express = require('express');
const router = express.Router();
const { validateListing } = require('../middleware/validation');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedin, isOwner } = require('../middleware/isLoggedin');
const listingController = require('../controllers/listings');
// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new",isLoggedin, (req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// Create Route
router.post("/", isLoggedin, validateListing, wrapAsync(listingController.createListing));


// Edit Route
router.get("/:id/edit", isLoggedin, wrapAsync(listingController.renderEditForm));

// Update Route
router.put("/:id", isLoggedin, isOwner, wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id", isLoggedin, isOwner, wrapAsync(listingController.deleteListing));

module.exports = router;