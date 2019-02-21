const fs = require('fs');

var originalNote = {
    title: 'Hello World',
    body: 'Actual body'
};

//Writing to file
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

//Reading from file
var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note);
console.log(note.title);