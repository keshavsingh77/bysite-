
import React, { useState } from 'react';
import { NAVBAR_LINKS } from '../constants';
import { BloggerBlog } from '../types';

interface HeaderProps {
  blogInfo?: BloggerBlog;
  categories: string[];
}

const Header: React.FC<HeaderProps> = ({ blogInfo, categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900">InsightHub</span>
        </a>

        <div className="hidden md:flex items-center space-x-6 text-sm font-semibold">
          {NAVBAR_LINKS.map(link => (
            <a key={link.path} href={`#${link.path}`} className="text-gray-600 hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-900 focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-3 absolute w-full shadow-lg">
          {NAVBAR_LINKS.map(link => (
            <a key={link.path} href={`#${link.path}`} onClick={() => setIsOpen(false)} className="block text-gray-900 font-medium">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
