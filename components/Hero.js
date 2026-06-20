import { useState, useEffect } from 'react';

function Hero() {
  const [text, setText] = useState('');
  const fullText = 'Creative Developer';
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 reveal">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-slate-300">Available for freelance work</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
          Hi, I'm{' '}
          <span className="gradient-text">Alex</span>
        </h1>

        {/* Typing Effect */}
        <div className="h-16 sm:h-20 flex items-center justify-center mb-8 reveal" style={{ transitionDelay: '0.2s' }}>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-300">
            {text}
            <span className={`inline-block w-0.5 h-10 sm:h-12 bg-primary ml-1 align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed reveal" style={{ transitionDelay: '0.3s' }}>
          I craft immersive digital experiences with clean code and pixel-perfect design.
          Specializing in React, Node.js, and creative web solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal" style={{ transitionDelay: '0.4s' }}>
          <button
            onClick={() => scrollTo('projects')}
            className="btn-glow px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 border border-white/10"
          >
            Get In Touch
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-20 reveal" style={{ transitionDelay: '0.5s' }}>
          {[
            { value: '5+', label: 'Years Experience' },
            { value: '50+', label: 'Projects Done' },
            { value: '30+', label: 'Happy Clients' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default Hero;
