const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, 'styles');

(function newFile(){
    const newPath = path.join(__dirname, path.sep, 'project-dist', path.sep, 'bundle.css');
    fs.open(newPath, 'w', (err) => {
        if (err){
            throw err;
        }
    });
})();

fs.readdir(styles, function(err, items) {
    if (err) {
        return err;
    }
    let result = '';
    for (let i = 0; i < items.length; i++){
        if (path.extname(items[i]) == '.css'){
            let readStream = fs.createReadStream(path.join(__dirname, path.sep, 'styles', path.sep, items[i]));
            readStream.on('data', (c) => {
                result += c;
            });
            readStream.on('end', () => {
                let bandlePath = path.join(__dirname, path.sep, 'project-dist', path.sep, 'bundle.css');
                fs.appendFile(bandlePath, result, function(error){
                    if (error){
                        throw error;
                    } 
                });
            })
        }        
    }
});