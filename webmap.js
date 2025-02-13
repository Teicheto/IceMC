
let imageContainer = document.getElementById('image-container');
let image = document.getElementById('image');
let isDragging = false;
let startX, startY, initialX, initialY;
let scale = 1;

imageContainer.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = imageContainer.scrollLeft;
    initialY = imageContainer.scrollTop;
    imageContainer.style.cursor = 'grabbing';
});

imageContainer.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    imageContainer.scrollLeft = initialX - dx;
    imageContainer.scrollTop = initialY - dy;
});

imageContainer.addEventListener('mouseup', () => {
    isDragging = false;
    imageContainer.style.cursor = 'grab';
});

imageContainer.addEventListener('mouseleave', () => {
    isDragging = false;
    imageContainer.style.cursor = 'grab';
});

imageContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
        scale *= 1.1;
    } else {
        scale /= 1.1;
    }
    image.style.transform = `scale(${scale})`;
});
