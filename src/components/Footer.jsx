import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-white/40 font-sans text-xs uppercase tracking-[0.2em] font-bold text-center sm:text-left">
            © {new Date().getFullYear()} MAGESHWARAN. ALL RIGHTS RESERVED.
          </p>

          <button
            onClick={scrollToTop}
            className="w-12 h-12 border border-white/20 hover:border-white/60 flex items-center justify-center text-white/50 hover:text-white transition-all hover:-translate-y-1 bg-black/30 backdrop-blur-sm cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </footer>
  )
}