
import React, { useState, useEffect } from 'react';
import { NAVBAR_LINKS } from '../constants';
import { BloggerBlog } from '../types';

interface HeaderProps {
  blogInfo?: BloggerBlog;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ blogInfo, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="#/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 truncate max-w-[200px] md:max-w-none">
                {blogInfo?.name || "BloggerCMS"}
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#/" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">Home</a>
            <div className="relative">
              <button 
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors focus:outline-none"
              >
                Categories
                <svg className={`ml-1 w-4 h-4 transition-transform ${showCategories ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-xl rounded-lg border border-gray-100 py-2 z-50">
                  {categories.slice(0, 8).map(cat => (
                    <a key={cat} href={`#/category/${encodeURIComponent(cat)}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                      {cat}
                    </a>
                  ))}
                  {categories.length > 8 && (
                    <div className="px-4 py-2 border-t text-[10px] text-gray-400 font-bold uppercase tracking-widest">More Categories Available</div>
                  )}
                </div>
              )}
            </div>
            {NAVBAR_LINKS.filter(l => l.name !== 'Home').map(link => (
              <a key={link.path} href={`#${link.path}`} className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none p-2">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg py-4 px-6 space-y-4 animate-in fade-in slide-in-from-top-2">
            <a href="#/" onClick={() => setIsOpen(false)} className="block text-base font-medium text-gray-900">Home</a>
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map(cat => (
                  <a key={cat} href={`#/category/${encodeURIComponent(cat)}`} onClick={() => setIsOpen(false)} className="text-sm text-gray-700">
                    {cat}
                  </a>
                ))}
              </div>
            </div>
            {NAVBAR_LINKS.filter(l => l.name !== 'Home').map(link => (
              <a key={link.path} href={`#${link.path}`} onClick={() => setIsOpen(false)} className="block text-base font-medium text-gray-900">
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
