import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, ArrowRight } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Uzhavar Sandhai',
    description: 'Agricultural marketplace platform connecting farmers and customers. Features custom Farmer, Customer, and Admin modules with full product listings and order management.',
    image: 'https://images.unsplash.com/photo-1595085444857-e685fba394ea?q=80&w=1600&auto=format&fit=crop', // Dark/cinematic agriculture placeholder
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Web App',
    github: 'https://github.com/magesh1122',
    live: '#',
  },
  {
    id: 2,
    title: 'Online Voting & Polling System',
    description: 'Secure voting and survey management platform featuring duplicate vote prevention via IP checks and an admin control dashboard for poll creation and real-time visualization of results.',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1600&auto=format&fit=crop', // Dark/cinematic digital placeholder
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    category: 'Web App',
    github: 'https://github.com/magesh1122',
    live: '#',
  },
  {
    id: 3,
    title: 'Attendance Management System',
    description: 'Principal dashboard for department-wise attendance monitoring. Integrated with daily/monthly automated reports, graphical analytics, and custom Excel export functionality.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop', // Dark analytics placeholder
    tags: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Dashboard',
    github: 'https://github.com/magesh1122',
    live: '#',
  },
  {
    id: 4,
    title: 'Zylo Campus Marketplace',
    description: 'Student-focused peer-to-peer campus marketplace. Implements custom product listing, search capabilities, and a commission-based business model with a modern user-friendly UI.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop', // Dark coding/tech placeholder
    tags: ['React.js', 'Supabase', 'Tailwind CSS', 'Vite'],
    category: 'Web App',
    github: 'https://github.com/magesh1122',
    live: '#',
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="projects" className="py-32 relative bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ rotateX: -25, rotateY: 0, opacity: 0, scale: 0.9, y: 100 }}
          animate={inView ? { rotateX: 0, rotateY: 0, opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className="flex flex-col gap-16"
        >
          {/* Chapter Title - Cinematic */}
          <div className="flex flex-col items-center text-center">
            <span className="text-white/40 font-sans tracking-[0.3em] text-xs font-bold mb-4 uppercase">
              Chapter 03
            </span>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-wide leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
              The Work
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mt-8"></div>
          </div>

          {/* Cinematic Poster Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                className="group relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-[#050505] overflow-hidden cursor-pointer border border-white/10 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-shadow duration-700"
              >
                {/* Background Image with Dark Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                
                {/* Light Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-[150%] group-hover:animate-[sweep_1.5s_ease-in-out]" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white/40 font-sans uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">
                      Project 0{idx + 1} // {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/60 font-sans text-sm md:text-base font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      <a
                        href={project.live !== '#' ? project.live : project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-white uppercase tracking-[0.2em] text-xs font-bold hover:text-accentSilver transition-colors"
                      >
                        Explore Project
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Minimal Borders */}
                <div className="absolute inset-4 border border-white/5 pointer-events-none scale-95 group-hover:scale-100 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
             <a
              href="https://github.com/magesh1122"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 hover:border-white text-white rounded-none font-bold uppercase text-sm tracking-[0.2em] transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 bg-black/40 bg-black/20 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] group"
            >
              View Full Archive
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  )
}