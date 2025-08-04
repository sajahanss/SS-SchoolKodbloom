const TimeTable = require('../models/TimeTable');

// ✅ Add Single Time Table Entry (Admin)
exports.addTimeTable = async (req, res) => {
  try {
    const { className, section, day, period, subject, teacherName } = req.body;

    const newEntry = new TimeTable({
      className,
      section,
      day,
      period,
      subject,
      teacherName,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Time table entry added successfully' });
  } catch (error) {
    console.error('Add Error:', error);
    res.status(500).json({ error: 'Failed to add time table entry' });
  }
};

// ✅ Get Time Table for a Student (by Class & Section)
exports.getTimeTableByClassSection = async (req, res) => {
  try {
    const { className, section } = req.params;

    const entries = await TimeTable.find({ className, section });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Student Timetable Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch student time table' });
  }
};

// ✅ Get Time Table for a Teacher (by Teacher Name)
exports.getTimeTableByTeacher = async (req, res) => {
  try {
    const { teacherName } = req.params;

    const entries = await TimeTable.find({ teacherName });
    res.status(200).json(entries);
  } catch (error) {
    console.error('Teacher Timetable Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch teacher time table' });
  }
};

// ✅ Get All Time Table Entries (Admin)
exports.getAllTimetables = async (req, res) => {
  try {
    const allEntries = await TimeTable.find();
    res.status(200).json(allEntries);
  } catch (error) {
    console.error('Fetch All Timetable Error:', error);
    res.status(500).json({ error: 'Failed to fetch all time table entries' });
  }
};

// ✅ Bulk Upload Time Table Entries from Excel
exports.bulkUploadTimeTable = async (req, res) => {
  try {
    const { timetable } = req.body;

    if (!Array.isArray(timetable) || timetable.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty timetable data' });
    }

    // Validate required fields in each entry
    const requiredFields = ['className', 'section', 'day', 'period', 'subject', 'teacherName'];

    for (const entry of timetable) {
      for (const field of requiredFields) {
        if (!entry[field]) {
          return res.status(400).json({ message: `Missing field: ${field}` });
        }
      }
    }

    // ✅ Delete all existing timetable data
    await TimeTable.deleteMany({});

    // ✅ Insert new uploaded data
    await TimeTable.insertMany(timetable);

    res.status(201).json({ message: '✅ Timetable replaced successfully!' });
  } catch (error) {
    console.error('Bulk Upload Error:', error);
    res.status(500).json({ message: '❌ Server error during bulk upload' });
  }
};
