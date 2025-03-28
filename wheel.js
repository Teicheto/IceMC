const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const formContainer = document.getElementById('formContainer');
const submitBtn = document.getElementById('submitBtn');
const minecraftNameInput = document.getElementById('minecraftName');
const timer = document.getElementById('timer');

const prizes = ['Vip role', 'x32 Diamonds', 'x64 Golden Ingots', 'x128 Iron Ingots', 'Lemon Sword', 'x1 Netherite Ingot', 'Manqk role'];
let prize;

const ctx = wheel.getContext('2d');
const wheelRadius = wheel.width / 2;
const numSegments = prizes.length;
const segmentAngle = (2 * Math.PI) / numSegments;

function drawWheel() {
    for (let i = 0; i < numSegments; i++) {
        const angle = i * segmentAngle;
        
        const gradient = ctx.createLinearGradient(wheelRadius - wheelRadius * Math.cos(angle), wheelRadius - wheelRadius * Math.sin(angle),
            wheelRadius + wheelRadius * Math.cos(angle), wheelRadius + wheelRadius * Math.sin(angle));
        
        gradient.addColorStop(0, '#2196F3'); // Lighter blue
        gradient.addColorStop(1, '#0D47A1'); // Darker blue

        ctx.beginPath();
        ctx.moveTo(wheelRadius, wheelRadius);
        ctx.arc(wheelRadius, wheelRadius, wheelRadius, angle, angle + segmentAngle);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(wheelRadius, wheelRadius);
        ctx.rotate(angle + segmentAngle / 2);

        // Position text slightly off-center, closer to the edge of each segment
        ctx.textAlign = 'left';  // Align text to the left
        ctx.textBaseline = 'middle'; // Vertically align the text in the middle of each segment
        ctx.fillStyle = '#fff';
        ctx.font = '20px Arial';
        ctx.fillText('скрита награда', wheelRadius * 0.07, 1); // Move text towards the edge

        ctx.restore();
    }
}

drawWheel();

function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    const interval = setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `Можете да завъртите отново след: ${hours}:${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = "";
            spinBtn.disabled = false;
            localStorage.removeItem('spinTime');
        } else {
            localStorage.setItem('spinTime', Date.now() + timer * 1000);
        }
    }, 1000);
}

function getRandomPrize() {
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    return prizes[prizeIndex];
}

function checkSpinTime() {
    const spinTime = localStorage.getItem('spinTime');
    if (spinTime) {
        const remainingTime = (spinTime - Date.now()) / 1000;
        if (remainingTime > 0) {
            spinBtn.disabled = true;
            startTimer(remainingTime, timer);
        }
    }
}

spinBtn.addEventListener('click', () => {
    const randomDegree = Math.floor(Math.random() * 3600) + 360;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        prize = getRandomPrize();
        alert(`Поздравления! Спечелихте ${prize}`);
        formContainer.style.display = 'block';
        spinBtn.disabled = true;
        const duration = 24 * 60 * 60; // 24 часа в секунди
        startTimer(duration, timer);
    }, 4000);
});

submitBtn.addEventListener('click', async () => {
    const minecraftName = minecraftNameInput.value;
    const webhookURL = 'https://discord.com/api/webhooks/1339618228011532430/ALCZreCT18Q5CTVUDISwIWt3jib-vBaucnvQpqe64WV6N_TqEKzeJ_7ncnssyH4Y-YnX';

    const payload = {
        content: `<@1338505185332432967> <@1338506217428877525> <@1338506148726439988>\n**Minecraft Име:** ${minecraftName}\n**Награда:** ${prize}`
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

checkSpinTime()

document.body.style.cursor = "url('pickaxe.jpg'), auto";
