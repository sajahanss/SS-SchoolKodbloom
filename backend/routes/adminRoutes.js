// 📁 routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


// ✅ Import controller functions
const { signup, login } = require('../controllers/adminController');

// ✅ Multer configuration for photo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// ✅ Signup route with photo upload
router.post('/signup', upload.single('photo'), (req, res) => {
  // Attach uploaded file path as 'photo' in body
  if (req.file) {
    req.body.photo = `/uploads/${req.file.filename}`;
  }
  signup(req, res); // call signup handler
});




// ✅ Login route
router.post('/login', login);

module.exports = router;
