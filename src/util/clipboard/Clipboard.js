const {clipboard} = require('electron');

class Clipboard {
  static readBuffer() {
    let availableFormats = clipboard.read('CBF_TEXT');
    console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);  
    return availableFormats;
  }
}

export default Clipboard;