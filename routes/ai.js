const express = require('express');
const router = express.Router();
const { getFeedback } = require('../controllers/aiController');

router.post('/feedback', getFeedback);

module.exports = router;