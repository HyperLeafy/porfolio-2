import React, { useEffect, useRef } from 'react';

const ParticleEffect = () => {
    const canvasRef = useRef(null);
    const particlesArray = useRef([]);
    const maxParticles = 100; // Set a maximum limit for particles

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Particle Class
        class Particle {
            constructor(x, y, size, color, speed) {
                this.x = x;
                this.y = y;
                this.directionX = (Math.random() * speed) - (speed / 2);
                this.directionY = (Math.random() * speed) - (speed / 2);
                this.size = size;
                this.color = color;
            }

            draw() {
                context.beginPath();
                context.fillStyle = this.color;
                context.fillRect(this.x, this.y, this.size, this.size);
                context.closePath();
            }

            update() {
                // Check if particle hits the canvas edges
                if (this.x + this.size > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Move particle
                this.x += this.directionX;
                this.y += this.directionY;

                // Draw particle
                this.draw();
            }
        }

        // Mouse movement event
        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const size = Math.random() * 5 + 1;
            const color = '#c4eff7';
            const speed = Math.random() * 2 + 1;

            particlesArray.current.push(new Particle(x, y, size, color, speed));
            if (particlesArray.current.length > maxParticles) {
                particlesArray.current.shift(); // Removes the oldest particle
            }
        };


        const mouseDown = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const size = Math.random() * 5 + 10;
            const color = '#000';
            const speed = Math.random() * 2 + 1;

            particlesArray.current.push(new Particle(x, y, size, color, speed));
            if (particlesArray.current.length > maxParticles) {
                particlesArray.current.shift(); // Removes the oldest particle
            }
        };

        const animateParticles = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.current.forEach((particle) => {
                particle.update();
            });
            requestAnimationFrame(animateParticles);
        };

        // Start animation
        animateParticles();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', mouseDown);

        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousdown', mouseDown);
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default ParticleEffect;
