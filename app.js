const noteActions = require('./notes');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.command({
  command: 'add',
  describe: 'Add new note given the title and body of the note.',
  builder: {
    title: {
      description: 'Title of the note',
      demandOption: true,
      type: 'string'
    },
    body: {
      description: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    noteActions.addNote(argv.title, argv.body);
  }
})

yargs.command({
  command: 'remove',
  describe: 'Remove one note given the title of the note.',
  builder: {
    title: {
      description: 'Title of the note to remove.',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    noteActions.removeNote(argv.title);
  }
})

yargs.command({
  command: 'list-notes',
  describe: 'Show your actual notes',
  handler: function () {
    noteActions.showNotes();
  }
});

yargs.command({
  command: 'read',
  describe: 'Read Notes',
  handler: function () {
    console.log('Reading notes');
  }
});

yargs.parse();
