const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], (req, res) => {

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a user using the User model
    User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        .then(user => {
            // Send JSON response with the created user
            res.json(user);
        })
        .catch(err => {
            // Handle any errors that occur during user creation
            console.error(err);
            res.status(500).json({ error: 'please enter a unique email' });
        });
});

module.exports = router;