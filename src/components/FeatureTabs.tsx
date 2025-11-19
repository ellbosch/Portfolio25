import { useRef } from 'react';
import type { FC } from 'react';
import DeviceFrame from './DeviceFrame';
import VideoPlayer from './VideoPlayer';
import ScrollFade from './ScrollFade';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import {
  sfArkit,
  sfViewfinder,
  sfBoltFill,
  sfSliderHorizontal3,
  sfPhotoBadgeCheckmark,
  sfCubeFill,
  sfChevronLeft,
  sfChevronRight,
} from '@bradleyhodges/sfsymbols';

interface TabData {
  title: string;
  description: string;
  videoUrl: string;
  symbol?: string;
}

interface FeatureTabsProps {
  tabs: TabData[];
  delay?: number;
}

// Symbol mapping helper
const getSymbolIcon = (symbolName?: string) => {
  const symbolMap: Record<string, any> = {
    'arkit': sfArkit,
    'viewfinder': sfViewfinder,
    'bolt.fill': sfBoltFill,
    'slider.horizontal.3': sfSliderHorizontal3,
    'photo.badge.checkmark': sfPhotoBadgeCheckmark,
    'cube.fill': sfCubeFill,
    'chevron.left': sfChevronLeft,
    'chevron.right': sfChevronRight,
  };
  return symbolName ? symbolMap[symbolName] : null;
};

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
            className="overflow-x-scroll overflow-y-hidden scroll-smooth flex -mx-4 lg:w-screen lg:relative lg:left-1/2 lg:right-1/2 lg:-ml-[50vw] lg:-mr-[50vw] pl-4 pr-4 md:pl-18 md:pr-18 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-[max(2rem,calc((100vw-1280px)/2+2rem))]"
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
                  {tab.symbol && getSymbolIcon(tab.symbol) && (
                    <div className="flex justify-center mb-4">
                      <SFIcon
                        icon={getSymbolIcon(tab.symbol)!}
                        size={48}
                        className="text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
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
              <SFIcon
                icon={sfChevronLeft}
                size={24}
                className="text-gray-900 dark:text-white"
              />
            </button>
            <button
              onClick={scrollRight}
              className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll right"
            >
              <SFIcon
                icon={sfChevronRight}
                size={24}
                className="text-gray-900 dark:text-white"
              />
            </button>
          </div>

        </div>
      </div>
    </ScrollFade>
  );
};

export default FeatureTabs;
