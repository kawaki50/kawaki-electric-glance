
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const linesRef = useRef<Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    speed: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize lines
    const initLines = () => {
      linesRef.current = [];
      for (let i = 0; i < 50; i++) {
        linesRef.current.push({
          x1: Math.random() * canvas.width,
          y1: Math.random() * canvas.height,
          x2: Math.random() * canvas.width,
          y2: Math.random() * canvas.height,
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.3 + 0.1
        });
      }
    };

    initLines();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      linesRef.current.forEach((line, index) => {
        // Calculate distance from mouse
        const distanceToMouse = Math.sqrt(
          Math.pow(mouseRef.current.x - line.x1, 2) + 
          Math.pow(mouseRef.current.y - line.y1, 2)
        );

        // Increase opacity and speed based on mouse proximity
        const mouseInfluence = Math.max(0, 200 - distanceToMouse) / 200;
        const currentOpacity = line.opacity + mouseInfluence * 0.5;
        const currentSpeed = line.speed + mouseInfluence * 2;

        // Move lines
        line.x1 += Math.sin(Date.now() * 0.001 + index) * currentSpeed;
        line.y1 += Math.cos(Date.now() * 0.001 + index) * currentSpeed;
        line.x2 += Math.sin(Date.now() * 0.001 + index + Math.PI) * currentSpeed;
        line.y2 += Math.cos(Date.now() * 0.001 + index + Math.PI) * currentSpeed;

        // Wrap around screen
        if (line.x1 < 0) line.x1 = canvas.width;
        if (line.x1 > canvas.width) line.x1 = 0;
        if (line.y1 < 0) line.y1 = canvas.height;
        if (line.y1 > canvas.height) line.y1 = 0;
        if (line.x2 < 0) line.x2 = canvas.width;
        if (line.x2 > canvas.width) line.x2 = 0;
        if (line.y2 < 0) line.y2 = canvas.height;
        if (line.y2 > canvas.height) line.y2 = 0;

        // Draw line with neon effect
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(57, 255, 20, ${currentOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Add glow effect
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default AnimatedBackground;
