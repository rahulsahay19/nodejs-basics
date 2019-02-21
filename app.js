const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');
const _ = require('lodash');
const yargs = require('yargs');
var user = os.userInfo();

const titleOptions = {
    describe: 'Title of note',
    demand:true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
            .command('add', 'Add a new note',{
                title: titleOptions,
                body: bodyOptions
            })
            .command('list', 'List all the notes')
            .command('read', 'Read a note', {
               title: titleOptions
            })
            .command('remove', 'Remove a note', {
                title:titleOptions
            })
            .help()
            .argv;

var command = argv._[0]; //or process.argv[2];

console.log(process.argv);
console.log(argv);

if(command === 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){
      console.log('Note Created');
  } else {
      console.log('Note title taken');
  }
} else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));
} else if(command === 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log('note found');
        notes.logNote(note);  
    } else {
        console.log('note not found');
    }
} else if(command === 'remove'){
   var noteRemoved = notes.remove(argv.title);
   var mesg = noteRemoved ? 'Note removed.' : 'Note not removed';
   console.log(mesg);
}
else {
    console.log('Command not recognized');
}