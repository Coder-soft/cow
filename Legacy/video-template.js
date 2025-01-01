// Function to load the video files dynamically
function loadVideos() {
    const videoList = document.getElementById('videolist');
    
    videoFiles.forEach((file) => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        
        // Add video title
        const title = document.createElement('h3');
        title.textContent = file.name;
        videoItem.appendChild(title);
        
        // Add video player
        const video = document.createElement('video');
        video.controls = true;
        video.width = 320;  // Default width, can be adjusted
        video.src = file.path;
        video.preload = 'metadata';  // Only load video metadata initially
        videoItem.appendChild(video);
        
        // Add download link
        const downloadLink = document.createElement('a');
        downloadLink.href = file.path;
        downloadLink.download = file.name;
        downloadLink.textContent = 'Download';
        downloadLink.classList.add('download-button');
        videoItem.appendChild(downloadLink);
        
        // Append the video item to the video list
        videoList.appendChild(videoItem);
    });
}

// Call the function to load video files when the page loads
window.onload = loadVideos;