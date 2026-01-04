'use client'

import React, { useRef } from 'react';

const GameFrame: React.FC = () => {
  // 直接加载游戏，页面打开就显示
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
            {/* 直接加载游戏 iframe */}
            <iframe
              ref={iframeRef}
              src="https://karatebros.io"
              title="Karate Bros Online Game"
              className="w-full h-full"
              allow="autoplay; fullscreen; gamepad; accelerometer; focus-without-user-activation *"
              style={{ border: 'none' }}
              loading="eager"
            />
            <button
              onClick={handleFullscreen}
              className="absolute bottom-4 right-4 bg-black/50 hover:bg-red-600 text-white px-3 py-1 font-pixel text-[10px] border border-white/20 z-10"
            >
              FULLSCREEN
            </button>
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