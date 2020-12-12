const { clipboard } = require('electron');

export function readText() {
    let result = {};
    result.content = clipboard.readText();
    result.time = +new Date();
    // console.log(availableFormats);
    return result;
}