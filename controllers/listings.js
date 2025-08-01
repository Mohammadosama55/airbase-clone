const Listing = require('../models/listings');
const { ExpressError } = require('../middleware/errorHandler');

module.exports = {
    // Index - Get all listings
    index: async (req, res) => {
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", { allListings });
    },

    // New - Show form to create new listing
    renderNewForm: (req, res) => {
        res.render("listings/new.ejs");
    },

    // Show - Show details of one listing
    showListing: async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id).populate('reviews').populate('owner');
        
        if (!listing) {
            req.flash("error", "Listing you tried to access does not exist");
            return res.redirect("/listings");
        }
        
        res.render('listings/show.ejs', { listing });
    },

    // Create - Add new listing to DB
    createListing: async (req, res) => {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        req.flash("success", "New listing successfully added");
        res.redirect("/listings");
    },

    // Edit - Show form to edit listing
    renderEditForm: async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        
        if (!listing) {
            throw new ExpressError('Listing not found', 404);
        }
        
        res.render("listings/edit.ejs", { listing });
    },

    // Update - Update listing in DB
    updateListing: async (req, res) => {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        
        if (!listing) {
            throw new ExpressError('Listing not found', 404);
        }
        
        req.flash("success", "Listing successfully updated");
        res.redirect(`/listings/${id}`);
    },

    // Delete - Delete listing from DB
    deleteListing: async (req, res) => {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        
        if (!deletedListing) {
            throw new ExpressError('Listing not found', 404);
        }
        
        req.flash("success", "Listing successfully deleted");
        res.redirect("/listings");
    }
};