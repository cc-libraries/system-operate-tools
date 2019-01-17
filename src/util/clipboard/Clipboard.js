const {clipboard} = require('electron');
// const {binding} = require('./../../../lib/addons.node');

class Clipboard {
  static readBuffer() {
    let availableFormats = clipboard.read('CBF_TEXT');
    // console.log("hello_chenchen: " + binding.hello());
    console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);  
    return availableFormats;
  }
}

export default Clipboard;