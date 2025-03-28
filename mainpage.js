async function fetchPlayers() {
    try {
        let response = await fetch(`https://api.mcsrvstat.us/2/play.icemc.online`);
        let data = await response.json();
        
        if (data.online) {
            document.getElementById("players-online").innerText = data.players.online;
        } else {
            document.getElementById("players-online").innerText = "Сървърът е офлайн";
        }
    } catch (error) {
        document.getElementById("players-online").innerText = "Грешка при зареждане";
    }
}

// Извикване на функцията при зареждане на страницата
fetchPlayers();

// Автоматично обновяване на всеки 30 секунди
setInterval(fetchPlayers, 30000);

}
fetchPlayers();

function createStar() {
let star = document.createElement("div");
star.classList.add("falling-star");
star.style.left = Math.random() * 100 + "vw";
star.style.animationDuration = Math.random() * 3 + 2 + "s";
document.body.appendChild(star);

setTimeout(() => { star.remove(); }, 5000);
}

setInterval(createStar, 300);

function copyIP() {
const ip = "play.icemc.online"; // Твоето IP
navigator.clipboard.writeText(ip).then(() => {
alert("IP адресът е копиран: " + ip);
}).catch(err => {
console.error("Грешка при копиране: ", err);
});
}



async function fetchDiscordMembers() {
const guildId = "1320671930239684690"; // Трябва да замениш с твоето Discord Guild ID
const widgetUrl = `https://discord.com/api/guilds/${guildId}/widget.json`;

try {
const response = await fetch(widgetUrl);
if (!response.ok) throw new Error("Грешка при взимане на данни!");

const data = await response.json();
document.getElementById("discord-online").innerText = data.presence_count;
} catch (error) {
document.getElementById("discord-online").innerText = "Няма информация";
}
}

// Извиква се при зареждане на страницата
fetchDiscordMembers();
