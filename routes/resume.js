const express = require("express");
const router = express.Router();
const { createResume, getUserResumes, downloadResume, getResumeById, updateResume } = require("../controllers/resumeController");
const auth = require("../middleware/auth"); // Correct path to middleware

// Create Resume
router.post("/", auth, createResume);

// Get User's Resumes
router.get("/", auth, getUserResumes);

// Download Resume
router.get("/:id/download", auth, downloadResume);

// Get Resume by ID
router.get("/:id", auth, getResumeById);

// Update Resume
router.put('/:id', auth, updateResume);

module.exports = router;