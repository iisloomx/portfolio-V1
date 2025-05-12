import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const isPrimaryColor = Math.random() > 0.7;
    
    // Set canvas size
    const resizeCanvas = () => {
      const { devicePixelRatio = 1 } = window;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    const createParticles = () => {
      particles = [];
      
      const numParticles = Math.floor(window.innerWidth / 100); // Adjust density
      
      for (let i = 0; i < numParticles; i++) {
        const size = Math.random() * 80 + 20;
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: size,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.07 + 0.01,
          type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          isPrimary: Math.random() > 0.7
        });
      }
    };
    
    createParticles();
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.rotationSpeed;
        
        // Reset if out of bounds
        if (particle.x < -particle.size) particle.x = window.innerWidth + particle.size;
        if (particle.x > window.innerWidth + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = window.innerHeight + particle.size;
        if (particle.y > window.innerHeight + particle.size) particle.y = -particle.size;
        
        // Set color based on theme
        if (theme === 'light') {
          ctx.fillStyle = particle.isPrimary 
            ? `rgba(79, 70, 229, ${particle.opacity})` 
            : `rgba(6, 182, 212, ${particle.opacity})`;
        } else {
          ctx.fillStyle = particle.isPrimary 
            ? `rgba(129, 140, 248, ${particle.opacity})` 
            : `rgba(34, 211, 238, ${particle.opacity})`;
        }
        
        // Draw shape
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        
        switch(particle.type) {
          case 0: // Circle
            ctx.beginPath();
            ctx.arc(0, 0, particle.size/2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 1: // Square
            ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            break;
          case 2: // Triangle
            ctx.beginPath();
            ctx.moveTo(0, -particle.size/2);
            ctx.lineTo(particle.size/2, particle.size/2);
            ctx.lineTo(-particle.size/2, particle.size/2);
            ctx.closePath();
            ctx.fill();
            break;
        }
        
        ctx.restore();
      });
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <BackgroundContainer>
      <Canvas ref={canvasRef} />
    </BackgroundContainer>
  );
};

export default AnimatedBackground; 