const fs = require('fs');
const chalk = require('chalk');

function addNote(title, body) {
  const notes = loadNotes();
  const note = { title, body };
  const duplicatedNote = notes.find(note => note.title === title);

  if (!duplicatedNote) {
    notes.push(note);
    saveNotes(notes);
  } else {
    console.log(chalk.yellow.bold(`This note is duplicated: ${title}.\nNote no saved.`));
  }
}

function removeNote(title) {
  const notes = loadNotes();
  const remainingNotes = notes.filter(note => note.title !== title);

  if (remainingNotes.length !== notes.length) {
    saveNotes(remainingNotes);
  } else {
    console.log(chalk.yellow.bold(`There is not a note with title: ${title}.\nIt could have already been deleted before or never existed.`))
  }
}

function readNote(noteTitle) {
  const notes = loadNotes();
  const findNote = notes.find(note => note.title === noteTitle);

  if (findNote) {
    console.log(chalk.cyan.inverse.bold(`*** ${findNote.title} ***`));
    console.log(chalk.bold(`\n${findNote.body}\n`));
    console.log(chalk.cyan.inverse.bold(`*************************`));
  } else {
    console.log(chalk.red.inverse.bold(`There is not a note with the title: ${noteTitle}`))
  }
}

function saveNotes(notes) {
  const data = JSON.stringify(notes);
  fs.writeFileSync('notes.json', data);

  showNotes('Notes updated successfully.');
}

function showNotes(greeting = "*** Here are your notes: ***") {
  const note = loadNotes();

  console.log(chalk.cyan.inverse.bold(`${greeting}\n`));

  for (let i = 0; i < note.length; i++) {
    console.log(`${i + 1}.- ${note[i].title}: ${note[i].body}  `);
  }
}

function loadNotes() {
  try {
    const notes = fs.readFileSync('notes.json');
    const clearNotes = notes.toString();
    return JSON.parse(clearNotes);
  } catch (error) {
    console.log(chalk.white.bgRed.bold('There was an error retrieving notes: ', error));
    console.log(chalk.yellow.bold('A new empty file was created'));
    return [];
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  showNotes: showNotes,
  readNote: readNote
};

