import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    id: 1,
    role: 'Full Stack Developer Intern',
    company: 'Brainbric Innovations',
    period: 'Present',
    description: 'Developing and optimizing web applications. Contributing to the architecture and implementation of scalable solutions using modern tech stacks.',
    highlights: ['React.js', 'Node.js', 'API Integration', 'UI/UX Implementation']
  },
  {
    id: 2,
    role: 'Freelance Web Developer',
    company: 'Independent',
    period: '2023 - Present',
    description: 'Crafting custom digital experiences for various clients. Focusing on cinematic designs, performant code, and intuitive user interfaces.',
    highlights: ['Client Relations', 'Custom Design', 'Full Stack Development']
  }
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="experience" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ rotateX: 25, rotateY: -10, opacity: 0, filter: "blur(20px)", scale: 0.9, y: 100 }}
          animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, filter: "blur(0px)", scale: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className="flex flex-col gap-16"
        >
          {/* Chapter Title - Cinematic */}
          <div className="flex flex-col items-center text-center">
            <span className="text-white/40 font-sans tracking-[0.3em] text-xs font-bold mb-4 uppercase">
              Chapter 04
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The Journey
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mt-8"></div>
          </div>

          {/* Timeline Layout */}
          <div className="max-w-4xl mx-auto w-full">
            <div className="relative border-l border-white/10 pl-8 md:pl-16 py-4 space-y-20">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + (idx * 0.2) }}
                  className="relative group"
                >
                  {/* Timeline Node */}
                  <div className="absolute -left-[37px] md:-left-[69px] top-1 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:scale-150 transition-transform duration-300" />
                  
                  {/* Content */}
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight text-white">
                      {exp.role}
                    </h3>
                    <span className="text-white/40 font-sans text-xs font-bold tracking-[0.2em] uppercase hidden md:block">
                      //
                    </span>
                    <span className="text-accentSilver font-sans text-sm tracking-[0.2em] uppercase font-bold">
                      {exp.period}
                    </span>
                  </div>
                  
                  <div className="text-white/60 font-sans text-[10px] tracking-[0.3em] font-bold uppercase mb-6">
                    {exp.company}
                  </div>
                  
                  <p className="text-white/70 font-sans font-light leading-relaxed max-w-2xl mb-8">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    {exp.highlights.map((highlight, hIdx) => (
                      <span 
                        key={hIdx}
                        className="text-[10px] uppercase tracking-[0.2em] text-white/50 border border-white/10 px-3 py-1 group-hover:border-white/30 group-hover:text-white/80 transition-colors"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
