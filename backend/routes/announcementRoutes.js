const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// POST: Add new announcement
router.post('/add', async (req, res) => {
  try {
    const { title, message } = req.body;
    const announcement = new Announcement({ title, message });
    await announcement.save();
    res.status(201).json({ message: 'Announcement added', announcement });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET: Fetch all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching announcements' });
  }
});
// ✅ DELETE announcement by ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement' });
  }
});

module.exports = router;
