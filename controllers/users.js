const User = require('../models/user');

module.exports = {
    // Render signup form
    renderSignupForm: (req, res) => {
        res.render('users/signup');
    },

    // Handle signup submission
    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const newUser = new User({ email, username });
            const registeredUser = await User.register(newUser, password);
            
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("success", "Welcome to Wanderlust!");
                res.redirect('/listings');
            });
        } catch (error) {
            req.flash('error', error.message);
            res.redirect('/signup');
        }
    },

    // Render login form
    renderLoginForm: (req, res) => {
        res.render('users/login');
    },

    // Handle login
    login: (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        const redirectUrl = res.locals.returnTo || '/listings';
        res.redirect(redirectUrl);
    },

    // Handle logout
    logout: (req, res) => {
        req.logout((err) => {
            if (err) return next(err);
            req.flash("success", "You are logged out");
            res.redirect('/listings');
        });
    }
};