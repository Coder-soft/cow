const fs = require('fs');
const path = require('path');

// Path to the music folder
const musicFolder = path.join(__dirname, 'music');

// Function to get all MP3 files from the folder
function getMusicFiles() {
  const files = fs.readdirSync(musicFolder);
  const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');
  return mp3Files.map(file => ({
    name: file,
    path: `music/${file}`
  }));
}

// Write the list of music files to a JS file
function generateMusicFileList() {
  const musicFiles = getMusicFiles();
  const jsContent = `const musicFiles = ${JSON.stringify(musicFiles, null, 2)};`;
  fs.writeFileSync(path.join(__dirname, 'app.js'), jsContent + "\n\n" + fs.readFileSync(path.join(__dirname, 'app-template.js')));
}

generateMusicFileList();
