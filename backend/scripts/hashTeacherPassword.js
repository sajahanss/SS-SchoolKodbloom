const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Teacher = require('../models/Teacher');

mongoose.connect('mongodb://127.0.0.1:27017/YOUR_DB_NAME');

async function hashTeacherPasswords() {
  const teachers = await Teacher.find();

  for (const t of teachers) {
    if (!t.password.startsWith('$2b$')) {
      const hashed = await bcrypt.hash(t.password, 10);
      t.password = hashed;
      await t.save();
      console.log(`🔐 Updated password for ${t.email}`);
    }
  }

  console.log("✅ Passwords updated");
  mongoose.disconnect();
}

hashTeacherPasswords();
