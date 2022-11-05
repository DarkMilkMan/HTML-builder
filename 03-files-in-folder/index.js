const fs = require('fs');
const path = require('path');
const newPath = path.join(__dirname, 'secret-folder');

fs.readdir(newPath, function(err, items) {
    if (err){
        throw err;
    }
    for (var i=0; i<items.length;  i++) { 
        let item = items[i];
        let newPathItem = path.join(__dirname, 'secret-folder', path.sep, items[i]);        
        fs.stat(newPathItem, (err, stats) => {    
            if (err){
                throw err;
            }               
            if (stats.isFile()){
                let itemInfo = item.split('.');
                let itemSize = (stats.size / 1000) + 'kb';
                console.log(itemInfo[0] + ' - ' + itemInfo[1] + ' - ' + itemSize);
            }
        })
    }
});