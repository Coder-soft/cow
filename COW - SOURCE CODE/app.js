const searchInput = document.getElementById("search");
const musicList = document.getElementById("musiclist");

const rawGitHubUrl = "https://raw.githubusercontent.com/coder-soft/U2FsdGVkX1-BClfXVrJBieBrys6FUCljvvo-/main";

let allMusicFiles = [];

async function fetchMusicList() {
    try {
        const response = await fetch("js/music_list.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.status} - ${response.statusText}`);
        }
        allMusicFiles = await response.json();
        loadMusic(allMusicFiles);
    } catch (error) {
        console.error("Error fetching music list:", error);
        musicList.innerHTML = "<p>Error fetching music. Please try again later.</p>";
    }
}

function loadMusic(musicFiles) {
    musicList.innerHTML = ''; // Clear existing list

    musicFiles.forEach((filename) => {
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');

        // Extract title from filename
        const title = filename.replace(/\.[^/.]+$/, "").replace(/^\d+\.\s*/, "");

        // Add music title
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        musicItem.appendChild(titleElement);

        // Add audio player
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = `${rawGitHubUrl}/${encodeURIComponent(filename)}`;
        musicItem.appendChild(audio);

        // Add download link
        const downloadLink = document.createElement('a');
        downloadLink.href = `${rawGitHubUrl}/${encodeURIComponent(filename)}`;
        downloadLink.download = filename;
        downloadLink.textContent = 'Download';
        downloadLink.target = '_blank';
        musicItem.appendChild(downloadLink);

        // Append the music item to the music list
        musicList.appendChild(musicItem);
    });
}

function searchMusic(searchTerm) {
    const filteredMusic = allMusicFiles.filter(filename => 
        filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    loadMusic(filteredMusic);
}

// Event listener for search input
searchInput.addEventListener("input", (e) => searchMusic(e.target.value));

// Initial load
window.addEventListener("load", fetchMusicList);
  window.onload = loadMusic;
  