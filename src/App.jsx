import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainContainer = useRef(null);
  const carRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. INITIAL LOAD: Text rising from bottom
      const tl = gsap.timeline();
      tl.from(".char", {
        y: "150%",
        rotation: 5,
        opacity: 0,
        duration: 1,
        stagger: 0.03,
        ease: "expo.out",
      })
      .from(".stat-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2
      }, "-=0.6");

      // 2. SCROLL ANIMATION: Driving the car
      // We use 1:1 mapping with "none" ease for maximum smoothness
      gsap.to(carRef.current, {
        x: "130vw", 
        rotation: 10,
        scale: 1.4,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2, // Balanced smoothness
        }
      });

      // 3. FADE OUT HERO: Prevent overlap with the white section
      gsap.to(".hero-content, .stats-bar", {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          start: "70% center",
          end: "bottom bottom",
          scrub: true,
        }
      });

    }, mainContainer); 

    return () => ctx.revert();
  }, []);

  const renderAnimatedText = (text) => {
    return text.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="word-wrap inline-block whitespace-nowrap mr-[0.5em] overflow-hidden">
        {word.split("").map((char, charIndex) => (
          <span key={charIndex} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <main ref={mainContainer} className="bg-zinc-950 text-white selection:bg-orange-500">
      
      {/* Reduced to 300vh: Perfect distance for "WELCOME ITZFIZZ" */}
      <div ref={scrollWrapperRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4">
          
          {/* Main Headline */}
          <div className="hero-content py-4 text-center z-0">
            <h1 className="text-[7vw] md:text-[8vw] font-black uppercase leading-none select-none text-zinc-800 tracking-tight flex flex-wrap justify-center">
              {renderAnimatedText("WELCOME ITZFIZZ")}
            </h1>
          </div>

          {/* Stats Bar */}
          <div className="stats-bar absolute bottom-24 flex gap-10 md:gap-32 z-20 bg-zinc-950/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
            <div className="stat-card">
              <p className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white">01</p>
              <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Rank</p>
            </div>
            <div className="stat-card">
              <p className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white">9.8<span className="text-orange-500 text-xl">s</span></p>
              <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Quarter Mile</p>
            </div>
            <div className="stat-card">
              <p className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-white">MAX</p>
              <p className="text-zinc-500 text-[10px] tracking-widest uppercase">Output</p>
            </div>
          </div>

          {/* Car Image */}
          <div ref={carRef} className="absolute left-[-40%] w-[500px] md:w-[900px] z-10 pointer-events-none">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/10 blur-[120px] rounded-full"></div>
              <img 
                src="https://pngimg.com/d/porsche_PNG10624.png" 
                alt="Racing Car"
                className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>

          <div className="absolute bottom-6 flex flex-col items-center gap-2 opacity-30">
            <div className="w-px h-12 bg-white"></div>
            <span className="text-[10px] tracking-[0.8em] uppercase">Scroll</span>
          </div>
        </div>
      </div>

      {/* The "After" section - Seamless Transition */}
      <section className="relative z-30 h-screen bg-zinc-100 flex items-center justify-center shadow-[0_-20px_50px_rgba(0,0,0,0.3)]">
        <div className="text-center">
          <h2 className="text-zinc-900 text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            The Future <br /> is Electric.
          </h2>
          <button className="mt-8 px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            EXPLORE SPECS
          </button>
        </div>
      </section>
      
    </main>
  );
}

export default App;