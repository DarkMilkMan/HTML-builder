const fs = require('fs');
const path = require('path');
const readline = require('readline');
const input = process.stdin;
const output = process.stdout;
const rl = readline.createInterface({ input, output });
const newPath = path.join(__dirname, path.sep, 'text.txt');

fs.open(newPath, 'w', (err) => {
    if (err){
        throw err;
    }
    console.log('-----ВВЕДИТЕ ТЕКСТ-----');
});

rl.on('line', function (chunk) {
    let exit = chunk.toUpperCase();
    if (exit == 'EXIT'){
        console.log('-----ВВОД ЗАВЕРШЁН-----');
        rl.pause();
    }
    fs.appendFile(newPath, chunk + '\n', function(error){
        if (error){
            throw error;
        } 
    });
})

rl.on('SIGINT', () => {
    console.log('-----ВВОД ЗАВЕРШЁН-----');
    rl.pause();
});