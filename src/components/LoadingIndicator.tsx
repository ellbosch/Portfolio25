import { FC } from 'react';

interface LoadingIndicatorProps {
  size?: number;
  color?: string;
  className?: string;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  size = 48,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading video"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="15"
          opacity="0.25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="15"
        />
      </svg>
    </div>
  );
};

export default LoadingIndicator;
