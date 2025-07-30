const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required().trim().min(1).max(100),
    description: Joi.string().required().trim().min(1).max(1000),
    image: Joi.string().uri().optional().allow('').allow(null).default("https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"),
    price: Joi.number().required().min(0),
    location: Joi.string().required().trim().min(1).max(100),
    country: Joi.string().required().trim().min(1).max(50)
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required().trim().min(1).max(500)
  }).required()
});
