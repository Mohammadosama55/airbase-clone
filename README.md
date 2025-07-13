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

## Project Structure

```
airbase-clone/
├── app.js                  # Main Express application
├── models/
│   └── listings.js         # Mongoose model for listings
├── public/
│   └── css/
│       └── style.css       # Stylesheet
├── views/
│   ├── includes/
│   │   ├── footer.ejs      # Footer partial
│   │   └── navbar.ejs      # Navbar partial
│   ├── layouts/
│   │   └── boilerplate.ejs # Main layout
│   └── listings/
│       ├── index.ejs       # List all listings
│       ├── new.ejs         # New listing form
│       ├── edit.ejs        # Edit listing form
│       └── show.ejs        # Show single listing
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
   git clone https://github.com/Mohammadosama55/airbase-clone.git
   cd airbase-clone
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start MongoDB (if running locally):
   ```sh
   mongod
   ```
4. Start the application:
   ```sh
   node app.js
   # or
   npm start
   ```
5. Visit [http://localhost:8080](http://localhost:8080) in your browser.

---

## Usage
- **View Listings:** Go to `/listings` to see all properties.
- **Add Listing:** Click 'Add New Listing' to create a property.
- **Edit/Delete:** Use the edit and delete buttons on each listing's page.

---

## Key Files
- `app.js`: Main server file, sets up routes and middleware.
- `models/listings.js`: Mongoose schema for listings.
- `views/`: EJS templates for all pages and partials.
- `public/css/style.css`: Main stylesheet.

---

## Customization
- Update the `Listing` schema in `models/listings.js` to add more fields.
- Modify EJS templates in `views/` for custom UI.
- Add authentication, image uploads, or other features as needed.

---


## Author
Mohammad Osama
