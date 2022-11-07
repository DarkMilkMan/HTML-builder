const fs = require('fs');
const fsProm = fs.promises;
const path = require('path');

async function makeStyle() {
    let pathStyles = path.join(__dirname, path.sep, 'styles');
    let styles = await fsProm.readdir(pathStyles);
    let result = '';
    for (let i = 0;i < styles.length;i++){
        let lastName = path.extname(styles[i]);
        if (lastName == '.css'){
            let file = await fsProm.readFile(path.join(pathStyles, styles[i]));
            result = result + file;
        }
    }
    fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), result, (err) => {
        if (err){ 
            throw err;
        }
    });    
};

makeStyle();