const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,  // Fixed from 'require' to 'required'
        unique: true    // Recommended to prevent duplicate emails
    },
    username: {         // Added username field (required by passport-local-mongoose)
        type: String,
        unique: true    // Recommended
    }
});

// Plugin must be added BEFORE creating the model
userSchema.plugin(passportLocalMongoose);  // Fixed - apply to schema, not User

// Then create and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;