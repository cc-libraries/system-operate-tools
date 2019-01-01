const {clipboard} = require('electron');
var $ = require('objc');

class Clipboard {
  static readBuffer() {
    let availableFormats = clipboard.readBuffer();
    console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);
    // let demo = "ccccc";
    // console.log($.NSString("stringWithUTF8String", demo));
    return availableFormats;
  }
}

export default Clipboard;