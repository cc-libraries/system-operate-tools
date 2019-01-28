import { clipboard } from 'electron';
// import { Screen } from 'robotjs';
// import { Database } from 'sqlite3';
var Database = require('sqlite3');
var Screen = require('robotjs');

class Clipboard {

  constructor() {}
  readBuffer() {
    let availableFormats = clipboard.read('CBF_TEXT');
    // console.log("hello_chenchen: " + binding.hello());
    // console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);

    console.log(Database);
    console.log(Screen);
    var screenSize = Screen.getScreenSize();
    console.log(JSON.stringify(screenSize));

    return availableFormats;
  }
}

export default Clipboard;