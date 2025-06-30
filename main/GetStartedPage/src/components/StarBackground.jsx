import React, { useEffect, useRef, useState } from 'react';
import './StarBackground.css';

const StarBackground = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Scroll detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hide stars when scrolling down more than 50% of viewport height
      if (scrollY > windowHeight * 0.5) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Enhanced Star class with different types
    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 0.5; // Increased size range for bigger stars
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.8 + 0.3; // Increased opacity for better visibility
        this.twinkleSpeed = Math.random() * 0.015 + 0.005;
        this.twinkleDirection = 1;
        this.type = Math.random() < 0.05 ? 'shooting' : Math.random() < 0.15 ? 'bright' : Math.random() < 0.1 ? 'giant' : 'normal'; // Added giant star type
        this.color = this.getStarColor();
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
      }

      getStarColor() {
        const colors = [
          '#ffffff', // White
          '#f0f8ff', // Alice blue
          '#e6f3ff', // Light blue
          '#fff8dc', // Cornsilk
          '#f0f0f0', // Light gray
          '#ffd700', // Gold (for bright stars)
          '#87ceeb', // Sky blue
          '#dda0dd', // Plum
          '#ff6b6b', // Light red
          '#4ecdc4', // Turquoise
        ];
        return colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Move star
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.pulsePhase += this.pulseSpeed;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection;
        if (this.opacity > 0.8 || this.opacity < 0.3) { // Increased opacity range
          this.twinkleDirection *= -1;
        }
      }

      draw() {
        if (!isVisible) return; // Don't draw if not visible
        
        ctx.save();
        ctx.globalAlpha = this.opacity * 0.9; // Increased overall opacity
        
        if (this.type === 'shooting') {
          this.drawShootingStar();
        } else if (this.type === 'bright') {
          this.drawBrightStar();
        } else if (this.type === 'giant') {
          this.drawGiantStar();
        } else {
          this.drawNormalStar();
        }
        
        ctx.restore();
      }

      drawNormalStar() {
        // Main star
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15; // Increased blur for bigger glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced glow
        ctx.shadowBlur = 25; // Increased blur for bigger glow
        ctx.globalAlpha = this.opacity * 0.4; // Increased glow opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      drawBrightStar() {
        // Bright star with cross pattern
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 1;
        const size = this.size * pulse;

        // Outer glow
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 30; // Increased blur for bigger glow
        ctx.globalAlpha = this.opacity * 0.3; // Increased glow opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, size * 6, 0, Math.PI * 2);
        ctx.fill();

        // Main star
        ctx.globalAlpha = this.opacity * 0.9; // Increased main star opacity
        ctx.shadowBlur = 20; // Increased blur
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Cross pattern
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2; // Increased line width
        ctx.globalAlpha = this.opacity * 0.6; // Increased cross opacity
        ctx.beginPath();
        ctx.moveTo(this.x - size * 3, this.y);
        ctx.lineTo(this.x + size * 3, this.y);
        ctx.moveTo(this.x, this.y - size * 3);
        ctx.lineTo(this.x, this.y + size * 3);
        ctx.stroke();
      }

      drawGiantStar() {
        // Giant star with multiple layers and effects
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 1;
        const size = this.size * pulse * 2; // Make giant stars much bigger

        // Multiple glow layers
        for (let i = 4; i >= 1; i--) {
          ctx.shadowColor = this.color;
          ctx.shadowBlur = 40 + i * 10; // Very large blur
          ctx.globalAlpha = this.opacity * (0.1 + i * 0.05); // Layered opacity
          ctx.beginPath();
          ctx.arc(this.x, this.y, size * i, 0, Math.PI * 2);
          ctx.fill();
        }

        // Main giant star
        ctx.globalAlpha = this.opacity * 0.95;
        ctx.shadowBlur = 35;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Multiple cross patterns
        for (let i = 1; i <= 3; i++) {
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 3 + i;
          ctx.globalAlpha = this.opacity * (0.3 + i * 0.1);
          ctx.beginPath();
          ctx.moveTo(this.x - size * (2 + i), this.y);
          ctx.lineTo(this.x + size * (2 + i), this.y);
          ctx.moveTo(this.x, this.y - size * (2 + i));
          ctx.lineTo(this.x, this.y + size * (2 + i));
          ctx.stroke();
        }

        // Additional diagonal crosses
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.opacity * 0.4;
        ctx.beginPath();
        ctx.moveTo(this.x - size * 2, this.y - size * 2);
        ctx.lineTo(this.x + size * 2, this.y + size * 2);
        ctx.moveTo(this.x - size * 2, this.y + size * 2);
        ctx.lineTo(this.x + size * 2, this.y - size * 2);
        ctx.stroke();
      }

      drawShootingStar() {
        // Shooting star trail
        const trailLength = 80; // Increased trail length for bigger effect
        const gradient = ctx.createLinearGradient(
          this.x, this.y, 
          this.x - this.speedX * trailLength, this.y - this.speedY * trailLength
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4; // Increased line width
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.speedX * trailLength, this.y - this.speedY * trailLength);
        ctx.stroke();

        // Shooting star head
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 25; // Increased blur
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2); // Increased head size
        ctx.fill();
      }
    }

    // Create stars with different densities
    const stars = [];
    const numStars = Math.min(350, Math.floor((canvas.width * canvas.height) / 3000)); // Significantly increased star count
    
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    // Add occasional shooting stars
    let shootingStarTimer = 0;
    const shootingStarInterval = 2000; // Decreased interval for more frequent shooting stars

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enhanced gradient background with reduced opacity
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(26, 10, 82, 0.1)'); // Even darker
      gradient.addColorStop(0.5, 'rgba(5, 5, 5, 0.05)'); // Much darker
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.02)'); // Very dark
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle nebula effect with reduced opacity
      const time = Date.now() * 0.001;
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.1) * 100,
        canvas.height * 0.7 + Math.cos(time * 0.1) * 100,
        0,
        canvas.width * 0.3 + Math.sin(time * 0.1) * 100,
        canvas.height * 0.7 + Math.cos(time * 0.1) * 100,
        200
      );
      nebulaGradient.addColorStop(0, 'rgba(120, 119, 198, 0.02)'); // Even more reduced opacity
      nebulaGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      // Add occasional shooting stars
      shootingStarTimer += 16; // Assuming 60fps
      if (shootingStarTimer > shootingStarInterval && isVisible) {
        const shootingStar = new Star();
        shootingStar.type = 'shooting';
        shootingStar.x = Math.random() * canvas.width;
        shootingStar.y = Math.random() * canvas.height;
        shootingStar.speedX = (Math.random() - 0.5) * 3; // Increased speed
        shootingStar.speedY = (Math.random() - 0.5) * 3; // Increased speed
        shootingStar.size = Math.random() * 3 + 1.5; // Increased size
        stars.push(shootingStar);
        shootingStarTimer = 0;
      }

      // Remove old shooting stars
      for (let i = stars.length - 1; i >= 0; i--) {
        if (stars[i].type === 'shooting' && 
            (stars[i].x < -100 || stars[i].x > canvas.width + 100 || 
             stars[i].y < -100 || stars[i].y > canvas.height + 100)) {
          stars.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className={`star-background ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default StarBackground; 