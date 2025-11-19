import React from 'react';
import { SFIcon } from '@bradleyhodges/sfsymbols-react';
import { sfBrandGithub, sfBrandLinkedin, sfTextDocument, sfEnvelope } from '@bradleyhodges/sfsymbols';

const Header = () => {
  // Email obfuscation - split into parts to avoid scraping
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const user = 'elliot.boschwitz';
    const domain = 'gmail.com';
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
            Elliot Boschwitz
          </a>
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href="https://www.linkedin.com/in/elliotboschwitz/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 md:px-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              aria-label="LinkedIn"
            >
              <SFIcon icon={sfBrandLinkedin} size={20} />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
            <a
              href="https://github.com/ellbosch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 md:px-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              aria-label="GitHub"
            >
              <SFIcon icon={sfBrandGithub} size={20} />
              <span className="hidden md:inline">GitHub</span>
            </a>
            <a
              href="#"
              onClick={handleEmailClick}
              className="flex items-center gap-2 px-3 py-2.5 md:px-5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
              aria-label="Email"
            >
              <SFIcon icon={sfEnvelope} size={20} />
              <span className="hidden md:inline">Email</span>
            </a>
            <a
              href="/resume"
              className="flex items-center gap-2 px-3 py-2.5 md:px-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors font-medium"
            >
              <SFIcon icon={sfTextDocument} size={20} />
              <span className="hidden md:inline">Resume</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
