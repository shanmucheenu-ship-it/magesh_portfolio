import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function LoadingScreen() {
  // Play custom intro audio on mount
  useEffect(() => {
    const audio = new Audio('/intro.mp3');
    audio.volume = 0.8; // Increased volume slightly for custom track
    audio.play().catch(() => {});
  }, []);




  const embers = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 3,
    drift: Math.random() * 60 - 30,
  }))

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(15px)",
        scale: 1.08
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Styles Injection */}
      <style>{`

        .karuppu-text {
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 45%, #ef4444 55%, #991b1b 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 40px rgba(239, 68, 68, 0.25), 0 0 80px rgba(255, 255, 255, 0.15);
        }

        .karuppu-border {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.45) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(153, 27, 27, 0.35) 100%);
        }

        @keyframes drift {
          0% {
            transform: translateY(110vh) translateX(0) scale(1);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(-10vh) translateX(var(--drift-x)) scale(0.4);
            opacity: 0;
          }
        }
        
        .ember-particle {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: radial-gradient(circle, #f97316 0%, #ef4444 40%, rgba(220, 38, 38, 0) 100%);
          box-shadow: 0 0 10px #f97316, 0 0 20px #ef4444;
          mix-blend-mode: screen;
          pointer-events: none;
          animation: drift linear infinite;
        }
      `}</style>


      {/* Deep Space / Film Vignette Backdrop Spotlight */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0.8)_70%,rgba(0,0,0,1)_100%)]" />

      {/* Cinematic Dust Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="absolute bottom-[-20px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] mix-blend-screen pointer-events-none"
            style={{
              width: `${ember.size / 2}px`,
              height: `${ember.size / 2}px`,
              left: ember.left,
              opacity: 0.4 + Math.random() * 0.4,
              animation: `drift ${ember.duration}s linear ${ember.delay}s infinite`,
              '--drift-x': `${ember.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Slow Camera Zoom-in container */}
      <motion.div
        className="relative z-30 flex flex-col items-center justify-center perspective-1000 w-full px-6"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 4.2, ease: "easeOut" }}
      >
        {/* Soft Aura glow behind card */}
        <motion.div
          className="absolute w-[450px] h-[250px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.6, ease: "easeOut" }}
        />

        {/* 3D Flipping Luxury Title Card */}
        <motion.div
          style={{ transformStyle: 'preserve-3d' }}
          className="relative max-w-lg w-full aspect-[1.8/1] rounded-3xl p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-white/20 shadow-[0_60px_120px_rgba(0,0,0,1),_0_0_80px_rgba(255,255,255,0.08)] z-10 overflow-hidden bg-black/60"
          initial={{ 
            rotateY: 90, 
            rotateX: 18,
            opacity: 0,
            z: -300,
            x: -100,
            filter: "blur(20px)"
          }}
          animate={{ 
            rotateY: 0, 
            rotateX: 0,
            opacity: 1,
            z: 0,
            x: 0,
            filter: "blur(0px)"
          }}
          transition={{ 
            duration: 1.9, 
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1] // Luxury cubic-bezier easing
          }}
        >
          {/* Card Internal Body */}
          <div className="w-full h-full rounded-[23px] bg-gradient-to-br from-black via-[#050505] to-[#0a0a0a] flex flex-col items-center justify-center relative p-8">
            
            {/* Subtle card grid pattern backdrop */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Dynamic Light Sweep element */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-[150%] pointer-events-none mix-blend-overlay"
              animate={{ translateX: ["150%", "-150%"] }}
              transition={{ 
                duration: 2.5, 
                delay: 1.4, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
              }}
            />

            {/* Minimal Corner Accents (blockbuster look) */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 rounded-tl" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20 rounded-tr" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20 rounded-bl" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 rounded-br" />

            {/* Mini QR code vector visual decoration in corner matching video card */}
            <div className="absolute bottom-4 right-6 opacity-20 pointer-events-none flex flex-col items-center mix-blend-overlay">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
                <path d="M7 7h.01M17 7h.01M7 17h.01M17 17h.01"></path>
              </svg>
            </div>

            {/* Main Bold Title */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-[0.1em] metallic-text select-none uppercase font-sans mb-1"
              initial={{ letterSpacing: "0.05em", filter: "blur(10px)" }}
              animate={{ letterSpacing: "0.15em", filter: "blur(0px)" }}
              transition={{ duration: 2.6, ease: "easeOut" }}
            >
              MAHI
            </motion.h1>

            {/* Spaced Elegant Subtitle */}
            <motion.p
              className="text-[0.6rem] sm:text-xs font-bold text-accentSilver tracking-[0.3em] uppercase select-none mt-2"
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 0.8, letterSpacing: "0.45em" }}
              transition={{ delay: 1.0, duration: 1.5, ease: "easeOut" }}
            >
              Full Stack Developer
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}