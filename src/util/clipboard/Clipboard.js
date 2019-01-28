import { clipboard } from 'electron';
import { robot } from 'robotjs';

class Clipboard {

  constructor() {}
  readBuffer() {
    let availableFormats = clipboard.read('CBF_TEXT');
    // console.log("hello_chenchen: " + binding.hello());
    // console.log("hello_chenchen: " + JSON.stringify(availableFormats) + "length: " + availableFormats.length);

    var screenSize = robot.screen.getScreenSize();
    console.log(JSON.stringify(screenSize));

    return availableFormats;
  }
}

export default Clipboard;