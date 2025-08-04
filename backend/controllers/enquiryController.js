const Enquiry = require("../models/Enquiry");

// @desc    Handle enquiry form submission
// @route   POST /api/enquiry
// @access  Public
exports.submitEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const enquiry = new Enquiry({ name, email, phone, message });
    await enquiry.save();

    res.status(201).json({ message: "Enquiry submitted successfully" });
  } catch (error) {
    console.error("Error submitting enquiry:", error);
    res.status(500).json({ error: "Failed to submit enquiry" });
  }
};
