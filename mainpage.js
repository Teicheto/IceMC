// Fetch Minecraft server player count
async function fetchPlayers() {
    const serverAddress = 'play.icemc.online';
    const apiUrl = `https://api.mcsrvstat.us/3/${serverAddress}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'IceMC/1.0' // Replace with your application's name and version
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const playersOnlineElement = document.getElementById("players-online");
        if (data.online) {
            playersOnlineElement.innerText = `Играчите онлайн: ${data.players.online}`; // "Players Online" in Bulgarian
        } else {
            playersOnlineElement.innerText = "Сървърът е офлайн"; // "The server is offline" in Bulgarian
        }
    } catch (error) {
        console.error("Error fetching player data:", error);
        document.getElementById("players-online").innerText = "Грешка при зареждане"; // "Error loading" in Bulgarian
    }
}

// Fetch Discord server member count
async function fetchDiscordMembers() {
    const guildId = "1320671930239684690"; // Replace with your Discord Guild ID
    const widgetUrl = `https://discord.com/api/guilds/${guildId}/widget.json`;

    try {
        const response = await fetch(widgetUrl);
        if (!response.ok) throw new Error("Грешка при взимане на данни!"); // "Error fetching data!" in Bulgarian

        const data = await response.json();
        document.getElementById("discord-online").innerText = `Discord Членове Онлайн: ${data.presence_count}`; // "Discord Members Online" in Bulgarian
    } catch (error) {
        console.error("Error fetching Discord data:", error);
        document.getElementById("discord-online").innerText = "Няма информация"; // "No information" in Bulgarian
    }
}

// Create falling star animation
function createStar() {
    const star = document.createElement("div");
    star.classList.add("falling-star");
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 5000);
}

// Copy server IP to clipboard
function copyIP() {
    const ip = "icemc.site"; // Your server IP
    navigator.clipboard.writeText(ip).then(() => {
        alert("Сървър IP е копиран: " + ip); // "IP address copied: " in Bulgarian
    }).catch(err => {
        console.error("Грешка при копиране: ", err); // "Error copying" in Bulgarian
    });
}

// Initialize functions when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Fetch Minecraft players and Discord members
    fetchPlayers();
    fetchDiscordMembers();

    // Create a falling star every 300ms
    setInterval(createStar, 300);

    // Set greeting based on time of day
    const greeting = document.getElementById('greeting');
    const hours = new Date().getHours();
    if (hours < 12) {
        greeting.textContent = 'Добро утро и добре дошли в IceMC!';
    } else if (hours < 18) {
        greeting.textContent = 'Добър ден и добре дошли в IceMC!';
    } else {
        greeting.textContent = 'Добър вечер и добре дошли в IceMC!';
    }
});

// Theme Toggle Feature
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Set custom cursor
document.body.style.cursor = "url('pickaxe.jpg'), auto";
