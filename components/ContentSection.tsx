import React from 'react';
import Image from 'next/image';

const ContentSection: React.FC = () => {
  const gameImages = [
    { src: '/karate-bros-free.png', alt: 'Karate Bros Free Game' },
    { src: '/karate-bros-game.png', alt: 'Karate Bros Game' },
    { src: '/karate-bros-github.png', alt: 'Karate Bros GitHub' },
    { src: '/karate-bros-io.png', alt: 'Karate Bros IO' },
    { src: '/karate-bros-online.png', alt: 'Karate Bros Online' },
  ];

  return (
    <div className="bg-black text-gray-300 pb-24 font-sans leading-relaxed">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Navigation / TOC */}
        <div className="border-y border-white/10 py-6 mb-12">
          <h3 className="font-pixel text-xs text-gray-500 mb-4 uppercase tracking-widest">Quick Navigation</h3>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-red-500">
            <a href="#about" className="hover:text-white hover:underline">About the Game</a>
            <a href="#mechanics" className="hover:text-white hover:underline">Game Mechanics</a>
            <a href="#characters" className="hover:text-white hover:underline">Character Guide</a>
            <a href="#unblocked" className="hover:text-white hover:underline">Unblocked Access</a>
            <a href="#strategy" className="hover:text-white hover:underline">Pro Strategy</a>
            <a href="#faq" className="hover:text-white hover:underline">FAQ</a>
          </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          
          <h1 className="text-4xl md:text-5xl font-display text-white mb-8 tracking-wide">
            The Comprehensive Guide to <span className="text-red-600">Karate Bros</span>
          </h1>

          {/* Intro Block */}
          <div className="mb-12 text-lg text-gray-200">
            <p className="mb-6">
              In the vast landscape of browser-based fighting games, few titles have managed to capture the raw energy, competitive depth, and sheer fun of the arcade era quite like <strong>Karate Bros</strong>. Welcome to the definitive hub for everything related to this pixel-art phenomenon. Whether you are a veteran searching for the latest frame data on your favorite <strong>Karate Bros game</strong> character, a student looking to play <strong>Karate Bros unblocked</strong> during a study break, or a newcomer wondering what all the hype is about, you have arrived at the official source.
            </p>
            <p>
              This comprehensive guide will take you through every aspect of the <strong>Karate Bros online</strong> experience, from basic movement to advanced "io" style multiplayer tactics. We will explore why terms like <strong>Karate Bros crazy games</strong> are trending, analyze the rise of the popular <strong>Karate Bros girl</strong> fighters, and provide you with a roadmap to becoming a champion in the arena.
            </p>
          </div>

          <hr className="border-white/10 my-12" />

          {/* SECTION 1: THE PHENOMENON */}
          <section id="about" className="mb-16">
            <h2 className="text-3xl font-display text-white mb-6 text-red-600">1. What is Karate Bros?</h2>
            
            <p className="mb-4">
              <strong>Karate Bros</strong> is not just another fighting game; it is a tribute to the golden age of beat-'em-ups, reimagined for the modern web. Developed with a focus on accessibility and depth, the <strong>Karate Bros game</strong> allows players to jump instantly into action without the need for massive downloads or expensive consoles.
            </p>

            {/* Image 1: karate-bros-github.png */}
            <div className="my-8 relative w-full aspect-video bg-black border-2 border-white/10 overflow-hidden rounded">
              <Image
                src={gameImages[2].src}
                alt={gameImages[2].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">The Core Philosophy</h3>
            <p className="mb-4">
              At its heart, <strong>Karate Bros official</strong> gameplay is built on the "easy to learn, hard to master" philosophy. The controls are simple enough for anyone to mash buttons and have fun, but the underlying engine features hitboxes, frame advantages, and stamina management that rival top-tier esports titles. This duality is what makes <strong>Karate Bros online</strong> so addictive. You can play a casual match with a friend on a shared keyboard, or dive into the <strong>Karate Bros io</strong> ranked mode to test your skills against the world.
            </p>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why "Bros"?</h3>
            <p className="mb-4">
              The name "Karate Bros" reflects the game's emphasis on camaraderie and rivalry. It was designed from the ground up to be the ultimate "couch co-op" (or "keyboard co-op") experience. The viral nature of the game, often seen on platforms like TikTok and Twitch under the <strong>Karate Bros crazy games</strong> hashtag, stems from the hilarious and intense moments that occur when two players are battling it out shoulder-to-shoulder.
            </p>
          </section>

          {/* SECTION 2: HOW TO PLAY */}
          <section id="mechanics" className="mb-16">
            <h2 className="text-3xl font-display text-white mb-6 text-red-600">2. How to Play Karate Bros</h2>
            
            <p className="mb-6">
              Understanding the controls is the first step to dominance. The <strong>Karate Bros game</strong> features a dual-control scheme optimized for two players on a single keyboard, but it also supports gamepads for those playing the <strong>Karate Bros official</strong> desktop version.
            </p>

            {/* Image 2: karate-bros-game.png */}
            <div className="my-8 relative w-full aspect-video bg-black border-2 border-white/10 overflow-hidden rounded">
              <Image
                src={gameImages[1].src}
                alt={gameImages[1].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 my-8">
              <div className="border border-white/20 p-6 bg-white/5">
                <h4 className="font-pixel text-red-500 mb-4">PLAYER 1 CONTROLS</h4>
                <ul className="space-y-2 font-mono text-sm">
                  <li className="flex justify-between"><span>W</span> <span className="text-gray-500">JUMP</span></li>
                  <li className="flex justify-between"><span>A</span> <span className="text-gray-500">MOVE LEFT</span></li>
                  <li className="flex justify-between"><span>D</span> <span className="text-gray-500">MOVE RIGHT</span></li>
                  <li className="flex justify-between"><span>S</span> <span className="text-gray-500">BLOCK / CROUCH</span></li>
                  <li className="flex justify-between"><span>SPACE</span> <span className="text-gray-500">QUICK ATTACK</span></li>
                  <li className="flex justify-between"><span>F</span> <span className="text-gray-500">HEAVY PUNCH</span></li>
                  <li className="flex justify-between"><span>G</span> <span className="text-gray-500">KICK</span></li>
                  <li className="flex justify-between"><span>H</span> <span className="text-gray-500">SPECIAL</span></li>
                </ul>
              </div>

              <div className="border border-white/20 p-6 bg-white/5">
                <h4 className="font-pixel text-blue-500 mb-4">PLAYER 2 CONTROLS</h4>
                <ul className="space-y-2 font-mono text-sm">
                  <li className="flex justify-between"><span>UP ARROW</span> <span className="text-gray-500">JUMP</span></li>
                  <li className="flex justify-between"><span>LEFT ARROW</span> <span className="text-gray-500">MOVE LEFT</span></li>
                  <li className="flex justify-between"><span>RIGHT ARROW</span> <span className="text-gray-500">MOVE RIGHT</span></li>
                  <li className="flex justify-between"><span>DOWN ARROW</span> <span className="text-gray-500">BLOCK / CROUCH</span></li>
                  <li className="flex justify-between"><span>NUM 0</span> <span className="text-gray-500">QUICK ATTACK</span></li>
                  <li className="flex justify-between"><span>K</span> <span className="text-gray-500">HEAVY PUNCH</span></li>
                  <li className="flex justify-between"><span>L</span> <span className="text-gray-500">KICK</span></li>
                  <li className="flex justify-between"><span>J</span> <span className="text-gray-500">SPECIAL</span></li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mt-8 mb-4">Advanced Mechanics</h3>
            <ul className="list-disc pl-5 space-y-4 text-gray-300">
              <li>
                <strong>The Stamina System:</strong> Unlike older arcade games, you cannot spam attacks indefinitely in <strong>Karate Bros online</strong>. Every punch and kick consumes a sliver of stamina. If you deplete your bar, your character enters an "Exhausted" state, moving 50% slower and taking double damage. This mechanic forces players to be strategic rather than chaotic.
              </li>
              <li>
                <strong>The Combo Breaker:</strong> Getting caught in an infinite loop is frustrating. <strong>Karate Bros unblocked</strong> versions feature a "Burst" mechanic. By pressing Block + Forward while being hit, you can sacrifice 30% of your Super Meter to push the enemy away.
              </li>
              <li>
                <strong>Elemental Interactions:</strong> Some stages in the <strong>Karate Bros io</strong> rotation feature water, fire, or electric hazards. Knocking an opponent into these can deal extra damage or stun them, allowing for follow-up combos.
              </li>
            </ul>
          </section>

          {/* SECTION 3: CHARACTERS */}
          <section id="characters" className="mb-16">
            <h2 className="text-3xl font-display text-white mb-6 text-red-600">3. Character Roster & Guide</h2>
            <p className="mb-6">
              The roster is the soul of any fighting game. <strong>Karate Bros official</strong> features a diverse cast, often referred to by the community simply as "The Bros". Let's break down the meta.
            </p>

            {/* Image 3: karate-bros-io.png */}
            <div className="my-8 relative w-full aspect-video bg-black border-2 border-white/10 overflow-hidden rounded">
              <Image
                src={gameImages[3].src}
                alt={gameImages[3].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <div className="space-y-8">
              <div className="border-l-2 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">The Karate Kid (Ryu-Style)</h3>
                <p>The face of the <strong>Karate Bros game</strong>. He utilizes standard projectiles (fireballs) and a rising uppercut. He is the most balanced character and the best starting point for beginners. His stats are evenly distributed across speed, power, and defense.</p>
              </div>

              <div className="border-l-2 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">The Grappler</h3>
                <p>Slow, hulking, and terrifying up close. If you let The Grappler get within arm's reach, say goodbye to half your health bar. In <strong>Karate Bros online</strong>, lag can sometimes make grappling harder, but on local play, he is a monster. Counter him by keeping your distance with projectiles.</p>
              </div>

              <div className="border-l-2 border-yellow-500 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">Karate Bros Girl (The Speedster)</h3>
                <p>One of the most searched terms is <strong>Karate Bros girl</strong>, referring to the agile kunoichi character. She has the lowest health in the game but the highest movement speed. Her playstyle revolves around "hit-and-run" tactics. She can jump off walls and throw shurikens, making her a nightmare for slower characters like The Grappler.</p>
              </div>
              
              <div className="border-l-2 border-green-500 pl-6">
                <h3 className="text-xl font-bold text-white mb-2">The Boxer</h3>
                <p>This character cannot kick. Instead, his kick button is a "weave" or "dodge". This makes him unique in the <strong>Karate Bros unblocked</strong> meta. If you time his weaves correctly, he is invincible for a few frames, allowing for devastating counter-punches.</p>
              </div>
            </div>
          </section>

          {/* SECTION 4: UNBLOCKED & ACCESS */}
          <section id="unblocked" className="mb-16">
            <h2 className="text-3xl font-display text-white mb-6 text-red-600">4. Playing Karate Bros Unblocked</h2>
            
            <p className="mb-4">
              One of the biggest hurdles for gamers is access. Schools and workplaces often block gaming sites. This is where our <strong>Karate Bros unblocked</strong> solution shines. We utilize advanced mirroring technology and lightweight HTML5 wrappers to ensure the game remains accessible even behind strict firewalls.
            </p>

            {/* Image 4: karate-bros-online.png */}
            <div className="my-8 relative w-full aspect-video bg-black border-2 border-white/10 overflow-hidden rounded">
              <Image
                src={gameImages[4].src}
                alt={gameImages[4].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-3">Why is it blocked elsewhere?</h3>
            <p className="mb-4">
              Many gaming sites are categorized as "Distraction" or "Entertainment" by network filters. However, because our site hosts the <strong>Karate Bros official</strong> educational strategy guides (like the one you are reading right now), it is often categorized differently. Furthermore, the game runs entirely client-side after the initial load, meaning it doesn't constantly ping blocked servers, making the <strong>Karate Bros game</strong> smoother on restricted bandwidth.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Browser Compatibility</h3>
            <p className="mb-4">
              You can play <strong>Karate Bros online</strong> on:
            </p>
            <ul className="list-disc pl-5 mb-4 text-gray-400">
              <li>Google Chrome (Recommended for best performance)</li>
              <li>Mozilla Firefox</li>
              <li>Microsoft Edge</li>
              <li>Safari (Mac & iOS)</li>
              <li>Chromebooks (Optimized for low-end hardware)</li>
            </ul>
          </section>

          {/* SECTION 5: STRATEGY GUIDE */}
          <section id="strategy" className="mb-16">
            <h2 className="text-3xl font-display text-white mb-6 text-red-600">5. How to Win: The Meta</h2>
            
            <p className="mb-6">
              So, you've learned the buttons. Now, how do you actually crush your opponents in <strong>Karate Bros io</strong>? Here is the blueprint to victory.
            </p>

            {/* Image 5: karate-bros-free.png */}
            <div className="my-8 relative w-full aspect-video bg-black border-2 border-white/10 overflow-hidden rounded">
              <Image
                src={gameImages[0].src}
                alt={gameImages[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Phase 1: Neutral Game</h3>
            <p className="mb-4">
              At the start of the round, do not just rush in. This is a common mistake in <strong>Karate Bros crazy games</strong> lobbies. Watch your opponent. Are they jumping a lot? If so, prepare your anti-air attack. Are they walking backward? They are trying to bait you. Occupy the center of the stage to control the flow.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Phase 2: The Punish</h3>
            <p className="mb-4">
              Patience is key. Wait for your opponent to use a heavy attack that misses. During their recovery animation, strike! A simple combo like &quot;Jump Kick {'->'} Punch {'->'} Special&quot; deals 30% damage. In <strong>Karate Bros official</strong> play, dropping a combo can cost you the match, so practice your execution.
            </p>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">Phase 3: Mind Games (Okizeme)</h3>
            <p className="mb-4">
              "Okizeme" is the art of attacking an opponent as they wake up from being knocked down. In <strong>Karate Bros</strong>, you can time your attack to hit exactly as they stand up. They are forced to block. If you think they will block, throw them. If you think they will attack, block and punish. This rock-paper-scissors dynamic is the peak of <strong>Karate Bros online</strong> strategy.
            </p>
          </section>

          {/* SECTION 6: FAQ */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl font-display text-white mb-6 text-red-600">6. Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <strong className="text-white block text-lg mb-2">Q: Is Karate Bros free to play?</strong>
                <p>A: Yes, the <strong>Karate Bros game</strong> is 100% free. There are no pay-to-win mechanics. Cosmetic skins can be unlocked through gameplay achievements.</p>
              </div>
              
              <div>
                <strong className="text-white block text-lg mb-2">Q: Can I play Karate Bros girl characters only?</strong>
                <p>A: Absolutely. You can select any character for any match. There are no restrictions on character selection in standard modes.</p>
              </div>

              <div>
                <strong className="text-white block text-lg mb-2">Q: What makes this the "Official" site?</strong>
                <p>A: We host the direct, unmodified source of the game code, ensuring you get the developer's intended experience without the ad-bloat found on <strong>Karate Bros crazy games</strong> aggregators.</p>
              </div>

              <div>
                <strong className="text-white block text-lg mb-2">Q: How do I reduce lag in Karate Bros io?</strong>
                <p>A: Close other browser tabs, use a wired ethernet connection if possible, and ensure your browser's hardware acceleration is enabled.</p>
              </div>
            </div>
          </section>

          <hr className="border-white/10 my-12" />

          {/* OUTRO */}
          <section className="text-center">
            <h2 className="text-4xl font-display text-white mb-6">Ready to Fight?</h2>
            <p className="mb-8 text-xl">
              The arena is calling. The crowd is waiting. It's time to prove yourself in the ultimate <strong>Karate Bros unblocked</strong> showdown.
            </p>
            <a href="#game" className="inline-block bg-red-600 text-white font-pixel py-4 px-12 hover:bg-white hover:text-red-600 transition-colors border-2 border-transparent hover:border-red-600">
              PLAY NOW
            </a>
          </section>

        </article>
      </div>
    </div>
  );
};

export default ContentSection;