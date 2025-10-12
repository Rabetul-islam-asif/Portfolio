'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink,
  Phone, 
  MapPin, 
  Facebook, 
  MessageCircle, 
  BookOpen, 
  Award, 
  Code, 
  Heart, 
  Zap
} from 'lucide-react'

// Components
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AIAssistant from '@/components/AIAssistant'
import Snowfall from '@/components/Snowfall'
import SparkFall from '@/components/SparkFall'
import FluidSmoke from '@/components/FluidSmoke'





export default function Home() {npm run dev
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      
      // Hero scroll animation
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeroVisible(false)
      } else {
        setHeroVisible(true)
      }
      lastScrollY.current = currentScrollY
      
      const sections = ['home', 'about', 'education', 'courses', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send the form data to a server
    // For now, we'll just show the success message
    setFormSubmitted(true)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    })
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false)
    }, 5000)
  }

  const skills = [
    { name: 'Programming (C, C++, Python)', icon: Code, level: 85 },
    { name: 'Teaching', icon: BookOpen, level: 90 },
    { name: 'Computing Fundamentals', icon: Award, level: 88 },
    { name: 'Athletics', icon: Zap, level: 75 }
  ]

  const languages = [
    { name: 'Bengali', level: 100 },
    { name: 'English', level: 85 },
    { name: 'Hindi', level: 70 }
  ]

  const hobbies = [
    { name: 'Adventure', icon: Heart },
    { name: 'Cricket', icon: Zap },
    { name: 'Programming', icon: Code }
  ]

  const courses = [
    {
      title: 'Google IT Support Professional Course',
      link: 'https://coursera.org/share/f3cfb69bce4e9c57f89b5bcdb1febcb3',
      provider: 'Google'
    },
    {
      title: 'Detecting and Mitigating Cyber Threats and Attacks',
      link: 'https://coursera.org/share/347decb99d9a9e3cb82008a70f103e3a',
      provider: 'University of Colorado'
    },
    {
      title: 'Cyber Security Fundamentals',
      link: 'https://coursera.org/share/ab38261dcb9733f93068e927394e7fcd',
      provider: 'Google'
    },
    {
      title: 'Google Digital Marketing',
      link: 'https://coursera.org/share/ab38261dcb9733f93068e927394e7fcd',
      provider: 'Google'
    }
  ]

  const education = [
    {
      degree: 'Bachelor in Computer Science',
      institution: 'Stamford University Bangladesh',
      period: '2024 – Present',
      location: 'Bangladesh'
    },
    {
      degree: 'Bachelor in Computer Science (Online)',
      institution: 'University of the People, California, USA',
      period: '2023 – 2024',
      location: 'California, USA'
    },
    {
      degree: 'Higher Secondary Certificate (Science)',
      institution: 'Sonapur Degree College, Noakhali',
      period: '2018 – 2019',
      location: 'Noakhali'
    },
    {
      degree: 'Secondary School Certificate (Science)',
      institution: 'Noakhali Zilla School, Noakhali',
      period: '2020 – 2021',
      location: 'Noakhali'
    }
  ]

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Background Effects */}
      <FluidSmoke />
      <Snowfall />
      <SparkFall />
      
      {/* Background Animation - Fixed layering to prevent overlap */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {/* White mode background */}
        <div className="absolute inset-0 bg-gray-50 dark:bg-transparent transition-opacity duration-500" />
        
        {/* Dark mode background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 opacity-0 dark:opacity-100 transition-opacity duration-500" />
        
        {/* Subtle overlay animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/10" />
      </div>

      {/* Navigation */}
      <Navigation 
        activeSection={activeSection}
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
      />

      {/* Hero Section */}
      <HeroSection 
        heroVisible={heroVisible}
        scrollToSection={scrollToSection}
      />

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">About Me</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Passionate Developer & Educator</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      I am a dedicated Computer Science student with a strong passion for programming and technology. 
                      My journey in the world of computing has been driven by curiosity and a desire to create innovative solutions.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      With expertise in multiple programming languages and a commitment to continuous learning, 
                      I aspire to become an AI developer who can contribute to shaping the future of technology.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-4xl text-white">👨‍💻</span>
                    </div>
                    <p className="font-medium text-gray-600 dark:text-gray-300">
                      Future AI Developer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Education</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{edu.degree}</h3>
                    <span className="text-sm px-3 py-1 rounded-full text-gray-600 dark:text-gray-300 bg-blue-100 dark:bg-blue-900">{edu.period}</span>
                  </div>
                  <p className="font-medium mb-1 text-blue-600 dark:text-blue-400">{edu.institution}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{edu.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Courses & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {courses.map((course, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{course.title}</h3>
                  <p className="font-medium mb-4 text-blue-600 dark:text-blue-400">{course.provider}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    onClick={() => window.open(course.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {skills.map((skill, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800">
                <CardContent className="p-6 text-center">
                  <skill.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{skill.name}</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Languages Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Languages</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {languages.map((lang, index) => (
                <Card key={index} className="bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{lang.name}</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${lang.level}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{lang.level}%</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies Section */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Hobbies & Interests</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {hobbies.map((hobby, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800">
                <CardContent className="p-6 text-center">
                  <hobby.icon className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{hobby.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Projects</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg bg-white dark:bg-slate-800">
              <CardContent className="p-12 text-center">
                <div className="text-6xl mb-6">🚧</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Coming Soon</h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Exciting AI and app development projects are currently in progress. 
                  Stay tuned for innovative solutions and cutting-edge applications!
                </p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                  Future AI Developer
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative overflow-hidden bg-white dark:bg-slate-900">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Let's Connect
            </h2>
            <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Information Card */}
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-all duration-500 group bg-white dark:bg-slate-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:rotate-12 transition-transform duration-300">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Contact Information
                    </h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                        <Phone className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Phone</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">+8801885356821</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Email</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">asifrabetul@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                      <div className="w-10 h-10 bg-pink-600/20 rounded-full flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Location</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-100">Noakhali, Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form Card */}
              <Card className="shadow-2xl border-0 transform hover:scale-105 transition-all duration-500 bg-white dark:bg-slate-800">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-4 hover:rotate-12 transition-transform duration-300">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Send Message
                    </h3>
                  </div>
                  
                  {formSubmitted && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
                      <p className="text-sm font-medium text-green-700">Your message has been sent successfully!</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-200">
                        Your Name
                      </Label>
                      <Input 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="John Doe" 
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm bg-white/60 dark:bg-gray-800/60"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-200">
                        Your Email
                      </Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="john@example.com" 
                        className="transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm bg-white/60 dark:bg-gray-800/60"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium mb-2 block text-gray-700 dark:text-gray-200">
                        Your Message
                      </Label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="Tell me about your project or just say hello!" 
                        className="transition-all duration-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent backdrop-blur-sm resize-none bg-white/60 dark:bg-gray-800/60" 
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CV Download Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Download My CV
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Get a detailed overview of my qualifications, experience, and skills
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => window.open('https://drive.google.com/file/d/1zoaY1yEf93Hl9vHIdzRx1iqLR1iYkZ60/view?usp=drive_link', '_blank')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View CV Online
              </Button>
              
              <Button 
                onClick={() => window.open('https://drive.google.com/uc?export=download&id=1zoaY1yEf93Hl9vHIdzRx1iqLR1iYkZ60', '_blank')}
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CV
              </Button>
            </div>
            
            <div className="mt-8 flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>PDF Format</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Updated 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            © 2024 Rabetul Islam Asif. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300" 
              onClick={() => window.open('https://github.com/Rabetul-islam-asif', '_blank')}
            >
              <Github className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
              <Linkedin className="h-5 w-5 text-blue-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300" 
              onClick={() => window.open('https://www.facebook.com/share/171vkfyPbE/', '_blank')}
            >
              <Facebook className="h-5 w-5 text-blue-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:scale-110 transition-transform duration-300" 
              onClick={() => window.open('mailto:asifrabetul@gmail.com', '_blank')}
            >
              <Mail className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Social Media Icons - Left Side */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col space-y-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:scale-110 transition-transform duration-300"
          onClick={() => window.open('https://github.com/Rabetul-islam-asif', '_blank')}
        >
          <Github className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:scale-110 transition-transform duration-300"
        >
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
          <Mail className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </Button>
      </div>
    </div>
  )
}