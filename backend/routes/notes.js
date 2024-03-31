const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note.js");
const { body, validationResult } = require("express-validator"); // to valide notes

//ROUTE 1: Get All The Notes using: GET "/api/auth/getuser". Login required

router.get("/fetchallnotes", fetchUser, async(req, res) => {

    try {

        const notes = await Note.find({ user: req.user.id }); // find all notes of the user where user is equal to req.user.id: using fetchUser middleware
        res.json(notes);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});

//ROUTE 2: Add new notes using: POST "/api/auth/addnotes". Login required
router.post(
    "/addnote",
    fetchUser, [
        body("title", "Enter a valid title").isLength({ min: 3 }), //title of notes
        body("description", "Description must be at least 5 characters").isLength({
            min: 5,
        }),
        body("tag", "Enter a valid tag").optional().isString()
    ],
    async(req, res) => {

        try {
            //distructing data 
            const { title, description, tag } = req.body;

            //check for errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const notes = new Note({
                title,
                description,
                tag,
                user: req.user.id
            })
            const savedNote = await notes.save();

            res.json(savedNote);

        } catch (error) {
            console.log(error.message);
            res.status(500).send("some error occured");
        }
    }
);



module.exports = router;