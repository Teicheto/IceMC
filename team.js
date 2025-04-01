
document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const discordName = document.getElementById('discordName').value;
    const minecraftName = document.getElementById('minecraftName').value;
    const message = document.getElementById('message').value;

     const webhookURL = 'https://discord.com/api/webhooks/1352747220201508945/k6exWgkVh0C0HcspckOm3zuWNhyHG6FHOHP-idehtiOKyOYNpdjGJ_yqy5jjudG7U9LI';

     const payload = {
        content: `**<@1320671930239684690>**\n**Discord Name:** ${discordName}\n**Minecraft Name:** ${minecraftName}\n**Message:** ${message}`
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

document.body.style.cursor = "url('pickaxe.jpg'), auto";
