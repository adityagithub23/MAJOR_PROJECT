# 🌍 WanderLust - Airbnb-Inspired Full-Stack Web App

WanderLust is a full-featured web application inspired by Airbnb, built using the **MERN** stack (MongoDB, Express, Node.js) with **EJS** as the templating engine. It allows users to register, list vacation spots, upload images, leave reviews, and visualize locations with interactive maps.

## 🚀 Live Demo

👉 [Explore WanderLust](https://major-project-tz32.onrender.com/listings)

---

## 🛠️ Tech Stack & Tools

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication & Security:**
- Passport.js
- Passport-Local
- Passport-Local-Mongoose
- bcrypt

**Frontend Rendering:**
- EJS Templating
- Bootstrap (optional for styling)

**Features & Utilities:**
- Cloudinary (image upload)
- Mapbox (interactive maps)
- Multer (file uploads)
- Joi (data validation)
- Connect-Mongo (session storage)
- Express-Session
- Flash Messages
- Dotenv
- Cookie-Parser

---

## ✨ Features

- 🧑‍💻 **User Authentication** — Register/Login/Logout
- 🗺️ **Interactive Maps** — View listings on Mapbox-powered maps
- 📷 **Image Upload** — Upload and manage listing images via Cloudinary
- ✍️ **CRUD Listings** — Create, edit, and delete travel destinations
- 📝 **Reviews** — Add and delete reviews on listings
- 🧾 **Account Management** — Update account details and passwords
- 🔐 **Secure Sessions** — Sessions stored securely using MongoDB

---

## 📁 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/adityagithub23/MAJOR_PROJECT.git
   cd MAJOR_PROJECT
   
# Install Dependencies:**

  npm install

# Create a .env File in the root directory and add the following:

# (You can use a text editor like nano, vim, or VS Code)
  touch .env
  
Then, inside your .env file, paste the following:
  
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_KEY=your_cloud_key
  CLOUDINARY_SECRET=your_cloud_secret
  MAPBOX_TOKEN=your_mapbox_token
  DB_URL=mongodb://localhost:27017/wanderlust
  SECRET=session_secret

# Run the App
npm start

# View on Browser
# Open this URL in your browser:
http://localhost:3000

