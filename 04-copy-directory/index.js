
const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'files');
const folderCopy = path.join(__dirname, 'files-copy');

async function folderCreate() {
    await fs.promises.mkdir(folderCopy, {recursive: true});
};

async function performance() {
    const itemFolderCopy = await fs.promises.readdir(folderCopy);
    const itemFolder = await fs.promises.readdir(folder);
    for (const file of itemFolderCopy) {
        fs.promises.unlink(path.join(__dirname, 'files-copy', file));
    };
    if (itemFolder) {
        for (const file of itemFolder) {
            await fs.promises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
        }
    };
};

folderCreate();
performance();