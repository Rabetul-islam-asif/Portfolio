'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { CustomThemeToggle } from '@/components/CustomThemeToggle'

interface NavigationProps {
  activeSection: string
  isScrolled: boolean
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ activeSection, isScrolled, scrollToSection }: NavigationProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { id: 'contact', label: 'Contacts' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'courses', label: 'Courses' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }
  ]

  const isDark = theme === 'dark'

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? (isDark ? 'bg-slate-800/90 backdrop-blur-sm shadow-md border border-slate-700' : 'bg-white/80 backdrop-blur-sm shadow-md border border-white/30') : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* ASIF Text on the left side of navigation */}
          <div className="hidden md:flex items-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mr-8">
              ASIF
            </h2>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                  activeSection === item.id ? 'text-blue-600 font-semibold' : (isDark ? 'text-gray-300' : 'text-gray-800')
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Custom Dark Mode Toggle */}
            {mounted && <CustomThemeToggle />}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className={isDark ? "text-gray-300" : "text-gray-800"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className={isDark ? "bg-slate-800/90 backdrop-blur-sm border border-slate-700" : "bg-white/80 backdrop-blur-sm border border-white/30"}>
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-sm font-medium transition-colors hover:text-blue-600 ${
                      activeSection === item.id ? 'text-blue-600 font-semibold' : (isDark ? 'text-gray-300' : 'text-gray-800')
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}