const { clipboard } = require('electron');

class Clipboard {
  static readBuffer(value) {
    console.log("Clipboard readBuffer: " + value);
    let availableFormats = clipboard.readText();
    console.log(availableFormats);
    return availableFormats;
  }
}

export default Clipboard;