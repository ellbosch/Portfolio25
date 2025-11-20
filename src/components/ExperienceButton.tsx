import React from 'react';

interface ExperienceButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ExperienceButton: React.FC<ExperienceButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 mb-12 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-bold mb-4 cursor-pointer"
    >
      {children} - Details
      <svg className="w-5 h-5" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="10" fill="#2563eb" />
        <path d="M10 6 L10 14 M6 10 L14 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  );
};

export default ExperienceButton;
