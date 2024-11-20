const fs = require('fs');
const path = require('path');

const videoDirectory = './videos'; // Change this to your video directory path
const outputFile = './js/videolist.json';

function getVideoFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.mp4', '.webm', '.ogg', '.mov'].includes(ext);
    });
}

function generateVideoList() {
    const videoFiles = getVideoFiles(videoDirectory);
    const videos = videoFiles.map(file => {
        return {
            title: path.basename(file, path.extname(file)),
            url: `videos/${file}`
        };
    });

    const jsonContent = JSON.stringify({ videos }, null, 2);

    fs.writeFileSync(outputFile, jsonContent);
    console.log(`Video list JSON file generated at ${outputFile}`);
}

generateVideoList();