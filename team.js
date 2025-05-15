document.addEventListener('DOMContentLoaded', function () {
    const webhookURL = 'https://discord.com/api/webhooks/1352747220201508945/k6exWgkVh0C0HcspckOm3zuWNhyHG6FHOHP-idehtiOKyOYNpdjGJ_yqy5jjudG7U9LI';
    const staffCode = 'obichamicemc4staffza5vinagi';
    const cooldownTime = 30 * 60 * 1000; // 30 минути в милисекунди
    let lastSubmissionTime = localStorage.getItem('lastSubmissionTime') || 0;

    document.getElementById('contactForm').addEventListener('submit', async function (event) {
        event.preventDefault();

        const now = Date.now();
        if (now - lastSubmissionTime < cooldownTime) {
            alert('Моля, изчакайте 30 минути преди да изпратите отново.');
            return;
        }

        const discordName = document.getElementById('discordName').value;
        const minecraftName = document.getElementById('minecraftName').value;
        const message = document.getElementById('message').value;

        const payload = {
            content: `**<@1324792102114299914>**\n**Discord име:** ${discordName}\n**Minecraft име:** ${minecraftName}\n**Съобщение:** ${message}`
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
                lastSubmissionTime = now;
                localStorage.setItem('lastSubmissionTime', lastSubmissionTime);
            } else {
                alert('Грешка при изпращане на съобщението.');
            }
        } catch (error) {
            alert('Грешка при изпращане на съобщението.');
        }
    });

    // Функционалност за модалния прозорец
    const staffButton = document.createElement('button');
    staffButton.textContent = 'Персонал';
    staffButton.id = 'staffButton';
    document.body.appendChild(staffButton);

    const staffModal = document.createElement('div');
    staffModal.id = 'staffModal';
    staffModal.classList.add('modal');
    staffModal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <p>Моля, въведете кода за персонала:</p>
            <input type="password" id="staffCodeInput">
            <button id="submitStaffCode">Потвърди</button>
        </div>
    `;
    document.body.appendChild(staffModal);

    const closeModal = staffModal.querySelector('.close');
    const submitStaffCode = document.getElementById('submitStaffCode');

    staffButton.onclick = function () {
        staffModal.style.display = 'block';
    };

    closeModal.onclick = function () {
        staffModal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == staffModal) {
            staffModal.style.display = 'none';
        }
    };

    submitStaffCode.onclick = function () {
        const enteredCode = document.getElementById('staffCodeInput').value;
        if (enteredCode === staffCode) {
            alert('Достъпът е предоставен.');
            staffModal.style.display = 'none';
            // Тук можете да добавите допълнителна функционалност за персонала
        } else {
            alert('Невалиден код.');
        }
    };
});
