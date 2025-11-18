import React from 'react';
import type { FC } from 'react';
import DeviceFrame from './DeviceFrame';
import VideoPlayer from './VideoPlayer';
import ScrollFade from './ScrollFade';

interface FeatureSectionProps {
  title: string;
  description: string;
  leftVideoUrl: string;
  rightVideoUrl: string;
  delay?: number;
}

const FeatureSection: FC<FeatureSectionProps> = ({
  title,
  description,
  leftVideoUrl,
  rightVideoUrl,
  delay = 0,
}) => {
  return (
    <ScrollFade delay={delay}>
      <div className="w-full">
        {/* Title and Description */}
        <div className="text-center mb-12">
          <h3 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Two Side-by-Side iPad Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="w-full">
            <DeviceFrame>
              <VideoPlayer
                videoUrl={leftVideoUrl}
                autoplay={true}
                loop={true}
                muted={true}
              />
            </DeviceFrame>
          </div>
          <div className="w-full">
            <DeviceFrame>
              <VideoPlayer
                videoUrl={rightVideoUrl}
                autoplay={true}
                loop={true}
                muted={true}
              />
            </DeviceFrame>
          </div>
        </div>
      </div>
    </ScrollFade>
  );
};

export default FeatureSection;
