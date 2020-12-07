const { clipboard } = require('electron');

export function readText() {
    // console.log('Clipboard readText');
    let availableFormats = clipboard.readText();
    // console.log(availableFormats);
    return availableFormats;
}