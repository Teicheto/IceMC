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
            playersOnlineElement.innerText = `Players Online: ${data.players.online}`;
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
        document.getElementById("discord-online").innerText = `Discord Members Online: ${data.presence_count}`;
    } catch (error) {
        console.error("Error fetching Discord data:", error);
        document.getElementById("discord-online").innerText = "Няма информация"; // "No information" in Bulgarian
    }
}

// Create falling star animation
function createStar() {
    let star = document.createElement("div");
    star.classList.add("falling-star");
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.body.appendChild(star);

    setTimeout(() => { star.remove(); }, 5000);
}

// Copy server IP to clipboard
function copyIP() {
    const ip = "play.icemc.online"; // Your server IP
    navigator.clipboard.writeText(ip).then(() => {
        alert("IP адресът е копиран: " + ip); // "IP address copied: " in Bulgarian
    }).catch(err => {
        console.error("Грешка при копиране: ", err); // "Error copying: " in Bulgarian
    });
}

// Set custom cursor
document.body.style.cursor = "url('pickaxe.jpg'), auto";

// Initialize functions when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    fetchPlayers();
    fetchDiscordMembers();
    setInterval(createStar, 300);
});
