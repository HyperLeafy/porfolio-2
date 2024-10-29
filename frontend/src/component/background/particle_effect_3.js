// import React, { useRef, useEffect } from 'react';

// class Particle {
//     constructor(x, y, targetX, targetY) {
//         this.x = x;
//         this.y = y;
//         this.vx = Math.random() * 2 - 1;
//         this.vy = Math.random() * 2 - 1;
//         this.targetX = targetX;
//         this.targetY = targetY;
//         this.angle = 0;
//         this.radius = 50;
//         this.gravity = 0.05;
//         this.circularMotion = false;
//     }

//     update() {
//         if (!this.circularMotion) {
//             // Move towards the target point (mouse position)
//             let dx = this.targetX - this.x;
//             let dy = this.targetY - this.y;
//             let dist = Math.sqrt(dx * dx + dy * dy);

//             // Apply gravity
//             if (dist !== 0) {
//                 this.vx += (dx / dist) * this.gravity;
//                 this.vy += (dy / dist) * this.gravity;
//             }

//             // Update position
//             this.x += this.vx;
//             this.y += this.vy;

//             // If close enough to the target, switch to circular motion
//             if (dist < this.radius) {
//                 this.circularMotion = true;
//             }
//         } else {
//             // Circular motion around the target
//             this.angle += 0.05; // Speed of rotation
//             this.x = this.targetX + Math.cos(this.angle) * this.radius;
//             this.y = this.targetY + Math.sin(this.angle) * this.radius;
//         }
//     }

//     draw(ctx) {
//         if (ctx) {
//             ctx.beginPath();
//             ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
//             ctx.fillStyle = '#FFFFFF';
//             ctx.fill();
//         }
//     }
// }

// const ParticleEffect = () => {
//     const canvasRef = useRef(null);
//     const particles = useRef([]);
//     const maxParticles = 20;

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (!canvas) return;

//         const ctx = canvas.getContext('2d');
//         if (!ctx) return;

//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;

//         const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

//         const createParticles = (x, y) => {
//             for (let i = 0; i < 5; i++) { // Reduce the number of particles per frame to avoid overcrowding
//                 particles.current.push(new Particle(x, y, mouse.x, mouse.y));
//             }
//         };

//         const animate = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             particles.current.forEach((particle, index) => {
//                 particle.update();
//                 particle.draw(ctx);

//                 // Remove particles that have gone off-screen
//                 if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height) {
//                     particles.current.splice(index, 1);
//                 }
//             });

//             requestAnimationFrame(animate);
//         };

//         // Start animation
//         animate();

//         // Create particles on mouse move
//         const handleMouseMove = (event) => {
//             mouse.x = event.clientX;
//             mouse.y = event.clientY;

//             createParticles(mouse.x, mouse.y);

//             if (particles.current.length > maxParticles) {
//                 particles.current.shift(); // Removes the oldest particle
//             }
//         };

//         window.addEventListener('mousemove', handleMouseMove);

//         // Initial particle creation at the center of the canvas
//         createParticles(mouse.x, mouse.y);

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//         };
//     }, []);

//     return <canvas ref={canvasRef} />;
// };

// export default ParticleEffect;

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const gridSize = 20; // Number of particles per row and column
const particleSize = 5;
const colors = ['#ff5733', '#33ff57', '#3357ff', '#f5f533'];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const createParticles = () => {
    particles = [];
    const spacing = canvas.width / gridSize;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const x = i * spacing + spacing / 2;
            const y = j * spacing + spacing / 2;
            const size = particleSize;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, size, color));
        }
    }
};

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    requestAnimationFrame(animate);
};

createParticles();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles(); // Recreate particles on resize
});
