const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { name, email, password, role, rollno } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === 'student') {
      user = new Student({ name, email, password: hashedPassword, rollno });
    } else if (role === 'teacher') {
      user = new Teacher({ name, email, password: hashedPassword });
    } else if (role === 'admin') {
      user = new Admin({ name, email, password: hashedPassword });
    } else {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await user.save();
    res.status(201).json({ message: 'Signup successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};
