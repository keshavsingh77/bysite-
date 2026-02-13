
import React from 'react';
import { FOOTER_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-10 flex flex-col items-center">
          <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-3xl font-black text-gray-900 mb-4">InsightHub</h3>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            Delivering modern perspectives through high-performance headless architecture.
          </p>
        </div>

        <div className="flex justify-center space-x-8 mb-12">
          {['globe', 'chat', 'at-symbol'].map(icon => (
            <button key={icon} className="p-3 text-gray-400 hover:text-primary transition-all">
              <div className="w-6 h-6 border-2 border-current rounded-full"></div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12 text-[11px] font-black uppercase tracking-[0.15em] text-gray-500">
          <a href="#/" className="hover:text-primary transition-colors">Home</a>
          {FOOTER_LINKS.map(link => (
            <a key={link.path} href={`#${link.path}`} className="hover:text-primary transition-colors">{link.name}</a>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-[10px] font-bold text-gray-400 tracking-wider">
            © 2024 INSIGHTHUB BLOG SERVICES. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-gray-300 mt-2 uppercase tracking-[0.2em]">
            Powered by Blogger API (ID: 6924208631263306852)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
