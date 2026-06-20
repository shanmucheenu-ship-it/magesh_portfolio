import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-32 relative bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ rotateX: 25, rotateY: -15, opacity: 0, filter: "blur(20px)", scale: 0.9, y: 100 }}
          animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className="flex flex-col md:flex-row gap-16 md:gap-24"
        >
          {/* Chapter Title - Cinematic Left Side */}
          <div className="md:w-1/3 flex flex-col">
            <span className="text-white/40 font-sans tracking-[0.3em] text-xs font-bold mb-4 uppercase">
              Chapter 01
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The<br/>Developer
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mt-8"></div>
          </div>

          {/* Editorial Content - Right Side */}
          <div className="md:w-2/3 flex flex-col gap-10">
            <div className="prose prose-invert max-w-none text-white/70 font-sans font-light leading-loose text-lg">
              <p>
                I am a passionate and driven <strong className="text-white font-bold">Full Stack Developer</strong> specializing in creating digital experiences that feel alive. My approach combines robust backend architectures with cinematic, motion-driven frontend interfaces.
              </p>
              <p>
                Currently gaining industry experience as an intern at <strong className="text-white font-bold">Brainbric Innovations</strong>, I focus on transforming complex requirements into elegant, high-performance solutions. My work spans across agricultural marketplaces, attendance systems, and secure online voting platforms.
              </p>
              <p>
                I don't just write code; I craft stories through technology. Every pixel, every interaction, and every data flow is meticulously designed to create an unforgettable user experience.
              </p>
            </div>

            {/* Quick Stats / Info - Editorial Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
              {[
                { label: 'Role', value: 'Full Stack' },
                { label: 'Base', value: 'India' },
                { label: 'Education', value: 'Computer Eng.' },
                { label: 'Focus', value: 'Web & UI/UX' },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + (idx * 0.1) }}
                >
                  <span className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-bold">{item.label}</span>
                  <span className="text-white font-medium uppercase tracking-wider text-sm">{item.value}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Download Resume Action */}
            <div className="pt-4">
              <a 
                href="/cv.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 text-white hover:text-accentSilver font-bold tracking-[0.2em] uppercase text-xs group transition-colors"
              >
                Access Archives (CV)
                <span className="w-8 h-[1px] bg-white/50 group-hover:w-12 group-hover:bg-accentSilver transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}