import { motion } from 'framer-motion';

export default function TitleCard() {
  return (
    <motion.div
      className="relative max-w-lg w-full aspect-[1.8/1] rounded-3xl p-[1px] bg-gradient-to-br from-white/30 via-white/5 to-white/20 shadow-[0_60px_120px_rgba(0,0,0,1),_0_0_80px_rgba(255,255,255,0.08)] z-10 overflow-hidden bg-black/60"
      style={{ transformStyle: 'preserve-3d' }}
      initial={{ rotateY: 90, rotateX: 18, opacity: 0, z: -300, x: -100, filter: 'blur(20px)' }}
      animate={{ rotateY: 0, rotateX: 0, opacity: 1, z: 0, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full h-full rounded-[23px] bg-gradient-to-br from-black via-[#050505] to-[#0a0a0a] flex items-center justify-center p-8">
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl font-black uppercase metallic-text tracking-[0.1em]"
          initial={{ letterSpacing: '0.05em', filter: 'blur(10px)' }}
          animate={{ letterSpacing: '0.15em', filter: 'blur(0px)' }}
          transition={{ duration: 2.6, ease: 'easeOut' }}
        >
          MAHI
        </motion.h1>
      </div>
      {/* Light sweep */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-[150%] mix-blend-overlay"
        animate={{ translateX: ['150%', '-150%'] }}
        transition={{ duration: 2.5, delay: 1.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }}
      />
    </motion.div>
  );
}
