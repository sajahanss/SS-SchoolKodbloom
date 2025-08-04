// controllers/adminController.js
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  try {
    const { name, email, password, role, photo } = req.body;

    if (!name || !email || !password || !role || !photo) {
      return res.status(400).json({ message: 'All fields are required including photo' });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
      role,
      photo,
    });

    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', admin });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

const login = async (req, res) => {
  console.log("📁 Admin routes loaded") ;
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        photo: admin.photo,
        role: admin.role,
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

module.exports = { signup, login };
