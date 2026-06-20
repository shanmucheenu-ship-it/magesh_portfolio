import { useEffect } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle, Github, Linkedin, Instagram, Mail } from 'lucide-react'
import profileImg from '../assets/profile.png'

export default function Hero() {

  
  // 3D Motion values for profile tilt
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useTransform(tiltY, [-180, 180], [15, -15])
  const rotateY = useTransform(tiltX, [-180, 180], [-15, 15])

  const handleMouseMovePortrait = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const valX = e.clientX - rect.left - width / 2
    const valY = e.clientY - rect.top - height / 2
    tiltX.set(valX)
    tiltY.set(valY)
  }

  const handleMouseLeavePortrait = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  const embers = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 4,
    drift: Math.random() * 80 - 40,
  }))

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-black"
    >
      {/* Cinematic Dust/Embers Rising Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="ember-particle"
            style={{
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              left: ember.left,
              animationDelay: `${ember.delay}s`,
              animationDuration: `${ember.duration}s`,
              '--drift-x': `${ember.drift}px`,
            }}
          />
        ))}
      </div>

      {/* Glow Backdrops */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-white/5 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-white/5 rounded-full blur-[128px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left order-2 md:order-1"
          >
            <span className="inline-block px-4 py-1.5 rounded-sm border border-white/10 text-white/60 text-xs tracking-[0.2em] uppercase font-bold mb-6 shadow-sm backdrop-blur-md bg-black/40">
              The Developer
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tight leading-none mb-2 uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              MAHI
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-accentSilver tracking-[0.1em] uppercase mb-8">
              Full Stack Developer
            </h2>
            <div className="flex flex-col gap-2 mb-10 border-l-2 border-white/20 pl-4">
              <p className="text-base md:text-lg text-white/80 max-w-lg leading-relaxed font-sans font-light tracking-wide">
                FOUNDER. CREATOR. BUILDER.
              </p>
              <p className="text-sm md:text-base text-white/50 max-w-lg leading-relaxed font-sans font-light">
                Crafting immersive digital experiences with clean code and cinematic design.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 mb-12">
              <a
                href="#projects"
                className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-none font-black uppercase text-sm tracking-[0.2em] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 group shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                View The Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 hover:border-white text-white rounded-none font-bold uppercase text-sm tracking-[0.2em] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 backdrop-blur-sm bg-black/20 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
              >
                Contact
                <MessageCircle size={18} />
              </a>
            </div>
            
            <div className="flex gap-5">
              {[
                { icon: Github, link: "https://github.com/magesh1122", title: "GitHub" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/magesh-waran-1b6811312", title: "LinkedIn" },
                { icon: Instagram, link: "https://x.com/magesx700", title: "Instagram" },
                { icon: Mail, link: "mailto:mahimahi05865@gmail.com", title: "Email" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all hover:-translate-y-1 bg-black/30 backdrop-blur-sm"
                  title={social.title}
                >
                  <social.icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Glowing 3D Parallax Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center order-1 md:order-2 relative py-8 perspective-1000"
          >
            {/* Dotted Pattern Backdrop */}
            <div className="absolute right-4 top-10 opacity-20 pointer-events-none select-none">
              <div className="grid grid-cols-6 gap-2">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                ))}
              </div>
            </div>

            {/* Circular Glow Backdrop */}
            <div className="absolute w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] bg-gradient-to-tr from-white/10 to-transparent blur-[64px] z-0" />

            {/* Profile Image container with 3D Tilt */}
            <motion.div
              onMouseMove={handleMouseMovePortrait}
              onMouseLeave={handleMouseLeavePortrait}
              className="relative w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] p-[1px] bg-gradient-to-br from-white/30 via-transparent to-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden z-10 cursor-pointer backdrop-blur-sm"
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)' }}
            >
              <div className="absolute inset-0 bg-black/40 pointer-events-none z-20 mix-blend-overlay" />
              <motion.img
                src={profileImg}
                alt="Mahi profile portrait"
                style={{ transform: 'translateZ(20px)' }}
                className="w-full h-full object-cover grayscale opacity-90 contrast-125"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}