import { useRef, useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import DeviceFrame from './DeviceFrame';
import VideoPlayer from './VideoPlayer';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import {
  sfArkit,
  sfViewfinder,
  sfTachometer,
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
  posterUrl?: string;
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
    'tachometer': sfTachometer,
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = useCallback(() => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    // Check if we can scroll left (not at the start)
    setCanScrollLeft(scrollLeft > 1);

    // Check if we can scroll right (not at the end)
    // Adding a small tolerance (1px) to handle floating point precision
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Check initial scroll position
    checkScrollPosition();

    // Add scroll event listener
    carousel.addEventListener('scroll', checkScrollPosition);

    // Add resize event listener to handle window resizing
    window.addEventListener('resize', checkScrollPosition);

    // Recheck after a short delay to account for content loading
    const timeoutId = setTimeout(checkScrollPosition, 100);

    return () => {
      carousel.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      clearTimeout(timeoutId);
    };
  }, [tabs, checkScrollPosition]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = carouselRef.current.clientWidth * (isMobile ? 0.75 : 0.4);
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const isMobile = window.innerWidth < 768;
      const scrollAmount = carouselRef.current.clientWidth * (isMobile ? 0.75 : 0.4);
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full">
        <div className="flex flex-col gap-4">
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
                className="flex-shrink-0 flex flex-col pr-4"
              >
                {/* Single iPad Video */}
                <div className="flex items-center w-[75vw] md:w-[55vw] max-w-[712px]">
                  <DeviceFrame>
                    <VideoPlayer
                      videoUrl={tab.videoUrl}
                      posterUrl={tab.posterUrl}
                      autoplay={true}
                      loop={true}
                      muted={true}
                    />
                  </DeviceFrame>
                </div>
                {/* Header and Description below video */}
                <div className="mt-2 md:mt-4 w-[75vw] md:w-[55vw] max-w-[712px] text-center px-2 md:px-4">
                  <h3 className="text-base md:text-3xl font-bold mb-3 text-gray-900 dark:text-white flex items-start justify-center gap-2 md:gap-3">
                    {tab.symbol && getSymbolIcon(tab.symbol) && (
                      <>
                        <SFIcon
                          icon={getSymbolIcon(tab.symbol)!}
                          size={20}
                          className="text-gray-900 dark:text-white flex-shrink-0 mt-0.5 md:hidden"
                        />
                        <SFIcon
                          icon={getSymbolIcon(tab.symbol)!}
                          size={32}
                          className="text-gray-900 dark:text-white flex-shrink-0 mt-1 hidden md:block"
                        />
                      </>
                    )}
                    <span>{tab.title}</span>
                  </h3>
                  <p className="text-base md:text-xl text-gray-600 dark:text-gray-300">
                    {tab.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center md:justify-end gap-3">
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full transition-all duration-200 ${
                canScrollLeft
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer opacity-100'
                  : 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-30'
              }`}
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
              disabled={!canScrollRight}
              className={`p-3 rounded-full transition-all duration-200 ${
                canScrollRight
                  ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer opacity-100'
                  : 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-30'
              }`}
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
  );
};

export default FeatureTabs;
