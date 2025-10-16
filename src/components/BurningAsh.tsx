'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedY: number
  speedX: number
  opacity: number
  life: number
  age: number
  colorPhase: number
  reset(): void
  update(): void
  draw(ctx: CanvasRenderingContext2D): void
}

const BurningAsh = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const widthRef = useRef(0)
  const heightRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Initialize canvas size
    const resizeCanvas = () => {
      widthRef.current = window.innerWidth
      heightRef.current = window.innerHeight
      canvas.width = widthRef.current
      canvas.height = heightRef.current
      initParticles()
    }

    // Particle class implementation
    class ParticleImpl implements Particle {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      opacity: number
      life: number
      age: number
      colorPhase: number

      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * widthRef.current
        this.y = Math.random() * -heightRef.current
        this.size = Math.random() * 3 + 1
        this.speedY = Math.random() * 1.5 + 0.5
        this.speedX = Math.random() * 0.6 - 0.3
        this.opacity = Math.random() * 0.8 + 0.2
        this.life = Math.random() * 200 + 100
        this.age = 0
        this.colorPhase = 0
      }

      update() {
        this.y += this.speedY
        this.x += this.speedX * Math.sin(this.y / 30) // sway like wind
        this.age++
        this.colorPhase = this.age / this.life
        if (this.age >= this.life || this.y > heightRef.current) {
          this.reset()
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 4)
        
        if (this.colorPhase < 0.3) {
          // Hot ember phase - orange/red
          grd.addColorStop(0, `rgba(255, ${150 + Math.random() * 50}, 0, ${this.opacity})`)
          grd.addColorStop(1, "rgba(80,20,0,0)")
        } else if (this.colorPhase < 0.7) {
          // Burning phase - dark orange/brown
          grd.addColorStop(0, `rgba(200,80,30, ${this.opacity * 0.7})`)
          grd.addColorStop(1, "rgba(50,20,10,0)")
        } else {
          // Ash phase - gray
          grd.addColorStop(0, `rgba(100,100,100, ${this.opacity * 0.4})`)
          grd.addColorStop(1, "rgba(0,0,0,0)")
        }
        
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 200; i++) {
        particlesRef.current.push(new ParticleImpl())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, widthRef.current, heightRef.current)
      
      for (const p of particlesRef.current) {
        p.update()
        p.draw(ctx)
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    // Event listeners
    window.addEventListener("resize", resizeCanvas)
    
    // Initialize
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ 
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default BurningAsh