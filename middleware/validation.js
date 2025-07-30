const { listingSchema, reviewSchema } = require('../schema');

// Validation middleware for listings
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errMsg = error.details.map(el => el.message).join(',');
     console.log(errMsg);
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

module.exports = {
  validateListing,
  validateReview
};