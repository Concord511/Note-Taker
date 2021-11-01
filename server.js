const express = require('express');
const fs = require('fs');
const path = require('path');
const { db } = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    let notes = db;
    console.log(notes);
    let newNote = req.body;
    newNote.id = notes.length;
    notes.push(req.body);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});