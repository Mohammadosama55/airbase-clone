module.exports.isLoggedin = (req, res, next) => {
    if(!req.isAuthenticated()){
        // Save the URL they were trying to access
        req.session.returnTo = req.originalUrl;
        console.log(req.session.returnTo);
        req.flash("error", "You must be logged in to access this page");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveReturnTo = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};