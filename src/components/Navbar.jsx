import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Gamepad2 } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Chapter 01', href: '#about' },
  { name: 'Chapter 02', href: '#skills' },
  { name: 'Chapter 03', href: '#projects' },
  { name: 'Chapter 04', href: '#experience' },
  { name: 'Chapter 05', href: '#startup' },
  { name: 'Signal', href: '#contact' },
]

export default function Navbar({ onOpenArcade }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Simple active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'startup', 'contact']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 bg-black/80 border-b border-white/5 py-4'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <a href="#home" className="text-2xl md:text-3xl font-black text-white tracking-[0.2em] uppercase flex items-center hover:opacity-80 transition-opacity">
            MAHI<span className="text-white/40">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-colors relative py-2 ${
                  activeSection === link.href.substring(1)
                    ? 'text-white'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={onOpenArcade}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
              title="Access Arcade Terminal"
            >
              <Gamepad2 size={20} strokeWidth={1.5} />
            </button>
            <a
              href="/cv.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] font-bold text-white border border-white/20 hover:border-white/60 px-4 py-2 transition-all hover:bg-white/5"
            >
              Access Data
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-black uppercase tracking-[0.3em] transition-colors ${
                    activeSection === link.href.substring(1)
                      ? 'text-white'
                      : 'text-white/30 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="w-12 h-px bg-white/20 my-4" />
              <div className="flex gap-8 items-center justify-center">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onOpenArcade()
                  }}
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold cursor-pointer"
                >
                  <Gamepad2 size={16} />
                  Arcade
                </button>
                <a
                  href="/cv.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold"
                >
                  <Download size={16} />
                  Data
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}