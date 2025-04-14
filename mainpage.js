// Custom cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Copy IP function
function copyIP() {
    navigator.clipboard.writeText('play.icemc.online');
    const button = document.querySelector('.copy-ip');
    button.textContent = 'Copied!';
    setTimeout(() => {
        button.textContent = 'Copy IP';
    }, 2000);
}

// Player count animation
const playerCount = document.getElementById('online-players');
let count = 0;
const target = 124;
const duration = 2000;
const interval = 20;
const increment = target / (duration / interval);

const updateCount = () => {
    count += increment;
    if (count >= target) {
        count = target;
        clearInterval(counter);
    }
    playerCount.textContent = Math.floor(count);
};

const counter = setInterval(updateCount, interval);
