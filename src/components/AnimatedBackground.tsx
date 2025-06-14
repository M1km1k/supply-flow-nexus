
import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gradients = [
      ['#667eea', '#764ba2'],
      ['#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe'],
      ['#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140'],
    ];

    let currentGradient = 0;
    let gradientProgress = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create animated gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      const current = gradients[currentGradient];
      const next = gradients[(currentGradient + 1) % gradients.length];

      // Interpolate between gradients
      const r1 = parseInt(current[0].slice(1, 3), 16);
      const g1 = parseInt(current[0].slice(3, 5), 16);
      const b1 = parseInt(current[0].slice(5, 7), 16);
      
      const r2 = parseInt(next[0].slice(1, 3), 16);
      const g2 = parseInt(next[0].slice(3, 5), 16);
      const b2 = parseInt(next[0].slice(5, 7), 16);

      const r = Math.round(r1 + (r2 - r1) * gradientProgress);
      const g = Math.round(g1 + (g2 - g1) * gradientProgress);
      const b = Math.round(b1 + (b2 - b1) * gradientProgress);

      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`);
      gradient.addColorStop(1, `rgba(${r + 50}, ${g + 50}, ${b + 50}, 0.05)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add floating orbs
      const time = Date.now() * 0.001;
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * 0.5 + Math.cos(time + i) * 200;
        const y = canvas.height * 0.5 + Math.sin(time + i * 0.7) * 150;
        const size = 100 + Math.sin(time + i * 2) * 50;

        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        orbGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.1)`);
        orbGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      gradientProgress += 0.005;
      if (gradientProgress >= 1) {
        gradientProgress = 0;
        currentGradient = (currentGradient + 1) % gradients.length;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};
