const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const upload = require("../utils/upload");

router.get("/", subjectController.getAllSubjects);
router.post("/add", upload.single("subjectImage"), subjectController.addSubject);
router.delete("/:id", subjectController.deleteSubject); // ✅ important!
router.get("/teacher/:teacherId", subjectController.getSubjectsByTeacher);
router.get("/student/:className/:section", subjectController.getSubjectsByClassSection);

module.exports = router;
