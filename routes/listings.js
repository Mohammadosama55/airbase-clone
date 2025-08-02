const express = require('express');
const router = express.Router();
const { validateListing } = require('../middleware/validation');
const wrapAsync = require('../utils/wrapAsync');
const { isLoggedin, isOwner } = require('../middleware/isLoggedin');
const listingController = require('../controllers/listings');
const multer  = require('multer')
const {storage} =require('../cloudConfig.js')
const upload = multer({ storage })

// ======================================
//          LISTING ROUTES
// ======================================

// Index and Create routes (same path, different methods)
router.route("/")
    .get(wrapAsync(listingController.index))          // GET /listings - Show all listings
    .post(                                           // POST /listings - Create new listing
        isLoggedin,

            upload.single('listing[image]'),
        wrapAsync(listingController.createListing)
    );
    
// New Listing Form (special path)
router.get("/new",                                   // GET /listings/new - New listing form
    isLoggedin,
    listingController.renderNewForm
);

// Routes for individual listings (same :id path)
router.route("/:id")
    .get(wrapAsync(listingController.showListing))    // GET /listings/:id - Show listing
    // .put(                                            // PUT /listings/:id - Update listing
    //     isLoggedin,
    //     isOwner,
    //     wrapAsync(listingController.updateListing)
    // )
    .put(isLoggedin, isOwner, upload.single('image'),validateListing,  wrapAsync(listingController.updateListing))  //
    .delete(                                         // DELETE /listings/:id - Delete listing
        isLoggedin,
        isOwner,
        wrapAsync(listingController.deleteListing)
    );

// Edit Form (special path)
router.get("/:id/edit",                              // GET /listings/:id/edit - Edit form
    isLoggedin,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;