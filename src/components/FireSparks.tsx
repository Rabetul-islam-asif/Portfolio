'use client'

import { useEffect, useRef, useState } from 'react'

interface Spark {
  x: number
  y: number
  size: number
  baseSize: number
  color: string
  life: number
  maxLife: number
  vx: number
  vy: number
  flickerSpeed: number
  flickerOffset: number
  brightness: number
  glowSize: number
}

const FireSparks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const createSpark = (): Spark => {
    // Fire colors: orange, yellow, red tones
    const colors = [
      '#FF4500', // Orange Red
      '#FF6347', // Tomato
      '#FF7F50', // Coral
      '#FFA500', // Orange
      '#FFD700', // Gold
      '#FF8C00', // Dark Orange
      '#FF6347', // Tomato
      '#FF4500', // Orange Red
      '#DC143C', // Crimson
      '#B22222', // Fire Brick
    ]
    
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 50, // Start near bottom
      size: Math.random() * 4 + 2,
      baseSize: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100, // 100-300 frames lifetime
      vx: (Math.random() - 0.5) * 1, // Slight horizontal drift
      vy: -(Math.random() * 2 + 1), // Upward movement (negative Y)
      flickerSpeed: Math.random() * 0.3 + 0.1,
      flickerOffset: Math.random() * Math.PI * 2,
      brightness: 1,
      glowSize: Math.random() * 15 + 10
    }
  }

  const updateSparks = () => {
    timeRef.current += 0.016 // ~60fps
    
    // Create new sparks continuously
    if (Math.random() < 0.3) { // 30% chance each frame
      sparksRef.current.push(createSpark())
    }
    
    // Update existing sparks
    sparksRef.current = sparksRef.current.filter(spark => {
      spark.life++
      
      // Update position
      spark.x += spark.vx
      spark.y += spark.vy
      
      // Add slight wave motion
      spark.x += Math.sin(timeRef.current * 2 + spark.flickerOffset) * 0.5
      
      // Flickering effect
      const flicker = Math.sin(timeRef.current * spark.flickerSpeed * 10 + spark.flickerOffset)
      spark.brightness = 0.6 + Math.abs(flicker) * 0.4
      spark.size = spark.baseSize * (0.8 + Math.abs(flicker) * 0.4)
      
      // Gradually fade out
      const lifeRatio = spark.life / spark.maxLife
      spark.brightness *= (1 - lifeRatio * 0.02)
      
      // Remove if off screen or dead
      return spark.life < spark.maxLife && spark.y > -50 && spark.brightness > 0.1
    })
  }

  const drawSparks = (ctx: CanvasRenderingContext2D) => {
    // Clear with slight fade for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    sparksRef.current.forEach(spark => {
      const alpha = spark.brightness * (1 - spark.life / spark.maxLife)
      
      // Create radial gradient for glow effect
      const gradient = ctx.createRadialGradient(
        spark.x, spark.y, 0,
        spark.x, spark.y, spark.glowSize
      )
      
      // Parse the base color and add alpha
      const baseColor = spark.color
      gradient.addColorStop(0, `${baseColor}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(0.3, `${baseColor}${Math.floor(alpha * 128).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(0.7, `${baseColor}${Math.floor(alpha * 64).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(1, `${baseColor}00`)
      
      // Draw glow
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(spark.x, spark.y, spark.glowSize, 0, Math.PI * 2)
      ctx.fill()
      
      // Draw bright center
      const centerGradient = ctx.createRadialGradient(
        spark.x, spark.y, 0,
        spark.x, spark.y, spark.size
      )
      
      centerGradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`)
      centerGradient.addColorStop(0.5, `${baseColor}${Math.floor(alpha * 200).toString(16).padStart(2, '0')}`)
      centerGradient.addColorStop(1, `${baseColor}${Math.floor(alpha * 100).toString(16).padStart(2, '0')}`)
      
      ctx.fillStyle = centerGradient
      ctx.beginPath()
      ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2)
      ctx.fill()
    })
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    updateSparks()
    drawSparks(ctx)
    
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Start animation
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default FireSparks