'use client'

import { Button } from '@/components/ui/button'
import { Github, Linkedin, Facebook, Mail } from 'lucide-react'
import { useTheme } from 'next-themes'

interface HeroSectionProps {
  heroVisible: boolean
  scrollToSection: (sectionId: string) => void
}

export default function HeroSection({ heroVisible, scrollToSection }: HeroSectionProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          {/* Welcome Message */}
          <div className="mb-8">
            <div className="relative inline-block">
              {/* Main text with soft gradient and gentle animations */}
              <h2 className="relative text-7xl md:text-9xl font-thin text-center bg-gradient-to-r from-cyan-400/80 via-purple-400/80 to-pink-400/80 bg-clip-text text-transparent transform transition-all duration-1500 hover:scale-110 hover:rotate-1">
                Welcome
              </h2>
            </div>
            
            {/* Elegant subtitle with gentle fade-in */}
            <div className="mt-6">
              <p className="text-2xl md:text-3xl font-extralight bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
                to My Portfolio
              </p>
              
              {/* Decorative underline */}
              <div className="mt-3 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent"></div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Rabetul Islam Asif
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-medium text-gray-800 dark:text-gray-100">
            Computer Science Student | Programmer | Future AI Developer
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Passionate about technology, education, and creating innovative solutions for the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('projects')}
              className="bg-white hover:bg-gray-100 text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:border-blue-700 font-semibold"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 font-semibold"
            >
              Get In Touch
              <Mail className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="flex justify-center space-x-6 mt-12">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300" 
              onClick={() => window.open('https://github.com/Rabetul-islam-asif', '_blank')}
            >
              <Github className="h-6 w-6" style={{ color: isDark ? '#e5e7eb' : '#1f2937' }} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <Linkedin className="h-6 w-6 text-blue-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300" 
              onClick={() => window.open('https://www.facebook.com/share/171vkfyPbE/', '_blank')}
            >
              <Facebook className="h-6 w-6 text-blue-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300" 
              onClick={() => window.open('mailto:asifrabetul@gmail.com', '_blank')}
            >
              <Mail className="h-6 w-6" style={{ color: isDark ? '#e5e7eb' : '#1f2937' }} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}