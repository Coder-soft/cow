const videoFiles = [
    { name: "Chest Opening", path: "videos/0001-0090.mp4" },
    { name: "Math Background", path: "videos/200_IQ_Math_Background_Greenscreen_effect_Chromakey_4K___Copyright_free.mp4" },
    { name: "3D Minecraft Hardcore", path: "videos/3D Minecraft Hardcore.mp4" },
    { name: "Abstract Line Background", path: "videos/AbstractLineBackground.mp4" },
    { name: "Nether Mobs", path: "videos/All_Nether_Mobs (1).mp4" },
    { name: "Animation", path: "videos/anim.mov" },
    { name: "Anime White Lines", path: "videos/Anime_White_Lines_Green_ScreenDOWNLOAD_LINK.mp4" },
    { name: "Apply Now", path: "videos/apply now (MADE BY @JMLGYT).mp4" },
    { name: "Black Bars", path: "videos/black_bars.mp4" },
    { name: "Black Lines", path: "videos/black_lines.mov" },
    { name: "Boat Crafting", path: "videos/Boat_Crafting_Animation.mp4" },
    { name: "Book Intro", path: "videos/book_intro.mov" },
    { name: "Subscribe Animation", path: "videos/CleanSubscribeAnimationARIALFX_1_1.mp4" },
    { name: "Clock Animation", path: "videos/Clock_Animation_Green_Screen_to_use_in_after_effects.mp4" },
    { name: "Copyright Free Transitions", path: "videos/Copyright_Free_Green_screen_Motion_graphic_transitions_For_video_editing___Link_in_the_description.mp4" },
    { name: "Diamond Pick", path: "videos/Diamond_PICJ.mp4" },
    { name: "Difficulty Crazy", path: "videos/Difficulty Crazy.mp4" },
    { name: "Difficulty Impossible", path: "videos/Difficulty Impossible.mp4" },
    { name: "Difficulty Realistic", path: "videos/Difficulty Realistic.mp4" },
    { name: "Difficulty Scary", path: "videos/Difficulty Scary.mp4" },
    { name: "Discord Join", path: "videos/Discord Joined Light.mov" },
    { name: "Discord Call", path: "videos/Discord_call.mp4" },
    { name: "Table Animation", path: "videos/etable_animatiuon.mp4" },
    { name: "Fist", path: "videos/fist_1.mp4" },
    { name: "Game Animation", path: "videos/GAME_1.mp4" },
    { name: "Windows XP Error", path: "videos/GREEN_SCREEN_Windows_XP_Error_-_VIRUS_ERROR__-_FOOTAGE_-_SOUND.mp4" },
    { name: "Grid", path: "videos/Grid.mp4" },
    { name: "Heart Transition", path: "videos/heart_transition_green_screen_.mp4" },
    { name: "Hoplite Logo", path: "videos/Hoplite_Logo_Animation.mp4" },
    { name: "Hotbar Animation", path: "videos/hotbar_animation.mp4" },
    { name: "Undertale Heart", path: "videos/Kill_heart_undertale_green_screen_Decent_Quality_Link_in_Description.mp4" },
    { name: "Ladder", path: "videos/Ladder.mp4" },
    { name: "Subscribe Minecraft", path: "videos/Lets_Subscribe_Green_Screen_Minecraft_Animation____by_MIKI_NEOMI_subscribe_greenscreen.mp4" },
    { name: "MCC Logo", path: "videos/MCC_Logo_ANimation.mp4" },
    { name: "Minecraft Clock", path: "videos/Minecraft_clock_animation_green_screen.mp4" },
    { name: "Minecraft Explosion", path: "videos/Minecraft_Explosion_Green_Screen.mp4" },
    { name: "Minecraft Heart", path: "videos/Minecraft_Hardcore_Heart_Transition.mp4" },
    { name: "Minecraft Map", path: "videos/minecraft_map_animation_green_screen_.mp4" },
    { name: "Minecraft TNT", path: "videos/Minecraft_Tnt_explosions_green_screen_video.mp4" },
    { name: "Money Animation", path: "videos/Money_Animatioj.mp4" },
    { name: "Netherite Armor", path: "videos/Netherite_Armour_animation_green_screen_.mp4" },
    { name: "Objective Stay Alive", path: "videos/Objective Stay Alive.mp4" },
    { name: "Paper", path: "videos/paper_1.mp4" },
    { name: "Pause Button", path: "videos/pause_button.mp4" },
    { name: "Raining Blocks", path: "videos/raining_diamond_iron_copper_emerald_block_green_screen_.mp4" },
    { name: "Subscribe Animation", path: "videos/subscribe_animation1.mp4" },
    { name: "TikTok Hearts", path: "videos/TikTok Hearts Counter Light.mp4" },
    { name: "Transition", path: "videos/Transition3.mp4" },
    { name: "YouTube Comment", path: "videos/YouTube Comment Pixel.mp4" },
    { name: "YouTube Like Subscribe", path: "videos/YouTube Like & Subscribe Light.mov" },
    { name: "YouTube Likes Counter", path: "videos/YouTube Likes Counter Light.mp4" },
    { name: "Loading Bar", path: "videos/yt5s.com-Free_Green_screen_Loading_Bar_Easing_Ending_animation_Effects_Overlays.mov" }
  ];
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
// Ensure videoFiles is accessible
if (typeof videoFiles === 'undefined') {
    console.error('videoFiles is not defined. Make sure it is loaded before this script.');
    videoFiles = []; // Fallback to empty array to prevent errors
}

// Ensure videoFiles is accessible
if (typeof videoFiles === 'undefined') {
    console.error('videoFiles is not defined. Make sure it is loaded before this script.');
    videoFiles = []; // Fallback to empty array to prevent errors
}

const searchVideos = (searchBox) => {
    console.log('Searching for:', searchBox);
    try {
        let matches;
        if (searchBox.length === 0) {
            matches = videoFiles; // Show all videos when search box is empty
        } else {
            matches = videoFiles.filter((video) => {
                const regex = new RegExp(searchBox, "gi");
                return video.name.match(regex);
            });
        }

        console.log('Matches found:', matches.length);
        displayVideos(matches);
    } catch (error) {
        console.error('Error in searchVideos:', error);
    }
};

const displayVideos = (videos) => {
    const videoList = document.getElementById("videoList");
    if (!videoList) {
        console.error('Element with id "videoList" not found');
        return;
    }

    videoList.innerHTML = ''; // Clear previous results

    if (videos.length > 0) {
        videos.forEach((video) => {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerHTML = `
                <h3>${video.name}</h3>
                <video src="${video.path}" controls></video>
            `;
            videoList.appendChild(videoItem);
        });
    } else {
        videoList.innerHTML = "<p>No matching videos found.</p>";
    }
};

// Wait for the DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => searchVideos(e.target.value));
        console.log('Search input event listener added');
    } else {
        console.error('Element with id "searchInput" not found');
    }

    // Initial display of all videos
    searchVideos('');
});

// Call the function to load video files when the page loads
window.onload = loadVideos;