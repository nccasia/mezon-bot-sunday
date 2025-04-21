'use client';

import { useEffect, useRef } from 'react';

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    class Particle {
      x: number;
      y: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
      decay: number;
      size: number;
      shape: 'circle' | 'square' | 'star';

      constructor(
        x: number,
        y: number,
        color: string,
        shape: 'circle' | 'square' | 'star'
      ) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
          x: Math.random() * 6 - 3,
          y: Math.random() * 6 - 3,
        };
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.015;
        this.size = Math.random() * 3 + 1;
        this.shape = shape;
      }

      draw() {
        ctx!.globalAlpha = this.alpha;
        ctx!.fillStyle = this.color;

        switch (this.shape) {
          case 'circle':
            ctx!.beginPath();
            ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx!.fill();
            break;

          case 'square':
            ctx!.fillRect(this.x, this.y, this.size * 2, this.size * 2);
            break;

          case 'star':
            const spikes = 5;
            const rotation = Math.PI / 2;
            ctx!.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
              const radius = i % 2 === 0 ? this.size * 2 : this.size;
              const angle = (i * Math.PI) / spikes - rotation;
              const x = this.x + Math.cos(angle) * radius;
              const y = this.y + Math.sin(angle) * radius;
              if (i === 0) {
                ctx!.moveTo(x, y);
              } else {
                ctx!.lineTo(x, y);
              }
            }
            ctx!.closePath();
            ctx!.fill();
            break;
        }
      }

      update() {
        this.velocity.y += 0.05; // Thêm trọng lực
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }
    }

    const particles: Particle[] = [];

    function createFirework(
      x: number,
      y: number,
      type: 'normal' | 'spiral' | 'burst'
    ) {
      const colors = [
        '#ffff00', // Vàng
        '#ff8c00', // Cam đậm
        '#ff4500', // Đỏ cam
        '#ff6347', // Cà chua
        '#ff1493', // Hồng đậm
        '#00ff00', // Xanh lá
        '#4169e1', // Xanh dương hoàng gia
        '#9400d3', // Tím đậm
        '#ffd700', // Vàng kim
        '#ff69b4', // Hồng nóng
        '#32cd32', // Xanh lá lime
        '#00bfff', // Xanh da trời đậm
        '#ff00ff', // Hồng tươi
        '#7fff00', // Chartreuse
        '#1e90ff', // Xanh dương dodger
      ];
      const shapes: Array<'circle' | 'square' | 'star'> = [
        'circle',
        'square',
        'star',
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      switch (type) {
        case 'normal':
          for (let i = 0; i < 100; i++) {
            particles.push(new Particle(x, y, color, shape));
          }
          break;

        case 'spiral':
          for (let i = 0; i < 100; i++) {
            const particle = new Particle(x, y, color, shape);
            const angle = (i / 50) * Math.PI * 2;
            const speed = 3;
            particle.velocity.x = Math.cos(angle) * speed;
            particle.velocity.y = Math.sin(angle) * speed;
            particles.push(particle);
          }
          break;

        case 'burst':
          for (let i = 0; i < 8; i++) {
            const burstColor =
              colors[Math.floor(Math.random() * colors.length)];
            for (let j = 0; j < 20; j++) {
              const angle = (j / 20) * Math.PI * 2;
              const particle = new Particle(x, y, burstColor, shape);
              const speed = 2 + Math.random() * 2;
              particle.velocity.x = Math.cos(angle) * speed;
              particle.velocity.y = Math.sin(angle) * speed;
              particles.push(particle);
            }
          }
          break;
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (particle.alpha > 0) {
          particle.draw();
          particle.update();
        } else {
          particles.splice(i, 1);
        }
      }

      if (Math.random() < 0.03) {
        const types: Array<'normal' | 'spiral' | 'burst'> = [
          'normal',
          'spiral',
          'burst',
        ];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomX = Math.random() * canvas!.width;
        const randomY = Math.random() * canvas!.height; // Bắn pháo hoa từ phía trên màn hình
        createFirework(randomX, randomY, randomType);
      }
    }

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
  );
}
