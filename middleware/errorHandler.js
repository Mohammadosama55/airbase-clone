// Custom Error Class
class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const { statusCode = 500, message = 'Something went wrong!' } = err;
    
    // Render error page with layout support
    res.status(statusCode).render('error', {
        title: 'Error',
        statusCode,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
};

// 404 Handler
const notFound = (req, res, next) => {
    res.status(404).render('404', {
        title: 'Page Not Found'
    });
};

module.exports = {
    ExpressError,
    errorHandler,
    notFound
};