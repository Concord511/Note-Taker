const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const db = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
    let notes = db;
    let newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    res.json();
});

router.delete('/notes/:id', (req, res) => {
    let notes = db;
    let index = req.params.id;
    notes.splice(index, 1);
    notes.forEach(element => {
        element.id = notes.indexOf(element);
    });
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notes, null, 2)
    );
    res.json();
});

module.exports = router;