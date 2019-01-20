import {clipboard} from 'electron';
var $ = require('nodobjc');
// import {$} from 'nodobjc';
$.framework('Foundation');

class Clipboard {
  static readBuffer() {
    let availableFormats = clipboard.readBuffer();
    console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);
    // let demo = "ccccc";
    // console.log($);
    // NSStrings and JavaScript Strings are distinct objects, you must create an
    // NSString from a JS String when an Objective-C class method requires one.
    var string = $.NSString('stringWithUTF8String', 'Hello Objective-C World!');

    // Print out the contents (toString() ends up calling [string description])
    console.log(string);
    return availableFormats;
  }
}

export default Clipboard;