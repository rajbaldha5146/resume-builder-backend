const Resume = require('../models/Resume'); // Adjust path if needed

const createResume = async (req, res) => {
    const { templateId, sections } = req.body;

    try {
        const resume = new Resume({ userId: req.user.id, templateId, sections });
        await resume.save();
        res.json(resume);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user.id });
        res.json(resumes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const downloadResume = async (req, res) => {
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
        const pdfPath = ""; // Replace with your actual pdf path
        res.download(pdfPath); // You'll need to implement the actual PDF generation
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

const getResumeById = async (req, res) => {
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
};

const updateResume = async (req, res) => {
    try {
        const { templateId, sections } = req.body;

        let resume = await Resume.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { templateId, sections },
            { new: true, runValidators: true }
        );

        if (!resume) {
            return res.status(404).json({ msg: 'Resume not found' });
        }

        res.json(resume);
    } catch (err) {
        console.error('Error updating resume:', err.message);
        res.status(500).send('Server error');
    }
};


module.exports = { createResume, getUserResumes, downloadResume, getResumeById, updateResume };