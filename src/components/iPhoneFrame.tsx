import { ReactNode } from 'react';
import iPhoneBezel from '../assets/iphone-17-pro-bezel.png';

interface IPhoneFrameProps {
  children: ReactNode;
}

const IPhoneFrame = ({ children }: IPhoneFrameProps) => {
  return (
    <div className="relative w-full max-w-[280px] md:max-w-md mx-auto">
      {/* Container maintains aspect ratio for iPhone (approx 19.5:9) */}
      <div className="relative w-full" style={{ paddingBottom: '216%' }}>
        {/* Video content layer */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full px-[5%] py-[10.5%]">
            <div className="w-full h-full rounded-[6%] overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        {/* iPhone bezel overlay */}
        <img
          src={iPhoneBezel}
          alt="iPhone frame"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
};

export default IPhoneFrame;
