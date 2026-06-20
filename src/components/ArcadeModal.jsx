import { useEffect, useRef, useState } from 'react'
import { X, Play, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ArcadeModal({ isOpen, onClose }) {
  const canvasRef = useRef(null)
  const requestRef = useRef(null)
  const [gameState, setGameState] = useState('START') // START, PLAYING, GAMEOVER
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('arcade_highscore') || '0', 10)
  })

  // Synchronize state references for use inside the loop
  const gameStateRef = useRef(gameState)
  const scoreRef = useRef(score)
  const keysPressed = useRef({})
  const mousePos = useRef({ x: 300 })

  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])

  useEffect(() => {
    scoreRef.current = score
  }, [score])

  // Prevent default scroll behavior of Arrow keys when playing the game
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code) && gameStateRef.current === 'PLAYING') {
        e.preventDefault()
      }
      keysPressed.current[e.code] = true
    }
    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isOpen])

  // The Game Engine
  useEffect(() => {
    if (!isOpen || gameState !== 'PLAYING') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Initial game entities setup
    const player = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      width: 28,
      height: 28,
      speed: 6,
      color: '#ffffff',
      glow: '#aaaaaa',
    }

    let lasers = []
    let asteroids = []
    let particles = []
    let laserTimer = 0
    let asteroidSpawnTimer = 0
    let localScore = 0

    // Set localScore
    setScore(0)

    const mouseMoveHandler = (e) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const relativeX = (e.clientX - rect.left) * scaleX
      mousePos.current.x = Math.max(15, Math.min(canvas.width - 15, relativeX))
    }
    canvas.addEventListener('mousemove', mouseMoveHandler)

    // Main Game Update and Render Loop
    const gameLoop = (time) => {
      // Clear Screen
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw Grid Matrix Background for Cyberpunk Aesthetic
      ctx.strokeStyle = '#111111'
      ctx.lineWidth = 0.5
      const gridSize = 40
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // 1. Move Player (Keyboard or Mouse inputs)
      if (keysPressed.current['ArrowLeft'] || keysPressed.current['KeyA']) {
        player.x -= player.speed
      }
      if (keysPressed.current['ArrowRight'] || keysPressed.current['KeyD']) {
        player.x += player.speed
      }
      // If mouse is used, snap player.x towards mouse coordinates smoothly
      const dx = mousePos.current.x - player.x
      player.x += dx * 0.2

      // Keep player bounds inside screen
      player.x = Math.max(15, Math.min(canvas.width - 15, player.x))

      // 2. Shoot lasers automatically
      laserTimer++
      if (laserTimer >= 15) {
        lasers.push({
          x: player.x,
          y: player.y - 15,
          vy: -7,
          width: 2,
          height: 12,
          color: '#ffffff',
        })
        laserTimer = 0
      }

      // Update Lasers
      lasers = lasers.filter((laser) => {
        laser.y += laser.vy
        return laser.y > -20
      })

      // 3. Spawn Asteroids
      asteroidSpawnTimer++
      const spawnInterval = Math.max(25, 60 - Math.floor(localScore / 100))
      if (asteroidSpawnTimer >= spawnInterval) {
        const radius = Math.random() * 15 + 10 // size range
        asteroids.push({
          x: Math.random() * (canvas.width - 40) + 20,
          y: -20,
          vy: Math.random() * 2 + 1.5 + localScore * 0.002, // speed scales with score
          vx: (Math.random() - 0.5) * 1,
          radius: radius,
          points: Math.floor((30 - radius) * 1.5), // smaller = more points
          color: ['#444444', '#666666', '#888888', '#aaaaaa'][Math.floor(Math.random() * 4)],
        })
        asteroidSpawnTimer = 0
      }

      // Update Asteroids
      asteroids = asteroids.filter((asteroid) => {
        asteroid.y += asteroid.vy
        asteroid.x += asteroid.vx

        // Left/Right boundaries check
        if (asteroid.x - asteroid.radius < 0 || asteroid.x + asteroid.radius > canvas.width) {
          asteroid.vx = -asteroid.vx
        }

        // If asteroid reaches bottom, player loses!
        if (asteroid.y - asteroid.radius > canvas.height) {
          endGame()
          return false
        }
        return true
      })

      // 4. Laser and Asteroid Collision Detection
      lasers.forEach((laser) => {
        asteroids.forEach((asteroid, aIdx) => {
          const dist = Math.hypot(laser.x - asteroid.x, laser.y - asteroid.y)
          if (dist < asteroid.radius + 3) {
            // Hit! Remove laser & Split/Remove asteroid
            laser.y = -100 // offscreen

            // Create explosion particles
            for (let i = 0; i < 12; i++) {
              particles.push({
                x: asteroid.x,
                y: asteroid.y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                radius: Math.random() * 2 + 1,
                color: asteroid.color,
                alpha: 1,
                decay: Math.random() * 0.03 + 0.01,
              })
            }

            // Score addition
            localScore += asteroid.points
            setScore(localScore)

            // Split asteroid if large
            if (asteroid.radius > 18) {
              asteroids.push({
                x: asteroid.x - 10,
                y: asteroid.y,
                vx: -1.5,
                vy: asteroid.vy,
                radius: asteroid.radius / 1.5,
                points: Math.floor(asteroid.points / 1.5),
                color: asteroid.color,
              })
              asteroids.push({
                x: asteroid.x + 10,
                y: asteroid.y,
                vx: 1.5,
                vy: asteroid.vy,
                radius: asteroid.radius / 1.5,
                points: Math.floor(asteroid.points / 1.5),
                color: asteroid.color,
              })
            }

            asteroids.splice(aIdx, 1)
          }
        })
      })

      // Update explosion particles
      particles = particles.filter((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        return p.alpha > 0
      })

      // 5. Player and Asteroid Collision (Instant Game Over)
      asteroids.forEach((asteroid) => {
        const dist = Math.hypot(player.x - asteroid.x, player.y - asteroid.y)
        if (dist < asteroid.radius + 12) {
          endGame()
        }
      })

      // 6. Draw Player
      ctx.shadowBlur = 15
      ctx.shadowColor = player.glow
      ctx.fillStyle = player.color
      ctx.beginPath()
      ctx.moveTo(player.x, player.y - 12)
      ctx.lineTo(player.x - 14, player.y + 12)
      ctx.lineTo(player.x + 14, player.y + 12)
      ctx.closePath()
      ctx.fill()
      ctx.shadowBlur = 0 // reset glow

      // Draw jet engines flame effect
      ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#888888'
      ctx.beginPath()
      ctx.moveTo(player.x - 6, player.y + 12)
      ctx.lineTo(player.x + 6, player.y + 12)
      ctx.lineTo(player.x, player.y + 18 + Math.random() * 6)
      ctx.closePath()
      ctx.fill()

      // 7. Draw Lasers
      lasers.forEach((laser) => {
        ctx.fillStyle = laser.color
        ctx.shadowBlur = 10
        ctx.shadowColor = laser.color
        ctx.fillRect(laser.x - laser.width / 2, laser.y, laser.width, laser.height)
      })
      ctx.shadowBlur = 0

      // 8. Draw Asteroids
      asteroids.forEach((asteroid) => {
        ctx.shadowBlur = 12
        ctx.shadowColor = asteroid.color
        ctx.fillStyle = asteroid.color
        ctx.beginPath()
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius, 0, Math.PI * 2)
        ctx.fill()

        // Inner core detailing
        ctx.fillStyle = '#050505'
        ctx.beginPath()
        ctx.arc(asteroid.x, asteroid.y, asteroid.radius * 0.7, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.shadowBlur = 0

      // 9. Draw Particles
      particles.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Continue loop if PLAYING
      if (gameStateRef.current === 'PLAYING') {
        requestRef.current = requestAnimationFrame(gameLoop)
      }
    }

    const endGame = () => {
      setGameState('GAMEOVER')
      cancelAnimationFrame(requestRef.current)
      
      // Update highscore
      const currentScore = scoreRef.current
      const currentHigh = parseInt(localStorage.getItem('arcade_highscore') || '0', 10)
      if (currentScore > currentHigh) {
        localStorage.setItem('arcade_highscore', currentScore.toString())
        setHighScore(currentScore)
      }
    }

    // Launch loop
    requestRef.current = requestAnimationFrame(gameLoop)

    return () => {
      cancelAnimationFrame(requestRef.current)
      canvas.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [isOpen, gameState])

  const startGame = () => {
    setGameState('PLAYING')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 bg-black/80"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#050505] border border-white/10 rounded-none shadow-[0_0_50px_rgba(255,255,255,0.05)] z-10 flex flex-col items-center"
          >
            {/* Header bar */}
            <div className="w-full p-4 border-b border-white/5 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white animate-pulse" />
                <span className="text-white/80 font-sans text-[10px] tracking-[0.3em] font-bold uppercase">System Terminal</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Canvas Area */}
            <div className="relative bg-black w-full flex items-center justify-center p-1 border-b border-white/5">
              <canvas
                ref={canvasRef}
                width={600}
                height={450}
                className="max-w-full h-auto aspect-[4/3] bg-black cursor-none"
              />

              {/* START SCREEN SCREEN OVERLAY */}
              {gameState === 'START' && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-6">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-[0.2em] text-white mb-2 uppercase">
                    Void <span className="text-white/40">Protocol</span>
                  </h3>
                  <p className="text-white/50 text-xs font-sans max-w-md mb-10 leading-relaxed uppercase tracking-wider">
                    Evade the debris. Secure the perimeter. Mouse or Arrow Keys to navigate.
                  </p>
                  
                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-white text-black hover:bg-gray-200 font-black text-[10px] tracking-[0.3em] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 flex items-center gap-3 cursor-pointer uppercase"
                  >
                    Initiate
                    <Play size={12} fill="currentColor" />
                  </button>

                  <div className="mt-12 flex gap-8 text-[10px] text-white/30 font-bold uppercase tracking-[0.2em]">
                    <div>Controls: Arrow Keys / Mouse</div>
                    <div>High Score: <span className="text-white">{highScore}</span></div>
                  </div>
                </div>
              )}

              {/* GAME OVER SCREEN OVERLAY */}
              {gameState === 'GAMEOVER' && (
                <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center text-center p-6">
                  <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-bold mb-4">Critical Failure</span>
                  <h3 className="text-4xl font-black tracking-[0.2em] text-white mb-8 uppercase">
                    System Compromised
                  </h3>
                  
                  <div className="bg-[#050505] border border-white/10 p-6 mb-10 max-w-xs w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Final Score</span>
                      <span className="text-white font-black text-xl">{score}</span>
                    </div>
                    <div className="h-px bg-white/5" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">Best Record</span>
                      <span className="text-white font-black text-xl">{highScore}</span>
                    </div>
                  </div>

                  <button
                    onClick={startGame}
                    className="px-8 py-3 bg-white text-black hover:bg-gray-200 font-black text-[10px] tracking-[0.3em] shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:scale-105 flex items-center gap-3 cursor-pointer uppercase"
                  >
                    Reboot
                    <RotateCcw size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Score HUD footer */}
            <div className="w-full py-4 px-6 flex items-center justify-between text-left bg-black/50 font-bold text-[10px] tracking-[0.3em] uppercase text-white/40">
              <div className="flex gap-2 items-center">
                <span>Score</span>
                <span className="text-white">{score}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span>Best</span>
                <span className="text-white">{highScore}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
