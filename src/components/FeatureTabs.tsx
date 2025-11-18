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
                <div className="mt-8 w-[45vw] max-w-[712px]">
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

        </div>
      </div>
    </ScrollFade>
  );
};

export default FeatureTabs;
