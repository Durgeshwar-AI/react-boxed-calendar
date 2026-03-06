import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs sm:text-sm">
                📅
              </span>
            </div>
            <span className="font-bold text-sm sm:text-lg md:text-xl text-gray-900 truncate">
              RBC
            </span>
            <span className="hidden sm:inline font-bold text-sm sm:text-lg md:text-xl text-gray-900">
              Calendar
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("modes")}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Modes
            </button>
            <button
              onClick={() => scrollToSection("themes")}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Themes
            </button>
            <button
              onClick={() => scrollToSection("sizes")}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Sizes
            </button>
            <button
              onClick={() => scrollToSection("constraints")}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Constraints
            </button>
            <button
              onClick={() => scrollToSection("localization")}
              className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Localization
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <a
            href="https://www.npmjs.com/package/react-boxed-calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-block px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            npm
          </a>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-200 space-y-2">
            <button
              onClick={() => scrollToSection("modes")}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              Modes
            </button>
            <button
              onClick={() => scrollToSection("themes")}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              Themes
            </button>
            <button
              onClick={() => scrollToSection("sizes")}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              Sizes
            </button>
            <button
              onClick={() => scrollToSection("constraints")}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              Constraints
            </button>
            <button
              onClick={() => scrollToSection("localization")}
              className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors text-sm"
            >
              Localization
            </button>
            <a
              href="https://www.npmjs.com/package/react-boxed-calendar"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors mt-2"
            >
              npm
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
