const Holiday = require("../models/Holiday");

// ➕ Add Holiday
const addHoliday = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const holiday = new Holiday({ title, date, description });
    await holiday.save();
    res.status(201).json({ message: "Holiday added successfully" });
  } catch (err) {
    console.error("Add holiday error:", err.message);
    res.status(500).json({ error: "Failed to add holiday" });
  }
};

// 📥 Get All Holidays
const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find().sort({ date: 1 });
    res.json(holidays);
  } catch (err) {
    console.error("Get holidays error:", err.message);
    res.status(500).json({ error: "Failed to get holidays" });
  }
};

// 🗑️ Delete Holiday
const deleteHoliday = async (req, res) => {
  try {
    const deleted = await Holiday.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Holiday not found" });
    }
    res.status(200).json({ message: "Holiday deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: "Failed to delete holiday" });
  }
};

module.exports = {
  addHoliday,
  getHolidays,
  deleteHoliday,
};
