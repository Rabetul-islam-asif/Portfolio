'use client'

import { useEffect, useRef } from 'react'

export default function IndependentSmoke() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0, isDown: false })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    console.log("Initializing smoke animation...")

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Get WebGL context
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    }) || canvas.getContext('experimental-webgl', {
      alpha: true,
      premultipliedAlpha: false
    })

    if (!gl) {
      console.error('WebGL not supported')
      return
    }

    console.log('WebGL initialized successfully')

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_position * 0.5 + 0.5;
      }
    `

    // Fragment shader for smoke effect
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouseDown;
      
      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      void main() {
        vec2 st = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Create smoke effect based on mouse movement
        float dist = distance(st, mouse);
        float smoke = 0.0;
        
        // Reduced size (40% smaller) and intensity (30% lower)
        float smokeRadius = 0.12; // Reduced from 0.2
        float smokeIntensity = 0.07; // Reduced from 0.1
        
        if (u_mouseDown > 0.5) {
          smoke = exp(-dist * (1.0 / smokeRadius)) * smokeIntensity;
        }
        
        // Add some animated noise for movement effect
        float n = noise(st * 8.0 + u_time * 0.05) * 0.01;
        smoke += n;
        
        // Create colorful smoke with HSV
        float hue = u_time * 0.05 + dist * 3.0;
        vec3 color = hsv2rgb(vec3(hue, 0.7, smoke));
        
        // Set alpha for transparency
        float alpha = smoke * 0.6;
        
        gl_FragColor = vec4(color, alpha);
      }
    `

    // Compile shaders
    const compileShader = (gl: WebGLRenderingContext, source: string, type: number) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    const vertexShader = compileShader(gl as WebGLRenderingContext, vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(gl as WebGLRenderingContext, fragmentShaderSource, gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader) {
      console.error('Shader compilation failed')
      return
    }

    // Create program
    const program = gl.createProgram()
    if (!program) {
      console.error('Failed to create program')
      return
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    // Set up geometry
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse')
    const mouseDownUniformLocation = gl.getUniformLocation(program, 'u_mouseDown')

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseUp = () => {
      mouseRef.current.isDown = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = e.touches[0].clientX - rect.left
        mouseRef.current.y = e.touches[0].clientY - rect.top
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current.x = e.touches[0].clientX - rect.left
        mouseRef.current.y = e.touches[0].clientY - rect.top
        mouseRef.current.isDown = true
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      mouseRef.current.isDown = false
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })

    // Animation loop
    let startTime = Date.now()
    
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000

      // Set viewport
      gl.viewport(0, 0, canvas.width, canvas.height)

      // Clear canvas with transparency
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Use program
      gl.useProgram(program)

      // Set up position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)

      // Set uniforms
      gl.uniform1f(timeUniformLocation, currentTime)
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseUniformLocation, mouseRef.current.x, mouseRef.current.y)
      gl.uniform1f(mouseDownUniformLocation, mouseRef.current.isDown ? 1.0 : 0.0)

      // Enable blending for proper transparency
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationRef.current = requestAnimationFrame(render)
    }

    console.log('Starting animation loop...')
    render()

    // Create initial test effect after 1 second
    setTimeout(() => {
      console.log('Creating test smoke effect...')
      mouseRef.current.x = canvas.width / 2
      mouseRef.current.y = canvas.height / 2
      mouseRef.current.isDown = true
      setTimeout(() => {
        mouseRef.current.isDown = false
      }, 300)
    }, 1000)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}