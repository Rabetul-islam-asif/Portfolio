'use client'

import { useEffect, useRef } from 'react'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  swing: number
  swingSpeed: number
  swingAmount: number
  isFireSpark?: boolean // New property to identify fire sparks
}

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const snowflakesRef = useRef<Snowflake[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Create snowflakes - increased by 20%
    const numberOfSnowflakes = Math.min(130, Math.floor((canvas.width * canvas.height) / 10000 * 1.2))
    console.log(`Snowfall: Creating ${numberOfSnowflakes} particles (20% increase) with 35% increased speed`)
    console.log('Snowfall: Canvas size:', canvas.width, 'x', canvas.height)
    
    snowflakesRef.current = []
    for (let i = 0; i < numberOfSnowflakes; i++) {
      // Make 20% of particles fire sparks
      const isFireSpark = Math.random() < 0.2
      
      snowflakesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.6, // 0.6-2.4px
        speed: (Math.random() * 0.88 + 0.22) * 1.35, // 35% faster: 0.30-1.49
        opacity: Math.random() * 0.3 + 0.05, // 0.05-0.35
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.01 + 0.001,
        swingAmount: Math.random() * 10 + 5,
        isFireSpark
      })
    }
    
    // Draw snowflake
    const drawSnowflake = (snowflake: Snowflake) => {
      ctx.save()
      ctx.globalAlpha = snowflake.opacity
      
      // Draw circle with glow
      ctx.beginPath()
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
      
      // Use fire spark colors for 20% of particles
      if (snowflake.isFireSpark) {
        // Fire spark colors: orange, red, yellow
        const fireColors = ['#FF6B35', '#FF9558', '#FFD23F', '#FF4E50', '#FC913A']
        const color = fireColors[Math.floor(Math.random() * fireColors.length)]
        ctx.fillStyle = color
        ctx.shadowBlur = 20
        ctx.shadowColor = color
      } else {
        // Regular snowflake
        ctx.fillStyle = '#ffffff'
        ctx.shadowBlur = 15
        ctx.shadowColor = '#ffffff'
      }
      
      ctx.fill()
      
      ctx.restore()
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      snowflakesRef.current.forEach((snowflake) => {
        // Update position
        snowflake.y += snowflake.speed
        snowflake.swing += snowflake.swingSpeed
        snowflake.x += Math.sin(snowflake.swing) * snowflake.swingAmount * 0.1
        
        // Fade out near bottom
        if (snowflake.y > canvas.height - 100) {
          snowflake.opacity *= 0.95
        }
        
        // Reset if off screen or invisible
        if (snowflake.y > canvas.height + snowflake.radius || snowflake.opacity < 0.01) {
          snowflake.y = -snowflake.radius
          snowflake.x = Math.random() * canvas.width
          snowflake.opacity = Math.random() * 0.3 + 0.05
          // Maintain the fire spark property when resetting
          if (snowflake.isFireSpark) {
            // Randomly change fire spark color on reset
            const fireColors = ['#FF6B35', '#FF9558', '#FFD23F', '#FF4E50', '#FC913A']
            // Color will be assigned in drawSnowflake function
          }
        }
        
        // Handle horizontal boundaries
        if (snowflake.x > canvas.width + snowflake.radius) {
          snowflake.x = -snowflake.radius
        } else if (snowflake.x < -snowflake.radius) {
          snowflake.x = canvas.width + snowflake.radius
        }
        
        // Draw snowflake
        drawSnowflake(snowflake)
      })
      
      animationIdRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    console.log('Snowfall: Animation started')
    
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}