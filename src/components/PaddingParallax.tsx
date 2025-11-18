import { ReactNode, useEffect, useRef, useState } from 'react';

interface PaddingParallaxProps {
  children: ReactNode;
  distance?: number; // Total distance to move in pixels (default: 200px)
  reverse?: boolean; // If true, starts lower and moves up; otherwise starts higher and moves down
}

const PaddingParallax = ({ children, distance = 600, reverse = false }: PaddingParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(reverse ? distance : -distance);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element has scrolled through the viewport
      // 0 = just entering from bottom, converges earlier with multiplier
      const scrollProgress = ((windowHeight - rect.top) / (windowHeight + rect.height)) * 2;

      if (reverse) {
        // Reverse: start with positive translateY (lower), move up continuously
        const newTranslateY = distance - (scrollProgress * distance);
        setTranslateY(newTranslateY);
      } else {
        // Normal: start with negative translateY (higher), move down continuously
        const newTranslateY = -distance + (scrollProgress * distance);
        setTranslateY(newTranslateY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [distance, reverse]);

  return (
    <div ref={ref}>
      <div
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PaddingParallax;
