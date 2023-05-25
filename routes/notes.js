const notes = require('express').Router();
const { readAndAppend, writeToFile, readFromFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note has been added.');
  } else {
    res.status(400).json('Error adding note.');
  }
});

notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteId);
      writeToFile('./db/db.json', result);
      res.json(`${noteId} deleted.`);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json('Error deleting note.');
    });
});

module.exports = notes;
