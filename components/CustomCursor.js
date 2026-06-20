import { useEffect, useRef } from 'react';

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX - 4 + 'px';
      dot.style.top = mouseY - 4 + 'px';
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX - 20 + 'px';
      ring.style.top = ringY - 20 + 'px';
      requestAnimationFrame(animate);
    };

    const handleMouseEnter = () => {
      dot.style.transform = 'scale(2)';
      ring.style.transform = 'scale(1.5)';
      ring.style.borderColor = '#ec4899';
    };

    const handleMouseLeave = () => {
      dot.style.transform = 'scale(1)';
      ring.style.transform = 'scale(1)';
      ring.style.borderColor = 'rgba(99, 102, 241, 0.5)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, .glass-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}

export default CustomCursor;
