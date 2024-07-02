// variables and constants
const { writeFileSync, readFileSync } = require('fs');
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();

// middleware
const PORT = process.env.PORT || 3050;

// routes
app.use(express.static('public'));
app.use(express.json());

// GET / should return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

// GET /notes should return the notes.html file with the notes from the db.json file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
});

// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    try {
        const notes = JSON.parse(readFileSync('./db/db.json', 'utf8'));
        res.json(notes);
    } catch (error) {
        res.status(500).send('Error reading notes');
    }
});

// GET request to display the note when the not is clicked
app.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Please include an id');
    }

    try {
        const notes = JSON.parse(readFileSync('./db/db.json', 'utf8'));
        const note = notes.find(note => note.noteID === id);

        res.json(note);
    } catch (error) {
        res.status(500).send('Error reading note');
    }
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', async (req, res) => {
    const { title, text } = req.body;

    if (!title || !text) {
        return res.status(400).send('Please include a title and text');
    }

    const noteID = crypto.randomBytes(16).toString('hex');

    try {
        const notes = JSON.parse(readFileSync('./db/db.json', 'utf8')) || [];

        const newNote = { title, text, noteID };
        notes.push(newNote);

        writeFileSync('./db/db.json', JSON.stringify(notes, null, 4));

        res.json(newNote);
    } catch (error) {
        res.status(500).send('Error saving note');
    }
});

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send('Please include an id');
    }

    try {
        const notes = JSON.parse(readFileSync('./db/db.json', 'utf8')) || [];

        const newNotes = notes.filter(note => note.noteID !== id);

        writeFileSync('./db/db.json', JSON.stringify(newNotes, null, 4));
        res.json('Note deleted');
    } catch (error) {
        res.status(500).send('Error deleting note');
    }
});

// listen
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
