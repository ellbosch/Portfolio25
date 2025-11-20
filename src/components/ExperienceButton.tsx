import React from 'react';

interface ExperienceButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ExperienceButton: React.FC<ExperienceButtonProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium mb-4"
    >
      {children}
      <svg className="w-5 h-5" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="10" fill="#2563eb" />
        <path d="M10 5 L10 15 M5 10 L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
};

export default ExperienceButton;
