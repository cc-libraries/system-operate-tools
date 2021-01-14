const { clipboard } = require('electron');

export function readText() {
    let result = {};
    result.content = clipboard.readText();
    result.time = +new Date();
    result.type = 0;
    result.id = hashCode(result.content);
    return result;
}

export function writeText(content) {
    clipboard.writeText(content);
}

function hashCode (str){
    var hash = 0;
    if(str.length == 0) return hash;

    for(let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash<<5)-hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
}