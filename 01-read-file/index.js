const fs = require('fs');
const path = require('node:path');

const newPath = path.join(__dirname, path.sep, 'text.txt');

const readStream = fs.createReadStream(newPath);

let result = '';
readStream.on('data', (c) => {
    result += c;
});

readStream.on('end', () => {
    console.log(result);
})