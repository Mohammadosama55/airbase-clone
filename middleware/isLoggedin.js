module.exports.isLoggedin=(req, res,next) => {
    if(!req.isAuthenticated()){
        req.flash("error", "You must be logged in to create a listing");
        return res.redirect("/login");  // Added return and fixed redirect path
    }
    next();
}