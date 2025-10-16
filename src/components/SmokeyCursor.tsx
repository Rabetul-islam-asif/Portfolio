'use client'

import { useEffect, useRef, useState } from 'react'

interface MousePosition {
  x: number
  y: number
}

interface Velocity {
  x: number
  y: number
}

interface Dye {
  position: MousePosition
  velocity: Velocity
  color: [number, number, number]
  radius: number
}

export default function SmokeyCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const lastMouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      setError('WebGL not supported')
      return
    }

    try {
      // Set canvas size
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Vertex shader
      const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        
        void main() {
          gl_Position = vec4(a_position, 0.0, 1.0);
          v_texCoord = a_texCoord;
        }
      `

      // Fragment shader for fluid simulation
      const fragmentShaderSource = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform vec2 u_lastMouse;
        uniform float u_time;
        
        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution;
          vec2 mouse = u_mouse / u_resolution;
          vec2 lastMouse = u_lastMouse / u_resolution;
          
          vec2 mouseVel = mouse - lastMouse;
          float mouseDist = distance(st, mouse);
          
          // Create dye effect at mouse position
          float dye = 0.0;
          if (mouseDist < 0.1) {
            dye = 1.0 - (mouseDist / 0.1);
          }
          
          // Add velocity influence
          float velInfluence = length(mouseVel) * 0.5;
          dye += velInfluence * exp(-mouseDist * 10.0);
          
          // Sample current texture
          vec4 currentColor = texture2D(u_texture, v_texCoord);
          
          // Create color based on mouse movement
          float hue = 0.8 + sin(u_time * 0.001) * 0.2; // Pink to blue range
          vec3 dyeColor = hsv2rgb(vec3(hue, 0.7, 0.8));
          
          // Mix with existing color
          vec3 finalColor = mix(currentColor.rgb, dyeColor, dye * 0.1);
          
          // Add some fade
          finalColor *= 0.98;
          
          gl_FragColor = vec4(finalColor, currentColor.a * 0.99 + dye * 0.1);
        }
      `

      // Create and compile shaders
      const createShader = (type: number, source: string) => {
        const shader = gl.createShader(type)!
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
          gl.deleteShader(shader)
          return null
        }
        return shader
      }

      const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)
      const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource)

      if (!vertexShader || !fragmentShader) {
        throw new Error('Failed to create shaders')
      }

      // Create program
      const program = gl.createProgram()!
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program))
        throw new Error('Failed to link program')
      }

      gl.useProgram(program)

      // Set up geometry
      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ])

      const texCoords = new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
      ])

      // Create buffers
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

      const texCoordBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW)

      // Set up attributes
      const positionLocation = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord')
      gl.enableVertexAttribArray(texCoordLocation)
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

      // Get uniform locations
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
      const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
      const lastMouseLocation = gl.getUniformLocation(program, 'u_lastMouse')
      const timeLocation = gl.getUniformLocation(program, 'u_time')

      // Create texture
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

      // Initialize texture with transparent data
      const initialData = new Uint8Array(canvas.width * canvas.height * 4)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, initialData)

      // Create framebuffer for rendering to texture
      const framebuffer = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

      let startTime = Date.now()

      const handleMouseMove = (e: MouseEvent) => {
        lastMouseRef.current = { ...mouseRef.current }
        mouseRef.current = { x: e.clientX, y: e.clientY }
      }

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          lastMouseRef.current = { ...mouseRef.current }
          mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
      }

      const handleResize = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        gl.viewport(0, 0, canvas.width, canvas.height)
        
        // Reinitialize texture
        const newData = new Uint8Array(canvas.width * canvas.height * 4)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas.width, canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, newData)
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('resize', handleResize)

      // Initialize mouse position
      mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      lastMouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

      // Animation loop
      const animate = () => {
        // Bind framebuffer for rendering to texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
        gl.viewport(0, 0, canvas.width, canvas.height)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        gl.enable(gl.BLEND)
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

        // Set uniforms
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform2f(mouseLocation, mouseRef.current.x, canvas.height - mouseRef.current.y)
        gl.uniform2f(lastMouseLocation, lastMouseRef.current.x, canvas.height - lastMouseRef.current.y)
        gl.uniform1f(timeLocation, (Date.now() - startTime) / 1000)

        // Draw to texture
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        // Bind default framebuffer for rendering to screen
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        gl.viewport(0, 0, canvas.width, canvas.height)

        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        // Draw texture to screen
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        animationRef.current = requestAnimationFrame(animate)
      }

      animate()
      setIsInitialized(true)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('touchmove', handleTouchMove)
        window.removeEventListener('resize', handleResize)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    } catch (err) {
      console.error('SmokeyCursor initialization error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    }
  }, [])

  if (error) {
    return null
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ mixBlendMode: 'multiply' }}
      />
    </>
  )
}