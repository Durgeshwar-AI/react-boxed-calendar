const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📅</span>
            </div>
            <span className="font-bold text-xl text-gray-900">React Boxed Calendar</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('modes')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Modes
            </button>
            <button 
              onClick={() => scrollToSection('themes')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Themes
            </button>
            <button 
              onClick={() => scrollToSection('sizes')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Sizes
            </button>
            <button 
              onClick={() => scrollToSection('constraints')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Constraints
            </button>
            <button 
              onClick={() => scrollToSection('localization')}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Localization
            </button>
          </div>

          <a 
            href="https://www.npmjs.com/package/react-boxed-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            npm
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
