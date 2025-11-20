import React from 'react';

interface TerminalFrameProps {
  children: React.ReactNode;
}

const TerminalFrame: React.FC<TerminalFrameProps> = ({ children }) => {
  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
        {/* Traffic light buttons */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {/* Terminal title */}
        <div className="flex-1 text-center text-gray-400 text-sm font-mono">
          Terminal
        </div>
      </div>

      {/* Terminal Content */}
      <div className="bg-gray-950">
        {children}
      </div>
    </div>
  );
};

export default TerminalFrame;
