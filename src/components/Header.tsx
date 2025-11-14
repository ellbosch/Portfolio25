const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-gray-900">
            Elliot Boschwitz
          </a>
          <ul className="flex gap-6">
            <li>
              <button
                onClick={() => scrollToSection('ios-projects')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                iOS
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('ai-projects')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                AI
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('microsoft')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Microsoft
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
