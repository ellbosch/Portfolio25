import { useState } from 'react';
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

  return (
    <ScrollFade delay={delay}>
      <div className="w-full">
        {/* Desktop: Row layout, Mobile: Column layout (content first) */}
        <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          {/* Navigation Links - Horizontal scroll on mobile, Vertical stack on desktop */}
          <nav className="flex md:flex-col gap-4 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:min-w-[200px]">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`
                  px-6 py-3 text-left whitespace-nowrap md:whitespace-normal
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

          {/* Content Area */}
          <div className="flex-1 relative min-h-[600px] md:min-h-[500px]">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`
                  transition-all duration-500
                  ${
                    index === activeTab
                      ? 'opacity-100 translate-y-0 relative'
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }
                `}
              >
                {/* Title and Description */}
                <div className="text-center mb-12">
                  <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                    {tab.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {tab.description}
                  </p>
                </div>

                {/* Two Side-by-Side iPad Videos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                  <div className="w-full">
                    <DeviceFrame>
                      <VideoPlayer
                        videoUrl={tab.leftVideoUrl}
                        autoplay={true}
                        loop={true}
                        muted={true}
                      />
                    </DeviceFrame>
                  </div>
                  <div className="w-full">
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
        </div>
      </div>
    </ScrollFade>
  );
};

export default FeatureTabs;
