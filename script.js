docudocument.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.container');
    const news = document.querySelector('.news');

    // Function to show elements with animation
    function showElements() {
        container.classList.add('show');
        news.classList.add('show');
    }

    // Delay the animation to give a smooth effect
    setTimeout(showElements, 500);

    function createStar() {
        let star = document.createElement("div");
        star.classList.add("falling-star");
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(star);

        setTimeout(() => { star.remove(); }, 5000);
    }

    setInterval(createStar, 300);
});

document.body.style.cursor = "url('pickaxe.jpg'), auto";

