const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("passport");
const { saveReturnTo } = require('../middleware/isLoggedin');
const userController = require('../controllers/users');

// GET signup form
router.get('/signup', userController.renderSignupForm);

// POST signup form
router.post('/signup', userController.signup);

// GET login form
router.get('/login', userController.renderLoginForm);

// POST login form
router.post('/login',
    saveReturnTo,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }),
    userController.login
);

// Logout
router.get('/logout', userController.logout);

module.exports = router;