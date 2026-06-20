import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const categories = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT', 'TAILWIND']
  },
  {
    title: 'Backend',
    skills: ['NODE.JS', 'EXPRESS']
  },
  {
    title: 'Database',
    skills: ['POSTGRESQL', 'MONGODB', 'SUPABASE']
  },
  {
    title: 'Tools',
    skills: ['GITHUB', 'FIGMA', 'VS CODE']
  }
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ rotateX: 25, rotateY: 15, opacity: 0, scale: 0.9, y: 100 }}
          animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className="flex flex-col md:flex-row gap-16 md:gap-24"
        >
          {/* Chapter Title - Cinematic Left Side */}
          <div className="md:w-1/3 flex flex-col">
            <span className="text-white/40 font-sans tracking-[0.3em] text-xs font-bold mb-4 uppercase">
              Chapter 02
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The<br/>Arsenal
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mt-8"></div>
          </div>

          {/* Credits Style Skills Layout - Right Side */}
          <div className="md:w-2/3 grid sm:grid-cols-2 gap-x-12 gap-y-16">
            {categories.map((category, catIdx) => (
              <div key={category.title} className="flex flex-col">
                {/* Category Title */}
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + (catIdx * 0.1) }}
                  className="text-white/40 font-sans uppercase tracking-[0.3em] text-xs font-bold mb-6 pb-2 border-b border-white/10"
                >
                  {category.title}
                </motion.h3>

                {/* Skills List - Credits Style */}
                <div className="flex flex-col gap-4">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.4 + (catIdx * 0.1) + (skillIdx * 0.05),
                        ease: "easeOut"
                      }}
                      className="group flex items-center justify-between"
                    >
                      <span className="text-white font-black uppercase tracking-[0.15em] text-xl md:text-2xl transition-colors group-hover:text-accentSilver drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                        {skill}
                      </span>
                      {/* Hover Line Effect */}
                      <span className="h-[1px] bg-white/0 group-hover:bg-white/20 transition-all flex-grow mx-4 hidden sm:block"></span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}