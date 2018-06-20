const fs = require('fs');

var fetchNotes = () => {

  try{
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  }catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};


var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
var duplicateNotes = notes.filter( note => note.title === title);

if (duplicateNotes.length === 0){
  notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  // console.log('Getting all notes');
  return fetchNotes();
};

var getNote = (title) => {
  // console.log("Getting note with Title: %s",title);
  var notes = fetchNotes();
  var retrievedNote = notes.filter(note => note.title === title);
  return retrievedNote[0];
};

var removeNote = (title) => {
  console.log("Removing note with Title: %s", title);
  var notes = fetchNotes();
  //filteredNotes get filled with all of the notes whose titles do not match the one passed to the function
  var filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length
};

var logNote = note => {
  console.log("----------");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote,
};
