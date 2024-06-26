const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note.js");
const { body, validationResult } = require("express-validator");

// Get All The Notes: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async(req, res) => {
    try {
        const notes = await Note.find({
            user: req.user.id,
        });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

// Add new note: POST "/api/notes/addnote". Login required
router.post(
    "/addnote",
    fetchUser, [
        body("title", "Enter a valid title").isLength({
            min: 3,
        }),
        body("description", "Description must be at least 5 characters").isLength({
            min: 5,
        }),
        body("tag", "Enter a valid tag").optional().isString(),
    ],
    async(req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({
                error: "Internal Server Error",
            });
        }
    }
);

// Update existing note: PUT "/api/notes/updatenote/:id". Login required
router.put("/updatenote/:id", fetchUser, async(req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                error: "Note not found",
            });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: "Not Authorized",
            });
        }
        note = await Note.findByIdAndUpdate(
            req.params.id, {
                $set: newNote,
            }, {
                new: true,
            }
        );
        res.json({
            note,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

// ROUTE 4: Delete existing note: DELETE "/api/notes/deletenote/:id". Login required
router.delete("/deletenote/:id", fetchUser, async(req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({
                error: "Note not found",
            });
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({
                error: "Not Authorized",
            });
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({
            message: "Note deleted successfully",
            note,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

module.exports = router;