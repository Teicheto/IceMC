async function fetchPlayers() {
    try {
        let response = await fetch(`https://api.mcsrvstat.us/2/play.icemc.online`);
        let data = await response.json();
        
        console.log("Minecraft Server Data:", data); // Debugging - виж в конзолата на браузъра

        if (data.online) {
            document.getElementById("players-online").innerText = data.players.online;
        } else {
            document.getElementById("players-online").innerText = "Сървърът е офлайн";
        }
    } catch (error) {
        console.error("Грешка при зареждане на Minecraft данни:", error);
        document.getElementById("players-online").innerText = "Грешка при зареждане";
    }
}

// Извикване на функцията при зареждане на страницата
fetchPlayers();
setInterval(fetchPlayers, 30000); // Обновяване на всеки 30 секунди

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
    const ip = "play.icemc.online"; // IP на сървъра
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
        console.log("Discord Server Data:", data); // Debugging

        document.getElementById("discord-online").innerText = data.presence_count;
    } catch (error) {
        console.error("Грешка при зареждане на Discord данни:", error);
        document.getElementById("discord-online").innerText = "Няма информация";
    }
}

// Извиква се при зареждане на страницата
fetchDiscordMembers();
