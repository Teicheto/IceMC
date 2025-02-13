
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const discordName = document.getElementById('discordName').value;
    const minecraftName = document.getElementById('minecraftName').value;
    const message = document.getElementById('message').value;

     const webhookURL = 'https://discord.com/api/webhooks/1339618228011532430/ALCZreCT18Q5CTVUDISwIWt3jib-vBaucnvQpqe64WV6N_TqEKzeJ_7ncnssyH4Y-YnX';

     const payload = {
        content: `**Discord Name:** ${discordName}\n**Minecraft Name:** ${minecraftName}\n**Message:** ${message}`
    };

     try {
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

         if (response.ok) {
            alert('Съобщението е изпратено успешно!');
        } else {
            alert('Грешка при изпращане на съобщението.');
        }
    } catch (error) {
        alert('Грешка при изпращане на съобщението.');
    }
});
