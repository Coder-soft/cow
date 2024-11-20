const searchInput = document.getElementById("search");
const imageList = document.getElementById("imagelist");

const rawGitHubUrl = "https://raw.githubusercontent.com/coder-soft/thumb/main";

let allImageFiles = [];

async function fetchImageList() {
    try {
        const response = await fetch("js/image_list.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON: ${response.status} - ${response.statusText}`);
        }
        allImageFiles = await response.json();
        loadImages(allImageFiles);
    } catch (error) {
        console.error("Error fetching image list:", error);
        imageList.innerHTML = "<p>Error fetching images. Please try again later.</p>";
    }
}

function loadImages(imageFiles) {
    imageList.innerHTML = ''; // Clear existing list

    imageFiles.forEach((filename) => {
        const imageItem = document.createElement('div');
        imageItem.classList.add('image-item');

        // Extract title from filename
        const title = filename.replace(/\.[^/.]+$/, "").replace(/^\d+\.\s*/, "");

        // Add image title
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        imageItem.appendChild(titleElement);

        // Check if file is a .psd
        if (filename.endsWith('.psd')) {
            const psdMessage = document.createElement('p');
            psdMessage.textContent = "This is a PSD file and cannot be previewed in the browser.";
            imageItem.appendChild(psdMessage);
        } else {
            // Add image preview
            const img = document.createElement('img');
            img.src = `${rawGitHubUrl}/${encodeURIComponent(filename)}`;
            imageItem.appendChild(img);
        }

        // Add download link
        const downloadLink = document.createElement('a');
        downloadLink.href = `${rawGitHubUrl}/${encodeURIComponent(filename)}`;
        downloadLink.download = filename;
        downloadLink.textContent = 'Download';
        downloadLink.target = '_blank';
        imageItem.appendChild(downloadLink);

        // Append the image item to the image list
        imageList.appendChild(imageItem);
    });
}

function searchImages(searchTerm) {
    const filteredImages = allImageFiles.filter(filename => 
        filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    loadImages(filteredImages);
}

// Event listener for search input
searchInput.addEventListener("input", (e) => searchImages(e.target.value));

// Initial load
window.addEventListener("load", fetchImageList);
