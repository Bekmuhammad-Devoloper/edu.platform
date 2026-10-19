// Accordion functionality with background videos
const accordionSpans = document.querySelectorAll(".accordion span");
const fullscreenOverlay = document.getElementById('fullscreenOverlay');
const fullscreenContent = document.getElementById('fullscreenContent');
const fullscreenVideo = document.getElementById('fullscreen-video');
const fullscreenVideoSource = document.getElementById('fullscreen-video-source');
const closeTitle = document.getElementById('closeTitle');
const mainContent = document.getElementById('mainContent');
const mainTitle = document.getElementById('mainTitle');

// Video mapping for each accordion
const accordionVideos = {
    'HTTP (Hypertext Transfer Protocol)': './video/dengiz.mp4',
    'Amaliyot': './video/ormon.mp4',
    'Uyga Vazifa': './video/sham.mp4'
};

accordionSpans.forEach((span) => {
    span.addEventListener("click", () => {
        const panel = span.parentElement.nextElementSibling;
        const accordionTitle = span.textContent.trim();

        // Copy panel content to fullscreen overlay
        fullscreenContent.innerHTML = panel.innerHTML;

        // Set video for this accordion if exists
        if (accordionVideos[accordionTitle]) {
            fullscreenVideoSource.src = accordionVideos[accordionTitle];
            fullscreenVideo.load();
            fullscreenVideo.style.display = 'block';
        } else {
            fullscreenVideo.style.display = 'none';
        }

        // Show fullscreen overlay
        fullscreenOverlay.style.display = 'block';
        mainContent.classList.add('hidden');

        // Add class to show that accordion is open
        span.parentElement.classList.add("open");
    });
});

// Close title functionality
closeTitle.addEventListener('click', closeFullscreen);

// Main title click to close fullscreen (when not in fullscreen mode)
mainTitle.addEventListener('click', closeFullscreen);

// ESC key to close fullscreen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

function closeFullscreen() {
    fullscreenOverlay.style.display = 'none';
    fullscreenVideo.style.display = 'none';
    fullscreenVideo.pause();
    mainContent.classList.remove('hidden');

    // Remove open class from all accordions
    accordionSpans.forEach((span) => {
        span.parentElement.classList.remove("open");
    });
}

// Image toggle functionality (for nested image panels)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('image-toggle')) {
        const imagePanel = e.target.nextElementSibling;
        const isOpen = imagePanel.style.display === "block";
        imagePanel.style.display = isOpen ? "none" : "block";
    }
});

// Button functionality for masala and interview buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('masalaBtn')) {
        const panel = e.target.closest('.panel');
        const masalaContent = panel.querySelector('.masalaContent');
        const interviewContent = panel.querySelector('.interviewContent');

        if (masalaContent) {
            masalaContent.style.display = masalaContent.style.display === 'none' ? 'block' : 'none';
            if (interviewContent) interviewContent.style.display = 'none';
        }
    }

    if (e.target.classList.contains('interviewBtn')) {
        const panel = e.target.closest('.panel');
        const masalaContent = panel.querySelector('.masalaContent');
        const interviewContent = panel.querySelector('.interviewContent');

        if (interviewContent) {
            interviewContent.style.display = interviewContent.style.display === 'none' ? 'block' : 'none';
            if (masalaContent) masalaContent.style.display = 'none';
        }
    }
});