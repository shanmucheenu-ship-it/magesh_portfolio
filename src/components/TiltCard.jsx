import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion'
import { useState } from 'react'

export default function TiltCard({ children, className = '', tiltMax = 12, glowColor = 'rgba(255, 255, 255, 0.1)', ...props }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Track relative coordinates for cursor reflection glow
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  // Map mouse movement from bounds to 3D rotation degrees
  const rotateX = useTransform(y, [-150, 150], [tiltMax, -tiltMax])
  const rotateY = useTransform(x, [-150, 150], [-tiltMax, tiltMax])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    // Relative coordinates from center for rotation
    const valX = e.clientX - rect.left - width / 2
    const valY = e.clientY - rect.top - height / 2
    x.set(valX)
    y.set(valY)

    // Absolute coordinates for reflection glow
    const glowX = e.clientX - rect.left
    const glowY = e.clientY - rect.top
    mouseX.set(glowX)
    mouseY.set(glowY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  // Create template string for radial glow backdrop
  const backgroundGlow = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent)`

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: 'preserve-3d',
        transformPerspective: 1000
      }}
      className={`relative preserve-3d transition-shadow duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic 3D Cursor Reflection Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300"
        style={{
          background: backgroundGlow,
          opacity: isHovered ? 1 : 0
        }}
      />
      {children}
    </motion.div>
  )
}
