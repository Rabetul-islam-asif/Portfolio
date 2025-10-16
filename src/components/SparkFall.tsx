'use client'

import { useEffect, useRef } from 'react'

interface Spark {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  swing: number
  swingSpeed: number
  swingAmount: number
  color: string
  glowColor: string
  brightness: number
  flickerSpeed: number
  flickerOffset: number
}

export default function SparkFall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()
  const sparksRef = useRef<Spark[]>([])

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
    
    // Color palette for sparks
    const sparkColors = [
      { color: '#FFD700', glow: '#FFA500' }, // Gold
      { color: '#FF69B4', glow: '#FF1493' }, // Hot Pink
      { color: '#00CED1', glow: '#00FFFF' }, // Dark Turquoise
      { color: '#FF6347', glow: '#FF4500' }, // Tomato
      { color: '#9370DB', glow: '#8A2BE2' }, // Medium Purple
      { color: '#00FF7F', glow: '#00FA9A' }, // Spring Green
    ]
    
    // Create sparks
    const numberOfSparks = Math.min(60, Math.floor((canvas.width * canvas.height) / 15000))
    console.log(`SparkFall: Creating ${numberOfSparks} sparks`)
    console.log('SparkFall: Canvas size:', canvas.width, 'x', canvas.height)
    
    sparksRef.current = []
    for (let i = 0; i < numberOfSparks; i++) {
      const colorPair = sparkColors[Math.floor(Math.random() * sparkColors.length)]
      sparksRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.3, // 0.3-1.3px
        speed: Math.random() * 1 + 0.3, // 0.3-1.3
        opacity: Math.random() * 0.25 + 0.05, // 0.05-0.3
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.01 + 0.001,
        swingAmount: Math.random() * 15 + 5,
        color: colorPair.color,
        glowColor: colorPair.glow,
        brightness: 1,
        flickerSpeed: Math.random() * 0.1 + 0.05,
        flickerOffset: Math.random() * Math.PI * 2
      })
    }
    
    // Draw spark with glow effect
    const drawSpark = (spark: Spark, time: number) => {
      ctx.save()
      
      // Flickering effect
      const flicker = Math.sin(time * spark.flickerSpeed + spark.flickerOffset)
      const currentBrightness = spark.brightness * (0.7 + Math.abs(flicker) * 0.3)
      const currentOpacity = spark.opacity * currentBrightness
      
      ctx.globalAlpha = currentOpacity
      
      // Draw glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = spark.glowColor
      
      // Draw spark
      ctx.beginPath()
      ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2)
      ctx.fillStyle = spark.color
      ctx.fill()
      
      ctx.restore()
    }
    
    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      sparksRef.current.forEach((spark) => {
        // Update position
        spark.y += spark.speed
        spark.swing += spark.swingSpeed
        spark.x += Math.sin(spark.swing) * spark.swingAmount * 0.1
        
        // Fade out near bottom
        if (spark.y > canvas.height - 100) {
          spark.opacity *= 0.95
        }
        
        // Reset if off screen or invisible
        if (spark.y > canvas.height + spark.radius || spark.opacity < 0.01) {
          spark.y = -spark.radius
          spark.x = Math.random() * canvas.width
          spark.opacity = Math.random() * 0.25 + 0.05
        }
        
        // Handle horizontal boundaries
        if (spark.x > canvas.width + spark.radius) {
          spark.x = -spark.radius
        } else if (spark.x < -spark.radius) {
          spark.x = canvas.width + spark.radius
        }
        
        // Draw spark
        drawSpark(spark, time * 0.001)
      })
      
      animationIdRef.current = requestAnimationFrame(animate)
    }
    
    animate(0)
    console.log('SparkFall: Animation started')
    
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