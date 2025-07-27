const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const engine = require('ejs-mate');
const listingsRouter = require('./routes/listings');
const reviewsRouter = require('./routes/reviews');
const { errorHandler, notFound } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "/public")));

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/airbase-clone')
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);

// 404 Handler
app.use(notFound);

// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});