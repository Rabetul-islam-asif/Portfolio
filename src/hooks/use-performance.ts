'use client'

import { useEffect, useState } from 'react'

export function usePerformance() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReduced(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      clearTimeout(timer)
    }
  }, [])

  return { isLoading, isReduced }
}