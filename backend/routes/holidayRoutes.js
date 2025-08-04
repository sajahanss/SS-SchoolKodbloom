const express = require("express");
const router = express.Router();
const {
  addHoliday,
  getHolidays,
  deleteHoliday,
} = require("../controllers/holidayController");

router.post("/add", addHoliday);
router.get("/", getHolidays);
router.delete("/delete/:id", deleteHoliday);

module.exports = router;
