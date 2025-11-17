import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRotatingFrameProps {
  children: ReactNode;
}

const ScrollRotatingFrame = ({ children }: ScrollRotatingFrameProps) => {
  const ang = 40;
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(ang); // Start tilted back (positive = top tilted back)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element has scrolled into view
      // When top of element is at bottom of screen: progress = 0
      // When element is fully in view: progress = 1
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Start rotating when element enters viewport
      const startPoint = windowHeight;
      const endPoint = windowHeight / 2 - elementHeight / 3;

      const scrollProgress = (startPoint - elementTop) / (startPoint - endPoint);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Map progress from 50deg (top tilted back) to 0deg (flat)
      const newRotation = ang - (clampedProgress * ang);
      setRotation(newRotation);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          transform: `rotateX(${rotation}deg)`,
          transformOrigin: 'top center',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollRotatingFrame;
