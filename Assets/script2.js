const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numStars = 200;
const stars = [];

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.3 + 0.1,
    offsetX: 0,
    offsetY: 0,
  });
}

// Track mouse globally
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Linear interpolation helper
function lerp(a, b, t) {
  return a + (b - a) * t;
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > canvas.height) star.y = 0;

    // Mouse attraction
    const dx = mouse.x - star.x;
    const dy = mouse.y - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 100) {
      star.offsetX += dx * 0.01;
      star.offsetY += dy * 0.01;
    } else {
      star.offsetX = lerp(star.offsetX, 0, 0.02);
      star.offsetY = lerp(star.offsetY, 0, 0.02);
    }

    ctx.beginPath();
    ctx.arc(
      star.x + star.offsetX,
      star.y + star.offsetY,
      star.size,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
