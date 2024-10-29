import React, { useRef, useEffect } from 'react';

class Particle {
    constructor(x, y, size, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.targetX = targetX;
        this.targetY = targetY;
        this.angle = 0;
        this.radius = 150;
        this.gravity = 0.025;
        this.circularMotion = false;
        this.opacity = 1; // Initial opacity
        this.fadeRate = 0.0001; // Rate at which opacity decreases
    }

    update() {
        if (!this.circularMotion) {
            // Move towards the target point (center of canvas)
            let dx = this.targetX - this.x;
            let dy = this.targetY - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            // Apply gravity
            if (dist !== 0) {
                this.vx += (dx / dist) * this.gravity;
                this.vy += (dy / dist) * this.gravity;
            }

            // Update position
            this.x += this.vx;
            this.y += this.vy;

            // If close enough to the target, switch to circular motion
            if (dist < this.radius) {
                this.circularMotion = true;
            }
        } else {
            // Circular motion around the target
            this.angle += 0.05; // Speed of rotation
            this.x = this.targetX + Math.cos(this.angle) * this.radius;
            this.y = this.targetY + Math.sin(this.angle) * this.radius;
        }

        // Fade effect
        this.opacity -= this.fadeRate;
        if (this.opacity <= 0) {
            this.opacity = 0; // Ensure opacity does not go below 0
        }
    }

    draw(ctx) {
        if (ctx) {
            ctx.beginPath();
            ctx.fillStyle = '#c4eff7'; // Use opacity in the fill color
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.fill();
        }
    }
}

const ParticleEffect = () => {
    const canvasRef = useRef(null);
    const particles = useRef([]);
    const maxParticles = 200;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const centerX = canvas.width / 1.3;
        const centerY = canvas.height / 2.2;

        const createParticles = (x, y) => {
            const newParticles = [];
            const size = Math.random() * 5 + 3;
            for (let i = 0; i < 1; i++) {
                newParticles.push(new Particle(x, y, size, centerX, centerY));
            }
            particles.current.push(...newParticles);

            // Limit the number of particles
            if (particles.current.length > maxParticles) {
                particles.current.splice(0, particles.current.length - maxParticles);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((particle, index) => {
                particle.update();
                particle.draw(ctx);

                // Remove particles that have gone off-screen or fully faded
                if (particle.x < 0 || particle.x > canvas.width || particle.y < 0 || particle.y > canvas.height || particle.opacity <= 0) {
                    particles.current.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            createParticles(x, y);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default ParticleEffect;
