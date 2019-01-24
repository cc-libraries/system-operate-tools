// import {clipboard} from 'electron';
// import {ref} from 'ref';
// import {ffi} from 'ffi';
var ffi = require('ffi');
// import {$} from 'nodobjc';
// $.framework('Foundation');

class Clipboard {
  static readBuffer() {
    // let demo = "ccccc";
    // console.log($);
    // NSStrings and JavaScript Strings are distinct objects, you must create an
    // NSString from a JS String when an Objective-C class method requires one.
    // var string = $.NSString('stringWithUTF8String', 'Hello Objective-C World!');
    if (ffi.HAS_OBJC) {
      console.log("hello_chenchen: ");
      const lib = ffi.DynamicLibrary('/System/Library/Frameworks/Foundation.framework/Versions/Current/Foundation');
      console.log(lib);
    }
    // Print out the contents (toString() ends up calling [string description])
    // console.log(string);
    return "cccc";
  }
}

export default Clipboard;