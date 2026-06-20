import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'

// Lazy load off-screen and heavy components for optimized Vite bundling
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Experience = lazy(() => import('./components/Experience'))
const Startup = lazy(() => import('./components/Startup'))
const Contact = lazy(() => import('./components/Contact'))
const ArcadeModal = lazy(() => import('./components/ArcadeModal'))

function App() {
  const [loading, setLoading] = useState(true)
  const [isArcadeOpen, setIsArcadeOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 via-white to-white/20 origin-left z-[9999]"
            style={{ scaleX }}
          />

          <CustomCursor />
          
          <Navbar onOpenArcade={() => setIsArcadeOpen(true)} />
          
          <main>
            <Hero />
            <Suspense fallback={<div className="h-screen bg-black" />}>
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Startup />
              <Contact />
            </Suspense>
          </main>
          
          <Footer />

          {/* Floating Retro Game arcade trigger */}
          <motion.button
            onClick={() => setIsArcadeOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.5, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black/50 border border-white/20 text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:border-white/60 cursor-pointer z-40 backdrop-blur-md group"
            title="Play Arcade Game"
          >
            <Gamepad2 size={24} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute right-16 px-3 py-1.5 rounded-sm bg-black border border-white/20 text-white/70 text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none">
              Play Game
            </span>
          </motion.button>

          {/* Retro Arcade Modal Overlay */}
          <Suspense fallback={null}>
            <ArcadeModal isOpen={isArcadeOpen} onClose={() => setIsArcadeOpen(false)} />
          </Suspense>
        </motion.div>
      )}
    </>
  )
}

export default App