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

 // This keeps your sensitive webhook URL off the client-side.

    async function sendIpToWebhook() {
        // Check if we've already sent the IP in this session to avoid spamming your webhook
        if (sessionStorage.getItem('ipWebhookSent_icemc')) {
            // console.log('IP webhook already sent this session.');
            return;
        }

        try {
            // 1. Get the public IP address using an external service
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (!ipResponse.ok) {
                console.error('IP Logger: Failed to fetch IP address:', ipResponse.statusText);
                return;
            }
            const ipData = await ipResponse.json();
            const publicIp = ipData.ip;

            // 2. "Obfuscate" your webhook URL.
            //    REPLACE 'YOUR_BASE64_ENCODED_DISCORD_WEBHOOK_URL_HERE' with your actual Base64 encoded Discord webhook URL.
            //    To get this:
            //    a. Take your full Discord webhook URL (e.g., https://discord.com/api/webhooks/123/abc)
            //    b. Go to an online Base64 encoder (search "base64 encode online")
            //    c. Paste your URL and encode it.
            //    d. Copy the resulting Base64 string and paste it below.
            const obfuscatedWebhookUrl = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM3MjYzNjQxODg5OTQ0NzgwOC9RUGRvUEJFX1ppaFBzSXN3enZNdUNDUWRGMmcySjMzNXFlbmpIWWVhdlZibXRpTlhXUjE4bEtrVk05MjREUVZzTEc1Zg=="; 
            
            if (obfuscatedWebhookUrl === "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM3MjYzNjQxODg5OTQ0NzgwOC9RUGRvUEJFX1ppaFBzSXN3enZNdUNDUWRGMmcySjMzNXFlbmpIWWVhdlZibXRpTlhXUjE4bEtrVk05MjREUVZzTEc1Zg==" || obfuscatedWebhookUrl.trim() === "") {
                console.error("IP Logger: Webhook URL is not configured. Please replace the placeholder in scripts.js.");
                return;
            }

            let webhookUrl;
            try {
                webhookUrl = atob(obfuscatedWebhookUrl); // atob() decodes Base64
            } catch (e) {
                console.error("IP Logger: Failed to decode webhook URL. Is it correctly Base64 encoded?", e);
                return; 
            }

            // 3. Prepare the data to send (example for a Discord webhook)
            const payload = {
                username: "IceMC Site Monitor", // Optional: Custom webhook username
                avatar_url: `${window.location.origin}/logoo.png`, // Assumes logoo.png is at the root of your site
                content: `❄️ New visitor to icemc.site!\n**IP Address:** \`${publicIp}\`\n**Timestamp:** ${new Date().toLocaleString()}`
                // For Discord, you can use embeds for richer formatting if you prefer.
            };

            // 4. Send the data to the webhook
            const webhookResponse = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!webhookResponse.ok) {
                console.error('IP Logger: Failed to send data to webhook:', webhookResponse.status, webhookResponse.statusText);
            } else {
                // console.log('IP Logger: Data sent to webhook successfully.');
                sessionStorage.setItem('ipWebhookSent_icemc', 'true'); // Mark as sent for this session
            }
        } catch (error) {
            console.error('IP Logger: Error in sendIpToWebhook:', error);
        }
    }

    // Call the function when the page loads.
    // This will run on every page that includes scripts.js.
    sendIpToWebhook();
});
