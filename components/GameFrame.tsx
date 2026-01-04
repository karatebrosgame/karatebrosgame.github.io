'use client'

import React, { useState, useRef } from 'react';

const GameFrame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section id="game" className="w-full py-8 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Title Area */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl md:text-5xl font-pixel text-white mb-2 tracking-widest">
              <span className="text-red-600">KARATE BROS</span>
            </h1>
            <p className="font-mono text-gray-500 text-xs md:text-sm tracking-[0.2em] uppercase">
              Official Online Game • Unblocked 2026
            </p>
          </div>
          
          {/* Game Container - Sharp edges, simple border */}
          <div className="relative w-full max-w-5xl aspect-video bg-black border-4 border-white/10">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
                
                {/* Pixel Icon */}
                <div className="mb-6">
                   <div className="w-20 h-20 relative">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-white">
                        <path d="M4 4h16v16H4V4zm2 2v4h4V6H6zm8 0v4h4V6h-4zM6 14h4v4H6v-4zm8 0h4v4h-4v-4z"/>
                      </svg>
                   </div>
                </div>

                <h2 className="text-xl md:text-3xl font-pixel text-white mb-12 text-center tracking-widest animate-pulse">
                  YOUR BROS GAME IS LOADING
                </h2>

                {/* Character Sprites Placeholder */}
                <div className="flex gap-8 mb-12">
                  <div className="w-12 h-16 bg-red-600"></div>
                  <div className="w-12 h-16 bg-blue-600"></div>
                  <div className="w-12 h-16 bg-yellow-500"></div>
                  <div className="w-12 h-16 bg-green-600"></div>
                </div>

                <button 
                  onClick={() => setIsPlaying(true)}
                  className="bg-red-600 hover:bg-red-700 text-white text-base font-pixel py-4 px-12 transition-colors"
                >
                  PLAY NOW
                </button>
              </div>
            ) : (
              <>
                <iframe
                  ref={iframeRef}
                  src="https://karatebros.io"
                  title="Karate Bros Online Game"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; gamepad; accelerometer; focus-without-user-activation *"
                  style={{ border: 'none' }}
                />
                <button
                  onClick={handleFullscreen}
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-red-600 text-white px-3 py-1 font-pixel text-[10px] border border-white/20"
                >
                  FULLSCREEN
                </button>
              </>
            )}
          </div>
          
          {/* Status Bar */}
          <div className="w-full max-w-5xl mt-2 flex justify-between text-[10px] md:text-xs text-gray-600 font-pixel uppercase">
            <span>Server: US-East-1</span>
            <span>Version: v2.4.0</span>
            <span className="text-green-600">Status: ONLINE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameFrame;