const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const newAnnouncement = new Announcement({
      title,
      message,
    });

    const savedAnnouncement = await newAnnouncement.save(); // Important

    res.status(201).json(savedAnnouncement); // Send saved data with createdAt
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ message: 'Failed to create announcement' });
  }
};
