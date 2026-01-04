'use client'

import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-black border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center">
              <span className="text-white font-pixel text-lg">K</span>
            </div>
            <span className="font-pixel text-lg text-white tracking-widest">
              KARATE<span className="text-red-600">BROS</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-400 hover:text-white font-pixel text-xs tracking-wider transition-colors uppercase">Home</a>
            <a href="#mechanics" className="text-gray-400 hover:text-white font-pixel text-xs tracking-wider transition-colors uppercase">Controls</a>
            <a href="#characters" className="text-gray-400 hover:text-white font-pixel text-xs tracking-wider transition-colors uppercase">Fighters</a>
            <a href="#strategy" className="text-gray-400 hover:text-white font-pixel text-xs tracking-wider transition-colors uppercase">Strategy</a>
            <a href="#game" className="bg-white hover:bg-gray-200 text-black px-4 py-2 font-pixel text-xs uppercase transition-colors">
              Play Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-sm font-pixel text-white hover:bg-zinc-800 uppercase">Home</a>
            <a href="#game" className="block px-3 py-2 text-sm font-pixel text-red-500 hover:bg-zinc-800 uppercase">Play Now</a>
            <a href="#mechanics" className="block px-3 py-2 text-sm font-pixel text-gray-400 hover:text-white hover:bg-zinc-800 uppercase">Controls</a>
            <a href="#strategy" className="block px-3 py-2 text-sm font-pixel text-gray-400 hover:text-white hover:bg-zinc-800 uppercase">Strategy</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;