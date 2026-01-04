import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 py-12 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-sm">
          <div className="col-span-2">
            <h4 className="font-pixel text-white mb-4 tracking-widest">
              KARATE<span className="text-red-600">BROS</span>
            </h4>
            <p className="mb-4 max-w-sm">
              The #1 destination for <strong>Karate Bros online</strong>. We provide the best <strong>Karate Bros unblocked</strong> experience for gamers everywhere. No ads, no lag, just pure fighting.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#game" className="hover:text-red-500 transition-colors">Play Game</a></li>
              <li><a href="#mechanics" className="hover:text-red-500 transition-colors">Controls</a></li>
              <li><a href="#characters" className="hover:text-red-500 transition-colors">Characters</a></li>
              <li><a href="#strategy" className="hover:text-red-500 transition-colors">Strategy Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">DMCA</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; 2026 Karate Bros Fan Portal. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 font-mono">
            <span>KARATE BROS OFFICIAL</span>
            <span>UNBLOCKED GAMES</span>
            <span>IO GAMES</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;