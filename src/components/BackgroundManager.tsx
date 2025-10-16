"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export function BackgroundManager() {
  const { theme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    if (theme === "light") {
      // Force the light mode solid color
      root.style.backgroundColor = '#BCE7FC'
      body.style.backgroundColor = '#BCE7FC'
      root.style.minHeight = '100vh'
      body.style.minHeight = '100vh'
      
      // Make all backgrounds transparent except cards
      const allElements = document.querySelectorAll('*')
      allElements.forEach(el => {
        const element = el as HTMLElement
        if (!element.classList.contains('card') && 
            !element.classList.contains('bg-card') && 
            element.tagName !== 'DIALOG') {
          element.style.backgroundColor = 'transparent'
        }
      })
    } else if (theme === "dark") {
      // Restore dark mode gradient
      const darkGradient = 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
      root.style.background = darkGradient
      body.style.background = darkGradient
      root.style.minHeight = '100vh'
      body.style.minHeight = '100vh'
      
      // Reset all elements to use their default dark mode styling
      const allElements = document.querySelectorAll('*')
      allElements.forEach(el => {
        const element = el as HTMLElement
        if (!element.classList.contains('card') && 
            !element.classList.contains('bg-card') && 
            element.tagName !== 'DIALOG') {
          element.style.backgroundColor = ''
        }
      })
    }
  }, [theme])

  return null
}