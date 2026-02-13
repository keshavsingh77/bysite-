
import React from 'react';
import { FOOTER_LINKS, BLOG_ID } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-20 pb-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-12 flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Daily Update</h3>
          <p className="text-gray-500 max-w-sm font-medium leading-relaxed">
            Your source for modern perspectives and the latest insights powered by headless architecture.
          </p>
        </div>

        {/* Footer Navigation Buttons - Stylized */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#/" className="btn-footer">Home Feed</a>
          {FOOTER_LINKS.map(link => (
            <a key={link.path} href={`#${link.path}`} className="btn-footer">{link.name}</a>
          ))}
        </div>

        <div className="pt-12 border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-[11px] font-bold text-gray-500 tracking-[0.2em] uppercase">
              © Copyright 2026 Daily Update Blog Services. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                Powered by Blogger
              </span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 border border-gray-200">
                API ID: {BLOG_ID}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
