const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("passport");
const { isLoggedIn, saveReturnTo } = require('../middleware/isLoggedin');

// GET signup form
router.get('/signup', (req, res) => {
    res.render('users/signup'); 
});

// POST signup form
router.post('/signup', async (req, res, next) => {  
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password); 
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect('/listings');
        });
    } catch (error) {        
        req.flash('error', error.message);
        res.redirect('/signup');
    }
});

// GET login form - ✅ CORRECT: No saveReturnTo needed
router.get('/login', (req, res) => {
    res.render('users/login'); 
});

// POST login - ✅ CORRECT: Fixed redirect logic
router.post("/login",saveReturnTo,
    passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), 
    (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect(res.locals.returnTo);
    }
);

// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "You are logged out");
        res.redirect('/listings');
    });
}); 
    
module.exports = router;