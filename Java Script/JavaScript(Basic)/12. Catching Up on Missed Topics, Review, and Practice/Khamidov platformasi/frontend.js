// window.addEventListener("DOMContentLoaded", () => {
//     const canvas = document.getElementById("rainCanvas");
//     const ctx = canvas.getContext("2d");
//     console.log("frontend.js yuklandi");

//     canvas.style.position = 'fixed';
//     canvas.style.top = 0;
//     canvas.style.left = 0;
//     canvas.style.zIndex = '-1';
//     canvas.removeAttribute('style');
//     canvas.removeAttribute('width');
//     canvas.removeAttribute('height');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const raindrops = [];
//     const ripples = [];
//     const trails = [];

//     function random(min, max) {
//         return Math.random() * (max - min) + min;
//     }

//     class Raindrop {
//         constructor() { this.reset(); }
//         reset() {
//             this.x = random(0, canvas.width);
//             this.y = random(-canvas.height, 0);
//             this.length = random(10, 20);
//             this.speed = random(4, 10);
//         }
//         update() {
//             this.y += this.speed;
//             if (this.y > canvas.height) {
//                 ripples.push(new Ripple(this.x, canvas.height));
//                 this.reset();
//             }
//         }
//         draw() {
//             ctx.beginPath();
//             ctx.strokeStyle = "rgba(173,216,230,0.8)";
//             ctx.lineWidth = 1;
//             ctx.moveTo(this.x, this.y);
//             ctx.lineTo(this.x, this.y + this.length);
//             ctx.stroke();
//         }
//     }

//     class Ripple {
//         constructor(x, y) {
//             this.x = x;
//             this.y = y;
//             this.radius = 0;
//             this.alpha = 0.5;
//         }
//         update() {
//             this.radius += 0.5;
//             this.alpha -= 0.005;
//         }
//         draw() {
//             if (this.alpha <= 0) return;
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//             ctx.strokeStyle = `rgba(173,216,230,${this.alpha})`;
//             ctx.lineWidth = 1;
//             ctx.stroke();
//         }
//         isDead() {
//             return this.alpha <= 0;
//         }
//     }

//     class Trail {
//         constructor(x, y) {
//             this.x = x;
//             this.y = y;
//             this.alpha = 0.7;
//             this.length = random(20, 60);
//             this.angle = random(-Math.PI / 4, Math.PI / 4);
//         }
//         update() { this.alpha -= 0.01; }
//         draw() {
//             if (this.alpha <= 0) return;
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(255,255,255,${this.alpha})`;
//             ctx.lineWidth = 2;
//             ctx.moveTo(this.x, this.y);
//             ctx.lineTo(
//                 this.x + Math.cos(this.angle) * this.length,
//                 this.y + Math.sin(this.angle) * this.length
//             );
//             ctx.stroke();
//         }
//         isDead() { return this.alpha <= 0; }
//     }

//     for (let i = 0; i < 200; i++) {
//         raindrops.push(new Raindrop());
//     }

//     canvas.addEventListener("mousemove", (e) => {
//         if (e.buttons === 1) {
//             trails.push(new Trail(e.clientX, e.clientY));
//         }
//     });

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         raindrops.forEach(drop => {
//             drop.update();
//             drop.draw();
//         });

//         ripples.forEach((r, i) => {
//             r.update();
//             r.draw();
//             if (r.isDead()) ripples.splice(i, 1);
//         });

//         trails.forEach((t, i) => {
//             t.update();
//             t.draw();
//             if (t.isDead()) trails.splice(i, 1);
//         });

//         requestAnimationFrame(animate);
//     }

//     animate();

//     window.addEventListener("resize", () => {
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     });
// });
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("rainCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const blackLineY = canvas.height * 0.55; // Qora chiziq joylashuvi

    const raindrops = [];
    const ripples = [];
    const trails = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Raindrop {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = random(0, canvas.width);
            this.y = random(-canvas.height, 0);
            this.length = random(10, 20);
            this.speed = random(4, 10);
            this.lastRippleY = null; // oxirgi ripple chizilgan joy
        }

        update() {
            this.y += this.speed;

            // Qora chiziqdan pastda: har 70px da halqa chizilsin
            if (this.y > blackLineY) {
                if (!this.lastRippleY || this.y - this.lastRippleY >= 70) {
                    ripples.push(new Ripple(this.x, this.y));
                    this.lastRippleY = this.y;
                }
            }

            // Ekran oxiriga yetganda tiklanadi
            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(173,216,230,0.7)`;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        }
    }


    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.alpha = 0.6;
        }

        update() {
            this.radius += 0.5;
            this.alpha -= 0.008;
        }

        draw() {
            if (this.alpha <= 0) return;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(173,216,230,${this.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        isDead() {
            return this.alpha <= 0;
        }
    }


    class Trail {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.alpha = 1; // to‘liq ko‘rinadigan
            this.length = random(40, 80); // uzunroq chiziq
            this.angle = random(-Math.PI / 4, Math.PI / 4); // ozgina egilish
        }

        update() {
            this.alpha -= 0.02;
        }

        draw() {
            if (this.alpha <= 0) return;
            ctx.beginPath();
            // ctx.strokeStyle = `rgba(0, 255, 255, ${this.alpha})`; // Yorqin ko‘k-yashil
            ctx.strokeStyle = `rgba(0, 255, 0, ${this.alpha})`; 
            ctx.lineWidth = 2.5;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x + Math.cos(this.angle) * this.length,
                this.y + Math.sin(this.angle) * this.length
            );
            ctx.stroke();
        }

        isDead() {
            return this.alpha <= 0;
        }
    }


    for (let i = 0; i < 400; i++) {
        raindrops.push(new Raindrop());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Qora chiziq chizish
        ctx.beginPath();
        ctx.moveTo(0, blackLineY);
        ctx.lineTo(canvas.width, blackLineY);
        ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.lineWidth = 2;
        ctx.stroke();

        raindrops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        ripples.forEach((r, i) => {
            r.update();
            r.draw();
            if (r.isDead()) ripples.splice(i, 1);
        });

        trails.forEach((t, i) => {
            t.update();
            t.draw();
            if (t.isDead()) trails.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    animate();

    canvas.addEventListener("mousemove", (e) => {
        // Faqat qora chiziqdan pastda va sichqoncha harakatlanayotgan bo‘lsa
        if (e.clientY > blackLineY) {
            trails.push(new Trail(e.clientX, e.clientY));
        }
    });
});
