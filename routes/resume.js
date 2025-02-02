const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");
const auth = require("../middleware/auth"); // Correct import path

// Create Resume
router.post("/", auth, async (req, res) => {
  const { templateId, sections } = req.body;

  try {
    const resume = new Resume({ userId: req.user.id, templateId, sections });
    await resume.save();
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get User's Resumes
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.json(resumes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Add this route to your backend/routes/resume.js
router.get("/:id/download", auth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    // Generate and send PDF
    // This implementation will depend on your PDF generation strategy
    res.download(pdfPath); // You'll need to implement the actual PDF generation
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

  // In backend/routes/resume.js
  router.get("/", auth, async (req, res) => {
    try {
      const resumes = await Resume.find({ userId: req.user.id });
      res.json(resumes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
});

// In backend/routes/resume.js
router.get("/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ msg: "Resume not found" });
    }
    res.json(resume);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a resume by ID
router.put('/:id', auth, async (req, res) => {
  try {
      const { templateId, sections } = req.body;

      // Find and update the resume only if it belongs to the logged-in user
      let resume = await Resume.findOneAndUpdate(
          { _id: req.params.id, userId: req.user.id }, // Match resume ID & user
          { templateId, sections },
          { new: true, runValidators: true } // Return updated resume
      );

      if (!resume) {
          return res.status(404).json({ msg: 'Resume not found' });
      }

      res.json(resume);
  } catch (err) {
      console.error('Error updating resume:', err.message);
      res.status(500).send('Server error');
  }
});

module.exports = router;
