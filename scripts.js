// --- Snowflake Animation ---
document.addEventListener('DOMContentLoaded', () => {
    const snowflakesContainer = document.getElementById('snowflakes-container');
    if (snowflakesContainer) {
        const numberOfSnowflakes = 50; // Adjust for more/less snow

        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');

            const size = Math.random() * 5 + 2; // Snowflake size between 2px and 7px
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;

            snowflake.style.left = `${Math.random() * 100}vw`; // Random horizontal start
            
            const fallDuration = Math.random() * 8 + 5; // 5 to 13 seconds
            const fallDelay = Math.random() * 5; // 0 to 5 seconds delay
            snowflake.style.animationDuration = `${fallDuration}s`;
            snowflake.style.animationDelay = `${fallDelay}s`;

            snowflakesContainer.appendChild(snowflake);
        }

        for (let i = 0; i < numberOfSnowflakes; i++) {
            createSnowflake();
        }
    }

    // --- Navigation Hover Sound ---
    const navLinks = document.querySelectorAll('nav a');
    // Ensure hoverSound element exists if you want to use it across pages
    // It might be better to only have the hover sound on index.html or handle its absence gracefully
    const hoverSound = document.getElementById('hoverSound'); // This ID needs to be on an <audio> tag in your HTML

    if (hoverSound) { // Check if the audio element exists on the current page
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (hoverSound.readyState >= 2 && hoverSound.paused) {
                     hoverSound.currentTime = 0; 
                     hoverSound.play().catch(error => console.log("Audio play failed:", error));
                }
            });
        });
    }
});