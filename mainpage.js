// Welcome Alert
document.addEventListener("DOMContentLoaded", () => {
    alert("Welcome to IceMC! Have fun exploring our server.");
});

// Smooth Scroll for Internal Links
const links = document.querySelectorAll("nav a");

links.forEach(link => {
    link.addEventListener("click", event => {
        if (link.hash) {
            event.preventDefault();
            const target = document.querySelector(link.hash);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
});
