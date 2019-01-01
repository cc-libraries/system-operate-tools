const {clipboard} = require('electron');
var $ = require('nodobjc');

class Clipboard {
  static readBuffer() {
    let availableFormats = clipboard.read('CBF_TEXT');
    // console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);
    let demo = "ccccc";
    // console.log($.NSString("stringWithUTF8String", demo));
    return availableFormats;
  }
}

export default Clipboard;