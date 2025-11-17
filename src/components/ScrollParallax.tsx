import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number; // Multiplier for parallax effect (0.5 = half speed, 1 = normal speed)
  mode?: 'transform' | 'padding'; // Parallax implementation mode
}

const ScrollParallax = ({ children, speed = 0.5, mode = 'transform' }: ScrollParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.scrollY;

      if (mode === 'padding') {
        // For padding mode: Use negative margin to create slower scroll effect
        // Elements appear to scroll slower than the page
        const marginOffset = scrolled * (speed - 1);
        setOffset(marginOffset);
      } else {
        // For transform mode: calculate how much to offset based on scroll position
        // The element moves slower (or faster) than the normal scroll
        const parallaxOffset = scrolled * (1 - speed);
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, mode]);

  if (mode === 'padding') {
    return (
      <div ref={ref}>
        <div
          style={{
            marginTop: `${offset}px`,
            transition: 'margin 0.1s ease-out',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <div
        style={{
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollParallax;
