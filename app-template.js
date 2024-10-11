// Function to load the music files dynamically
function loadMusic() {
    const musicList = document.getElementById('musiclist');
  
    musicFiles.forEach((file) => {
      const musicItem = document.createElement('div');
      musicItem.classList.add('music-item');
  
      // Add music title
      const title = document.createElement('h3');
      title.textContent = file.name;
      musicItem.appendChild(title);
  
      // Add audio player
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = file.path;
      musicItem.appendChild(audio);
  
      // Add download link
      const downloadLink = document.createElement('a');
      downloadLink.href = file.path;
      downloadLink.download = file.name;
      downloadLink.textContent = 'Download';
      musicItem.appendChild(downloadLink);
  
      // Append the music item to the music list
      musicList.appendChild(musicItem);
    });
  }
  
  // Call the function to load music files when the page loads
  window.onload = loadMusic;
  