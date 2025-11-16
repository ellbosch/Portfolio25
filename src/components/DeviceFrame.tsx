import { ReactNode } from 'react';
import iPadBezel from '../assets/ipad-pro-bezel.png';

interface DeviceFrameProps {
  children: ReactNode;
}

const DeviceFrame = ({ children }: DeviceFrameProps) => {
  return (
    <div className="relative inline-block w-full max-w-4xl mx-auto">
      {/* Container maintains aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '75%' }}> {/* 4:3 aspect ratio */}
        {/* Video content layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full px-[4%] py-[0%] translate-y-13">
            {children}
          </div>
        </div>
        {/* iPad Pro bezel overlay */}
        <img
          src={iPadBezel}
          alt="iPad Pro frame"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default DeviceFrame;
