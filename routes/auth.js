const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController'); // Import controllers
const { body } = require('express-validator');

router.post(
    '/signup',
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    signup // Use signup controller
);

router.post('/login', login); // Use login controller

module.exports = router;