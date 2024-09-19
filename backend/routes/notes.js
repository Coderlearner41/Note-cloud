const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser.js");
const Note = require("../models/Note.js");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
      const notes = await Note.find({ user: req.user.id });
      res.json(notes)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});


//ROutes 2: Post add a new note using:Get /api/notes/   login required
router.post('/addnote', fetchUser, [
  body('title', 'Enter a valid title').isLength({ min: 3 }),
  body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
  const { title, description, tag } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const note = new Note({
    title,
    description,
    tag,
    user: req.user.id, // Ensure this field matches your schema
  });

  try {
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    console.error("Error saving note:", err); // Detailed error logging
    res.status(500).json({ error: err.message });
  }
});

 // Router 3 : update an existing Note using: Put "app/auth/updatenote". Login Required
 router.put('/updatenote/:id', fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;
  
  // create newNote
  const newNote = {};
  if (title) newNote.title = title;
  if (description) newNote.description = description;
  if (tag) newNote.tag = tag;

  try {
    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Note not found');
    }

    // Check if the user has access to the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Access denied');
    }

    // Update the note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).json({ error: err.message });
  }
})
  // ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
      // Find the note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      // Allow deletion only if user owns this Note
      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})
module.exports = router;
