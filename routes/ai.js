const express = require('express');
const router = express.Router();
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Hugging Face API endpoint
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/';
const MODEL_NAME = 'facebook/bart-large-cnn'; // Better for summarization

async function fetchAIResponse(content, retries = 3, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(
                `${HUGGING_FACE_API_URL}${MODEL_NAME}`,
                { inputs: content },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (response.data && response.data[0]?.summary_text) {
                return response.data[0].summary_text;
            }
            throw new Error("Unexpected response format from Hugging Face API");
        } catch (err) {
            console.error(`Attempt ${i + 1} failed: ${err.message}`);
            if (i === retries - 1) throw err; // Final attempt failed
            await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retry
        }
    }
}

// @route   POST /api/ai/feedback
// @desc    Get AI feedback for resume content
// @access  Private
router.post('/feedback', async (req, res) => {
    if (!req.body.content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const feedback = await fetchAIResponse(req.body.content);
        res.json({ feedback });
    } catch (err) {
        console.error('Hugging Face API error:', err.response?.data || err.message);
        res.status(503).json({ error: 'AI service is currently unavailable. Please try again later.' });
    }
});

module.exports = router;
