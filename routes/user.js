const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("passport");

// GET signup form (correct)
router.get('/signup', (req, res) => {
    res.render('users/signup'); 
});

// POST signup form (correct)
router.post('/signup', async (req, res, next) => {  
       try{ const { username, email, password } = req.body;
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

// GET login form (correct)
router.get('/login', (req, res) => {
    res.render('users/login'); 
});

// POST login (fixed)
router.post("/login",
    passport.authenticate('local', {
        failureRedirect: "/login", 
        failureFlash: true 
    }),
    (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect('/listings');
    }
);


//  logout 
router.get("/logout",(req, res, next) =>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success", "you are loggrd out");
        res.redirect('/listings');
    })
}) 
    
  


module.exports = router;