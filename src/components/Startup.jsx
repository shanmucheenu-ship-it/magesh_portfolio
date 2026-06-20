import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Rocket, ExternalLink } from 'lucide-react'

export default function Startup() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="startup" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ rotateX: 25, rotateY: 10, opacity: 0, filter: "blur(20px)", scale: 0.9, y: 100 }}
          animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className="flex flex-col md:flex-row gap-16 md:gap-24"
        >
          {/* Chapter Title - Cinematic Left Side */}
          <div className="md:w-1/3 flex flex-col">
            <span className="text-white/40 font-sans tracking-[0.3em] text-xs font-bold mb-4 uppercase">
              Chapter 05
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The<br/>Venture
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mt-8 mb-10"></div>
            
            <p className="text-white/60 font-sans font-light leading-relaxed mb-10 text-lg">
              Beyond writing code, I am building the future of campus commerce. A visionary ecosystem designed for students.
            </p>
          </div>

          {/* Startup Content - Right Side */}
          <div className="md:w-2/3 flex flex-col">
            <div className="relative p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 rounded-2xl overflow-hidden group">
              {/* Internal dark body */}
              <div className="relative w-full h-full bg-[#050505] rounded-[15px] p-10 overflow-hidden">
                
                {/* Light Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 -translate-x-[150%] group-hover:animate-[sweep_2s_ease-in-out]" />

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                  <div>
                    <span className="text-white/40 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-2 block">
                      Current Startup
                    </span>
                    <h3 className="text-4xl font-black uppercase tracking-tight text-white flex items-center gap-4">
                      Zylo Campus
                      <Rocket size={24} className="text-white/50" />
                    </h3>
                  </div>
                  <span className="px-4 py-1.5 border border-white/20 text-white/80 text-[10px] uppercase tracking-[0.2em] font-bold rounded-full bg-white/5">
                    Beta Phase
                  </span>
                </div>

                <div className="w-full h-px bg-white/10 mb-8" />

                <p className="text-white/70 font-sans font-light leading-loose text-lg mb-8">
                  A peer-to-peer campus marketplace designed exclusively for students. Zylo simplifies buying, selling, and discovering essentials within the college ecosystem. Built on a commission-based model, it fosters local micro-economies while ensuring a secure, verified environment.
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mb-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold">Role</span>
                    <span className="text-white font-medium uppercase tracking-wider text-sm">Founder & Lead Dev</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold">Core Stack</span>
                    <span className="text-white font-medium uppercase tracking-wider text-sm">React, Supabase, Tailwind</span>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-3 text-white uppercase tracking-[0.2em] text-xs font-bold hover:text-accentSilver transition-colors group/link"
                >
                  Visit Zylo Platform
                  <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
