const fs = require('fs');
const fsProm = fs.promises;
const path = require('path');

const folderCopyProjectDist = path.join(__dirname, 'project-dist');

async function folderCreateProjectDist() {
    await fs.promises.mkdir(folderCopyProjectDist, {recursive: true}, (err) => {
        if (err) {
            return err;
        }
    });
};
folderCreateProjectDist()

async function makeIndexHtml() {
    let pathTemp = path.join(__dirname, path.sep, 'template.html');
    let tempRead = await fsProm.readFile(pathTemp, 'utf-8');
    let pathComp = path.join(__dirname, 'components');
    let comp = await fsProm.readdir(pathComp);
    for (let i = 0;i < comp.length;i++){
        let lastName = path.extname(comp[i]);
        if (lastName == '.html'){
            let firstName = path.parse(path.join(pathComp, comp[i])).name;
            let file = await fsProm.readFile(path.join(pathComp, comp[i]));
            tempRead = tempRead.replace(`{{${firstName}}}`, file);
        }
    }
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), tempRead, (err) => {
        if (err){ 
            throw err;
        }
    });    
};

async function makeStyle() {
    let pathStyles = path.join(__dirname, 'styles');
    let styles = await fsProm.readdir(pathStyles);
    let result = '';
    for (let i = 0;i < styles.length;i++){
        let lastName = path.extname(styles[i]);
        if (lastName == '.css'){
            let file = await fsProm.readFile(path.join(pathStyles, styles[i]));
            result = result + file;
        }
    }
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), result, (err) => {
        if (err){ 
            throw err;
        }
    });    
};

const folderCopyAssets = path.join(__dirname, 'project-dist/assets');
const folderCopyFonts = path.join(__dirname, 'project-dist/assets/fonts');
const folderCopyImg = path.join(__dirname, 'project-dist/assets/img');
const folderCopySvg = path.join(__dirname, 'project-dist/assets/svg');
const folderFonts = path.join(__dirname, 'assets/fonts');
const folderImg = path.join(__dirname, 'assets/img');
const folderSvg = path.join(__dirname, 'assets/svg');

async function folderCreateAssets() {
    await fs.promises.mkdir(folderCopyAssets, {recursive: true},);
};

async function folderCreateFonts() {
    await fs.promises.mkdir(folderCopyFonts, {recursive: true},);
};

async function folderCreateImg() {
    await fs.promises.mkdir(folderCopyImg, {recursive: true},);
};

async function folderCreateSvg() {
    await fs.promises.mkdir(folderCopySvg, {recursive: true},);
};

async function performanceFonts() {
    const itemFolderFonts = await fs.promises.readdir(folderFonts);
    const itemFolderCopyFonts = await fs.promises.readdir(folderCopyFonts);

    for (const file of itemFolderCopyFonts) {
        fs.promises.unlink(path.join(__dirname, 'project-dist/assets/fonts', file));
    };
    if (itemFolderFonts) {
        for (const file of itemFolderFonts) {
            await fs.promises.copyFile(path.join(__dirname, 'assets/fonts', file), path.join(__dirname, 'project-dist/assets/fonts', file));
        }
    };
};

async function performanceImg() {
    const itemFolderImg = await fs.promises.readdir(folderImg);
    const itemFolderCopyImg = await fs.promises.readdir(folderCopyImg);

    for (const file of itemFolderCopyImg) {
        fs.promises.unlink(path.join(__dirname, 'project-dist/assets/img', file));
    };
    if (itemFolderImg) {
        for (const file of itemFolderImg) {
            await fs.promises.copyFile(path.join(__dirname, 'assets/img', file), path.join(__dirname, 'project-dist/assets/img', file));
        }
    };
};

async function performanceSvg() {
    const itemFolderSvg = await fs.promises.readdir(folderSvg);
    const itemFolderCopySvg = await fs.promises.readdir(folderCopySvg);

    for (const file of itemFolderCopySvg) {
        fs.promises.unlink(path.join(__dirname, 'project-dist/assets/svg', file));
    };
    if (itemFolderSvg) {
        for (const file of itemFolderSvg) {
            await fs.promises.copyFile(path.join(__dirname, 'assets/svg', file), path.join(__dirname, 'project-dist/assets/svg', file));
        }
    };
};

folderCreateAssets();
folderCreateFonts();
folderCreateImg();
folderCreateSvg();
performanceFonts();
performanceImg();
performanceSvg();
makeIndexHtml();
makeStyle();