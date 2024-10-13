const searchInput = document.getElementById("search");
const sfxList = document.getElementById("sfxlist");
const rawGitHubUrl = "https://raw.githubusercontent.com/coder-soft/U2FsdGVkX1-BClfXVrJBieBrys6FUCljvvo-/main/sfx/";

let allSfxFiles = [];
let currentlyPlaying = null;

function initializeApp() {
    console.log("Initializing app...");
    if (!sfxList) {
        console.error("Error: Could not find element with id 'sfxlist'. Please check your HTML.");
        return;
    }
    if (!searchInput) {
        console.error("Error: Could not find element with id 'search'. Please check your HTML.");
        return;
    }
    fetchSfxList();
}

async function fetchSfxList() {
    console.log("Fetching SFX list...");
    try {
        const response = await fetch("js/sfx_list.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.status} - ${response.statusText}`);
        }
        allSfxFiles = await response.json();
        console.log("SFX list fetched successfully:", allSfxFiles);
        loadSfx(allSfxFiles);
    } catch (error) {
        console.error("Error fetching SFX list:", error);
        if (sfxList) {
            sfxList.innerHTML = "<p>Error fetching sound effects. Please try again later.</p>";
        }
    }
}

function loadSfx(sfxFiles) {
    console.log("Loading SFX...");
    if (!sfxList) {
        console.error("Error: sfxList element not found when trying to load SFX.");
        return;
    }
    sfxList.innerHTML = ''; // Clear existing list

    sfxFiles.forEach((filename) => {
        const sfxItem = document.createElement('div');
        sfxItem.classList.add('sfx-item');

        // Extract title from filename
        const title = filename.replace(/\.[^/.]+$/, "");

        // Add SFX title
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        sfxItem.appendChild(titleElement);

        // Add play button
        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.onclick = () => playSfx(`${rawGitHubUrl}${encodeURIComponent(filename)}`, playButton);
        sfxItem.appendChild(playButton);

        // Add download link
        const downloadLink = document.createElement('a');
        downloadLink.href = `${rawGitHubUrl}${encodeURIComponent(filename)}`;
        downloadLink.download = filename;
        downloadLink.textContent = 'Download';
        downloadLink.target = '_blank';
        sfxItem.appendChild(downloadLink);

        // Append the SFX item to the SFX list
        sfxList.appendChild(sfxItem);
    });
    console.log("SFX loaded successfully.");
}

function playSfx(src, button) {
    if (currentlyPlaying) {
        currentlyPlaying.pause();
        currentlyPlaying.currentTime = 0;
        document.querySelectorAll('.sfx-item button').forEach(btn => btn.textContent = 'Play');
    }

    const audio = new Audio(src);
    audio.onended = () => {
        button.textContent = 'Play';
        currentlyPlaying = null;
    };
    audio.play().catch(error => {
        console.error("Error playing audio:", error);
        button.textContent = 'Error';
    });
    button.textContent = 'Stop';
    currentlyPlaying = audio;

    button.onclick = () => {
        if (currentlyPlaying) {
            currentlyPlaying.pause();
            currentlyPlaying.currentTime = 0;
            button.textContent = 'Play';
            currentlyPlaying = null;
        } else {
            playSfx(src, button);
        }
    };
}

function searchSfx(searchTerm) {
    const filteredSfx = allSfxFiles.filter(filename => 
        filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    loadSfx(filteredSfx);
}

// Event listener for search input
if (searchInput) {
    searchInput.addEventListener("input", (e) => searchSfx(e.target.value));
}

// Initial load
window.addEventListener("load", initializeApp);
window.onload = loadSfx;