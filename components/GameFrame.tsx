'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const GameFrame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 5张游戏图片
  const gameImages = [
    '/karate-bros-free.png',
    '/karate-bros-game.png',
    '/karate-bros-github.png',
    '/karate-bros-io.png',
    '/karate-bros-online.png',
  ];

  // 自动轮播图片
  useEffect(() => {
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % gameImages.length);
      }, 3000); // 每3秒切换一张
      return () => clearInterval(interval);
    }
  }, [isPlaying, gameImages.length]);

  const handlePlayClick = () => {
    setIsLoading(true);
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
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
          <div className="relative w-full max-w-5xl aspect-video bg-black border-4 border-white/10 cursor-pointer group">
            {!isPlaying ? (
              <>
                {/* 图片轮播预览 - 点击加载游戏 */}
                <div 
                  onClick={handlePlayClick}
                  className="relative w-full h-full bg-black overflow-hidden cursor-pointer"
                >
                  {/* 当前显示的图片 */}
                  <Image
                    src={gameImages[currentImageIndex]}
                    alt={`Karate Bros Game Screenshot ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                    priority={currentImageIndex === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                  />
                  
                  {/* 图片指示器 */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {gameImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'bg-red-600 w-8'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* 点击提示覆盖层 */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-white animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="font-pixel text-white text-lg md:text-2xl tracking-widest">
                        CLICK TO PLAY GAME
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* 加载状态 */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                    <div className="text-center">
                      <div className="mb-4">
                        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      </div>
                      <p className="font-pixel text-white text-sm tracking-widest">
                        LOADING GAME...
                      </p>
                    </div>
                  </div>
                )}
                {/* 游戏 iframe - 懒加载 */}
                <iframe
                  ref={iframeRef}
                  src="https://karatebros.io"
                  title="Karate Bros Online Game"
                  className="w-full h-full"
                  allow="autoplay; fullscreen; gamepad; accelerometer; focus-without-user-activation *"
                  style={{ border: 'none' }}
                  loading="lazy"
                  onLoad={handleIframeLoad}
                />
                <button
                  onClick={handleFullscreen}
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-red-600 text-white px-3 py-1 font-pixel text-[10px] border border-white/20 z-10 transition-colors"
                  aria-label="Fullscreen"
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