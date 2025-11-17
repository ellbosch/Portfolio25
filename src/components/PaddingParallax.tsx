import { ReactNode, useEffect, useRef, useState } from 'react';

interface PaddingParallaxProps {
  children: ReactNode;
  totalPadding?: number; // Total padding to redistribute (default: 100px)
  minPadding?: number;
  reverse?: boolean; // If true, starts with bottom padding instead of top
}

const PaddingParallax = ({ children, totalPadding = 400, minPadding = 0, reverse = false }: PaddingParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [paddingTop, setPaddingTop] = useState(reverse ? minPadding : totalPadding);
  const [paddingBottom, setPaddingBottom] = useState(reverse ? totalPadding : minPadding);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element has scrolled through the viewport
      // 0 = just entering from bottom, 1 = just leaving from top
      const scrollProgress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));

      if (reverse) {
        // Reverse: start with bottom padding, shift to top as you scroll
        const newPaddingTop = scrollProgress * totalPadding;
        const newPaddingBottom = totalPadding - newPaddingTop;
        setPaddingTop(newPaddingTop);
        setPaddingBottom(newPaddingBottom);
      } else {
        // Normal: start with top padding, shift to bottom as you scroll
        const newPaddingBottom = scrollProgress * totalPadding;
        const newPaddingTop = totalPadding - newPaddingBottom;
        setPaddingTop(newPaddingTop);
        setPaddingBottom(newPaddingBottom);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalPadding, reverse]);

  return (
    <div ref={ref}>
      <div
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          transition: 'padding 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PaddingParallax;
