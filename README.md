# Airbase Clone

A full-stack Node.js web application that allows users to create, view, edit, and delete property listings. Built with Express, MongoDB, and EJS templating, this project demonstrates a simple CRUD workflow for a real estate or rental platform.

---

## Features

- **CRUD Listings:** Users can create, read, update, and delete property listings.
- **MongoDB Integration:** All listing data is stored in a MongoDB database.
- **EJS Templating:** Dynamic HTML rendering with EJS and ejs-mate layouts.
- **RESTful Routing:** Follows RESTful conventions for all listing operations.
- **Static Assets:** CSS and images served from the `public/` directory.
- **Method Override:** Supports HTTP verbs like PUT and DELETE from forms.

---

# Airbase Clone

Airbase Clone is a full-stack Node.js web application for managing property listings, inspired by Airbnb. It features user authentication, session management, flash messaging, and modular routing. The app uses Express, MongoDB (via Mongoose), EJS templating (with ejs-mate layouts), and Passport.js for authentication.

---

## Features

- **User Authentication:** Register, login, and session management with Passport.js and MongoDB.
- **CRUD Listings:** Create, view, update, and delete property listings.
- **Review System:** Add and manage reviews for listings.
- **Flash Messaging:** User feedback for actions (success/error) using connect-flash.
- **RESTful Routing:** Modular route files for listings, reviews, and users.
- **EJS Templating:** Dynamic HTML rendering with layouts and partials.
- **Session Support:** Persistent login and flash messages via express-session.
- **Error Handling:** Centralized error and 404 handling via custom middleware.
- **Static Assets:** CSS and JS served from the `public/` directory.
- **Environment Variables:** Use `.env` for secrets and configuration.

---

## Project Structure

```
airbase-clone/
├── app.js                  # Main Express application
├── models/
│   ├── listings.js         # Mongoose model for listings
│   └── user.js             # Mongoose model for users (Passport.js)
├── routes/
│   ├── listings.js         # Listings routes
│   ├── reviews.js          # Reviews routes
│   └── users.js            # User authentication routes
├── middleware/
│   └── errorHandler.js     # Error and 404 middleware
├── public/
│   └── css/
│       └── style.css       # Stylesheet
├── views/
│   ├── includes/
│   │   ├── footer.ejs      # Footer partial
│   │   └── navbar.ejs      # Navbar partial
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout
│   ├── listings/
│   │   ├── index.ejs       # List all listings
│   │   ├── new.ejs         # New listing form
│   │   ├── edit.ejs        # Edit listing form
│   │   └── show.ejs        # Show single listing
│   └── users/
│       ├── login.ejs       # Login form
│       └── signup.ejs      # Signup form
├── .env                    # Environment variables
├── package.json
└── ...
```

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Mohammadosama55/airbnbs-clone.git
   cd airbase-clone
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your `.env` file:
   ```env
   SECRET=your_session_secret
   # Add other environment variables as needed
   ```
4. Start MongoDB (if running locally):
   ```sh
   mongod
   ```
5. Start the application:
   ```sh
   node app.js
   # or
   npm start
   ```
6. Visit [http://localhost:8080](http://localhost:8080) in your browser.

---

## Usage
- **View Listings:** Go to `/listings` to see all properties.
- **Add Listing:** Click 'Add New Listing' (requires login) to create a property.
- **Edit/Delete:** Use the edit and delete buttons on each listing's page (requires login).
- **Register/Login:** Use `/signup` and `/login` routes for authentication.
- **Add Reviews:** Add reviews to listings (requires login).

---

## Key Files & Patterns
- `app.js`: Main server file, configures middleware, Passport, routes, and error handling.
- `models/user.js`: User schema with Passport-Local Mongoose plugin.
- `routes/`: Modular route files for listings, reviews, and users.
- `middleware/errorHandler.js`: Centralized error and 404 handling.
- `views/`: EJS templates for all pages and partials, using ejs-mate layouts.
- `public/css/style.css`: Main stylesheet.

---

## Customization
- Update the `Listing` schema in `models/listings.js` to add more fields.
- Modify EJS templates in `views/` for custom UI.
- Add more authentication strategies or features as needed.

---

## Author
Mohammad Osama
