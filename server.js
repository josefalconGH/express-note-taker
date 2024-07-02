// variables and constants
const { writeFileSync, readFileSync } = require('fs');
const express = require('express');
const crypto = require('crypto');
const path = require('path');
const app = express();

// middleware
const PORT = process.env.PORT || 3001;

// routes
app.use(express.static('public'));
app.use(express.json());

// GET / should return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
});

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
});

// GET /api/notes should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(readFileSync('./db/db.json', 'utf8'));
    res.json(JSON.parse(notes));
});

app.post('/api/notes', async (req, res) => {
    const { title, text } = req.body;

    // if no title or text, return 400
    if (!title || !text) {
        return res.status(400).json({ msg: 'Please include a title and text' });
    }

    // generate unique id for the note using crypto
    const noteID = crypto.randomBytes(16).toString('hex');

    // read the db.json file
    const notes = JSON.parse(readFileSync('./db/db.json', 'utf8')) || [];

    // push the new note to the notes array
    notes.push({ id: noteID, title, text });

    // write the new note to the db.json file
    writeFileSync('./db/db.json', JSON.stringify(notes, null, 4));

    // return the new note
    res.json({ id: noteID, title, text });
});