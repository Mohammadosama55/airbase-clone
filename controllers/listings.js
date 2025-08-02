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
   // Before
showListing: async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show.ejs", { listing });
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

 


createListing: async (req, res) => {
        let url = req.file.path;
        let filename= req.file.filename;
        
        const newListing = new Listing(req.body.listing);
        newListing.image={url, filename}; newListing.owner=req.user._id;
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
    // updateListing: async (req, res) => {
    //     const { id } = req.params;
    //     const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        
    //     if (!listing) {
    //         throw new ExpressError('Listing not found', 404);
    //     }
        
    //     req.flash("success", "Listing successfully updated");
    //     res.redirect(`/listings/${id}`);
    // },
    updateListing: async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    
    // Handle image update
    if (req.file) {
        // Delete old image if exists
        if (listing.image.filename) {
            await cloudinary.uploader.destroy(listing.image.filename); // If using Cloudinary
            // or fs.unlinkSync(listing.image.url) if using local storage
        }
        
        // Handle image update
  if (req.file) {
    // If schema expects string, just store the path
    listing.image = req.file.path; // or req.file.url if using Cloudinary
  } else if (req.body.listing.image) {
    // Keep existing image if no new file uploaded
    listing.image = req.body.listing.image;
  }
  
  // Update other fields
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
    }
    
    // Update other fields
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    // ... update other fields
    
    await listing.save();
    req.flash('success', 'Listing updated successfully');
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