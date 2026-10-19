const canvas = document.getElementById("floatingWordsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const words = [
    "JavaScript", "Map", "Set", "Hoisting", "Closure",
    "Function", "Array", "DOM", "Bug", "Callback"
];

const mouse = {
    x: null,
    y: null
};

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class WordParticle {
    constructor() {
        this.text = words[Math.floor(Math.random() * words.length)];
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.angle = Math.random() * 2 * Math.PI; // <-- angle qo‘shildi
        this.baseSpeed = 0.1 + Math.random() * 0.2;
        this.maxSpeed = 0.6 + Math.random() * 0.6;
        this.currentSpeed = this.baseSpeed;

        this.opacity = 0.1 + Math.random() * 0.4;
        this.fontSize = 14 + Math.random() * 10;
    }

    update() {
        this.currentSpeed += 0.0004;
        if (this.currentSpeed > this.maxSpeed) {
            this.currentSpeed = this.maxSpeed;
        }

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = 100;

        if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            const angleFromMouse = Math.atan2(dy, dx);

            const randomAngleOffset = (Math.random() - 0.5) * Math.PI / 2;
            const escapeAngle = angleFromMouse + randomAngleOffset;

            this.angle += (escapeAngle - this.angle) * 0.1;
            // Kuch tasiri tezlikka ozgina tasir qilsa
            this.currentSpeed += force * 0.15;
        }

        this.x += Math.cos(this.angle) * this.currentSpeed;
        this.y += Math.sin(this.angle) * this.currentSpeed;

        if (this.x < 0 || this.x > canvas.width) this.angle = Math.PI - this.angle;
        if (this.y < 0 || this.y > canvas.height) this.angle = -this.angle;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = "#ffffff";
        ctx.fillText(this.text, this.x, this.y);
    }
}


const particles = Array.from({ length: 30 }, () => new WordParticle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

animate();
