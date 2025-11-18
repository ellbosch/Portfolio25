import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import DeviceFrame from './DeviceFrame';
import VideoPlayer from './VideoPlayer';
import ScrollFade from './ScrollFade';

interface TabData {
  title: string;
  description: string;
  leftVideoUrl: string;
  rightVideoUrl: string;
}

interface FeatureTabsProps {
  tabs: TabData[];
  delay?: number;
}

const FeatureTabs: FC<FeatureTabsProps> = ({ tabs, delay = 0 }) => {
  const [activeTab, setActiveTab] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToTab = (index: number) => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const targetScroll = (scrollWidth / tabs.length) * index;
      carouselRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft;
      const containerWidth = carouselRef.current.clientWidth;
      const itemWidth = carouselRef.current.scrollWidth / tabs.length;

      // Calculate which item is most visible (using 60% threshold past left edge)
      const thresholdPosition = scrollLeft + containerWidth * 0.6;
      const newIndex = Math.floor(thresholdPosition / itemWidth);

      // Clamp to valid range
      const clampedIndex = Math.max(0, Math.min(tabs.length - 1, newIndex));
      setActiveTab(clampedIndex);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <ScrollFade delay={delay}>
      <div className="w-full">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Carousel Container - Continuous scroll */}
          <div
            ref={carouselRef}
            className="overflow-x-scroll overflow-y-hidden scroll-smooth flex h-[clamp(480px,65vh,800px)] -mx-4 lg:w-screen lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] pl-4 pr-4 md:pl-18 md:pr-18 lg:pl-[calc((100vw-1280px)/2+2rem)]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {tabs.map((tab, index) => (
              <div
                key={index}
                className="flex-shrink-0 h-full flex overflow-hidden"
              >
                {/* Two Side-by-Side iPad Videos */}
                <div className="flex gap-4 pr-4 overflow-hidden">
                  <div className="flex items-center w-[45vw] max-w-[712px]">
                    <DeviceFrame>
                      <VideoPlayer
                        videoUrl={tab.leftVideoUrl}
                        autoplay={true}
                        loop={true}
                        muted={true}
                      />
                    </DeviceFrame>
                  </div>
                  <div className="flex items-center w-[45vw] max-w-[712px]">
                    <DeviceFrame>
                      <VideoPlayer
                        videoUrl={tab.rightVideoUrl}
                        autoplay={true}
                        loop={true}
                        muted={true}
                      />
                    </DeviceFrame>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Title and Description - Fixed height */}
          <div className="text-center h-32 flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {tabs[activeTab].title}
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {tabs[activeTab].description}
            </p>
          </div>

          {/* Navigation Links - Horizontal stack */}
          <nav className="flex gap-4 overflow-x-auto pb-2 justify-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => scrollToTab(index)}
                className={`
                  px-6 py-3 text-center whitespace-nowrap
                  transition-colors duration-300 rounded-lg
                  ${
                    index === activeTab
                      ? 'text-gray-900 dark:text-white font-semibold bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }
                `}
              >
                <span className="text-xl md:text-2xl">{tab.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </ScrollFade>
  );
};

export default FeatureTabs;
