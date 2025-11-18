import { useRef } from 'react';
import type { FC } from 'react';
import DeviceFrame from './DeviceFrame';
import VideoPlayer from './VideoPlayer';
import ScrollFade from './ScrollFade';

interface TabData {
  title: string;
  description: string;
  videoUrl: string;
}

interface FeatureTabsProps {
  tabs: TabData[];
  delay?: number;
}

const FeatureTabs: FC<FeatureTabsProps> = ({ tabs, delay = 0 }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.4;
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.4;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <ScrollFade delay={delay}>
      <div className="w-full">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Carousel Container - Continuous scroll */}
          <div
            ref={carouselRef}
            className="overflow-x-scroll overflow-y-hidden scroll-smooth flex -mx-4 lg:w-screen lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] pl-4 pr-4 md:pl-18 md:pr-18 lg:pl-[calc((100vw-1280px)/2+2rem)]"
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
                className="flex-shrink-0 flex flex-col pr-8"
              >
                {/* Single iPad Video */}
                <div className="flex items-center w-[45vw] max-w-[712px]">
                  <DeviceFrame>
                    <VideoPlayer
                      videoUrl={tab.videoUrl}
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </DeviceFrame>
                </div>
                {/* Header and Description below video */}
                <div className="mt-8 w-[45vw] max-w-[712px] text-center px-4">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">
                    {tab.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                    {tab.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={scrollLeft}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6 text-gray-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </ScrollFade>
  );
};

export default FeatureTabs;
