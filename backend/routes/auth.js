const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); //import 

var JWT_SECRET = "anshull@12343asdf";

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async(req, res) => {

    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //check if the user with the emial already exits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return req.status(400).json({ error: "User already exits" });
    }

    //store hash in password database 
    var salt = await bcrypt.genSalt(10);
    var secPass = await bcrypt.hash(req.body.password, salt);

    // Create a user using the User model
    user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })
        .then(user => {
            // Send JSON response with the created user

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json(authtoken);
            // res.json(user);
        })
        //cath errors
        .catch(err => {
            // Handle any errors that occur during user creation
            console.error(err);
            res.status(500).json({ error: 'please enter a unique email' });
        });
});

module.exports = router;