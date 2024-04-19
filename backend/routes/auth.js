const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs"); //import
const fetchUser = require("../middleware/fetchUser");
var jwt = require("jsonwebtoken");

var JWT_SECRET = "anshull@12343asdf";

//Route 1: Create a user
router.post(
    "/createuser", [
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("email", "Enter a valid email").isEmail(),
        body("password", "password must be at least 5 characters").isLength({
            min: 5,
        }),
    ],
    async(req, res) => {
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
                email: req.body.email,
            })
            .then((user) => {
                // Send JSON response with the created user

                const data = {
                    user: {
                        id: user.id,
                    },
                };
                const authtoken = jwt.sign(data, JWT_SECRET);
                res.json(authtoken);
                console.log(authtoken);
                // res.json(user);
            })
            //cath errors
            .catch((err) => {
                // Handle any errors that occur during user creation
                console.error(err);
                res.status(500).json({ error: "please enter a unique email" });
            });
    }
);

//Route 2: Authenticate a user using: POST "/api/auth/login". USER login required

router.post(
    "/login", [
        body("email", "Enter a valid email").isEmail(),
        body("password", "password can not be blank").exists(),
    ],
    async(req, res) => {
        let success = false;
        //check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //destructuring email & password from db to match

        const { email, password } = req.body;
        try {
            let foundUser = await User.findOne({ email });
            if (!foundUser) {
                success = false;
                return res
                    .status(400)
                    .json({ success, error: "please try to login with correct credentials" });
            }

            // if user email is valid, compare password
            const passwordCompare = await bcrypt.compare(password, foundUser.password);
            if (!passwordCompare) {
                success = false;
                return res
                    .status(400)
                    .json({ success, error: "Please try to login with correct credentials" });
            }

            //if password match the db
            const data = {
                user: {
                    id: foundUser.id,
                }
            };
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authtoken });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured");
        }
    }
);

//ROUTE 3: get loggedin user details using: POST '/api/auth/getuser', Loggedin required

router.post("/getuser", fetchUser, async(req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // select all details of user except password
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

module.exports = router;