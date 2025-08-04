const mongoose = require("mongoose");

const holidaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model("Holiday", holidaySchema);
