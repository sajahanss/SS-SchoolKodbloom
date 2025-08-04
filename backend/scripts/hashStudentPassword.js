// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Student = require('../models/Student');

// Debug: Check if MONGO_URI is loaded
console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is undefined. Please check your .env file and its location.");
  process.exit(1);  // Exit if no DB connection string
}

mongoose.connect(process.env.MONGO_URI, {
  // These options are now default in mongoose 6+, so you can omit them
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Fetch all students
    const students = await Student.find({});

    if (students.length === 0) {
      console.log("📋 No students found in the database.");
      process.exit(0);
    }

    console.log("📋 All students:", students.map(s => ({ name: s.name, rollno: s.rollno })));

    // Hash password for each student if not already hashed
    for (const student of students) {
      if (!student.password.startsWith('$2b$')) { // Check bcrypt hash prefix
        const hashedPassword = await bcrypt.hash(student.password, 10);
        student.password = hashedPassword;
        await student.save();
        console.log(`🔐 Hashed password for ${student.name} (${student.rollno})`);
      }
    }

    console.log("✅ All student passwords hashed successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
