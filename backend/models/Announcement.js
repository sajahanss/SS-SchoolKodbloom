const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true } // ✅ adds createdAt & updatedAt automatically
);

module.exports = mongoose.model('Announcement', announcementSchema);
