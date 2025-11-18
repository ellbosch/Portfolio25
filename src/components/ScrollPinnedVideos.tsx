import { useEffect, useRef, useState } from 'react';
import IPhoneFrame from './iPhoneFrame';
import VideoPlayer from './VideoPlayer';

interface VideoSection {
  videoUrl: string;
  title: string;
  description: string;
}

interface ScrollPinnedVideosProps {
  sections: VideoSection[];
}

const ScrollPinnedVideos = ({ sections }: ScrollPinnedVideosProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerHeight = containerRef.current.offsetHeight;

      // Calculate scroll progress through the container
      const scrollStart = rect.top;
      const scrollEnd = rect.top - windowHeight + containerHeight;

      // Progress from 0 to 1 as user scrolls through the container
      const scrollProgress = Math.max(0, Math.min(1, -scrollStart / (containerHeight - windowHeight)));
      setProgress(scrollProgress);

      // Determine which section should be active based on scroll progress
      const sectionIndex = Math.min(
        Math.floor(scrollProgress * sections.length),
        sections.length - 1
      );
      setActiveIndex(sectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  return (
    <div ref={containerRef} className="relative" style={{ minHeight: `${sections.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Video side - left */}
            <div className="order-2 md:order-1">
              <IPhoneFrame>
                <VideoPlayer
                  videoUrl={sections[activeIndex].videoUrl}
                  autoplay={true}
                  loop={true}
                  muted={true}
                />
              </IPhoneFrame>
            </div>

            {/* Text side - right */}
            <div className="order-1 md:order-2">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-8 absolute inset-0'
                  }`}
                >
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    {section.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollPinnedVideos;
