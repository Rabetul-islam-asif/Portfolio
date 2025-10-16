'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bot } from 'lucide-react'
import { useTheme } from 'next-themes'

interface Message {
  type: 'user' | 'ai'
  content: string
}

export default function AIAssistant() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [userMessage, setUserMessage] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatOpen && 
          chatRef.current && 
          !chatRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.chat-assistant-button')) {
        setChatOpen(false)
      }
    }

    if (chatOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [chatOpen])

  const handleChatMessage = async () => {
    if (!userMessage.trim()) return
    
    const userMsg: Message = { type: 'user', content: userMessage }
    setMessages(prev => [...prev, userMsg])
    setUserMessage('')

    // Comprehensive AI response system with detailed personal information
    let aiResponse = "I'm here to help you learn about Rabetul Islam Asif! Feel free to ask about his background, education, skills, or anything else."
    
    const lowerMsg = userMessage.toLowerCase()
    
    // Personal Information
    if (lowerMsg.includes('full name') || lowerMsg.includes('name') || lowerMsg.includes('who are you') || lowerMsg.includes('who is asif')) {
      aiResponse = "Rabetul Islam Asif is a dedicated Computer Science student, programmer, and aspiring AI developer. His full name is Rabetul Islam Asif, and he's passionate about technology, education, and creating innovative solutions."
    }
    
    // Age/Personal Details
    else if (lowerMsg.includes('age') || lowerMsg.includes('old') || lowerMsg.includes('born')) {
      aiResponse = "Based on his educational timeline, Rabetul Islam Asif is likely in his early 20s. He completed his Higher Secondary Certificate in 2018-2019 and is currently pursuing his Bachelor's degree in Computer Science."
    }
    
    // Contact Information
    else if (lowerMsg.includes('phone') || lowerMsg.includes('contact') || lowerMsg.includes('call') || lowerMsg.includes('number')) {
      aiResponse = "You can contact Rabetul Islam Asif at +8801885356821. He's also available via email at asifrabetul@gmail.com and is active on various social media platforms including GitHub, LinkedIn, and Facebook."
    }
    
    // Email
    else if (lowerMsg.includes('email') || lowerMsg.includes('mail') || lowerMsg.includes('gmail')) {
      aiResponse = "Rabetul Islam Asif's email address is asifrabetul@gmail.com. Feel free to reach out to him for collaborations, projects, or any inquiries!"
    }
    
    // Location
    else if (lowerMsg.includes('location') || lowerMsg.includes('where') || lowerMsg.includes('live') || lowerMsg.includes('address') || lowerMsg.includes('noakhali')) {
      aiResponse = "Rabetul Islam Asif is based in Noakhali, Bangladesh. He's currently studying at Stamford University Bangladesh while also pursuing online education from international institutions."
    }
    
    // Education
    else if (lowerMsg.includes('study') || lowerMsg.includes('education') || lowerMsg.includes('educational')) {
      aiResponse = "Rabetul Islam Asif has a strong educational background: SSC in Science from Noakhali Zilla School (2020-2021), HSC in Science from Sonapur Degree College (2018-2019), and currently pursuing Bachelor's in Computer Science at Stamford University Bangladesh. He also studied online at University of the People, California, USA."
    }
    
    // Skills
    else if (lowerMsg.includes('skills') || lowerMsg.includes('skill') || lowerMsg.includes('expertise') || lowerMsg.includes('ability')) {
      aiResponse = "Rabetul Islam Asif has diverse skills including: Programming (C, C++, Python) at 85% proficiency, Teaching at 90%, Computing Fundamentals at 88%, and Athletics at 75%. He's also multilingual with proficiency in Bengali (100%), English (85%), and Hindi (70%)."
    }
    
    // Programming
    else if (lowerMsg.includes('programming') || lowerMsg.includes('code') || lowerMsg.includes('developer') || lowerMsg.includes('c++') || lowerMsg.includes('python') || lowerMsg.includes('c language')) {
      aiResponse = "Asif is proficient in multiple programming languages including C, C++, and Python with 85% proficiency. He's a programmer and future AI developer with strong computing fundamentals and a passion for creating innovative solutions."
    }
    
    // Courses and Certifications
    else if (lowerMsg.includes('courses') || lowerMsg.includes('certification') || lowerMsg.includes('certificate') || lowerMsg.includes('coursera')) {
      aiResponse = "Asif has completed several prestigious courses: Google IT Support Professional Course, Detecting and Mitigating Cyber Threats and Attacks (University of Colorado), Cyber Security Fundamentals (Google), and Google Digital Marketing. All courses are from Coursera, showing his commitment to continuous learning."
    }
    
    // Greetings
    else if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey') || lowerMsg.includes('good')) {
      aiResponse = "Hello! I'm excited to tell you about Rabetul Islam Asif. He's an amazing Computer Science student with diverse skills and big dreams. What would you like to know about him?"
    }
    
    // Help/What can I ask
    else if (lowerMsg.includes('help') || lowerMsg.includes('what can') || lowerMsg.includes('ask') || lowerMsg.includes('information')) {
      aiResponse = "You can ask me anything about Rabetul Islam Asif! I can tell you about his full name, age, contact information, education (schools, colleges, universities), skills (programming, teaching, athletics), courses, hobbies, languages, career goals, and much more. What interests you most?"
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', content: aiResponse }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`relative ${chatOpen ? 'mb-4' : ''}`}>
        {chatOpen && (
          <div ref={chatRef} className="absolute bottom-16 right-0 w-80 h-96 backdrop-blur-sm rounded-lg shadow-2xl border flex flex-col" style={{ backgroundColor: isDark ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)', borderColor: isDark ? '#374151' : '#e5e7eb' }}>
            <div className="p-4 rounded-t-lg" style={{ backgroundColor: '#2563eb' }}>
              <h3 className="font-semibold text-white">AI Assistant</h3>
              <p className="text-sm opacity-90 text-white">Ask me about Asif!</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.length === 0 && (
                <div className="text-sm space-y-2" style={{ color: isDark ? '#d1d5db' : '#4b5563' }}>
                  <p>👋 Hello! I'm your AI assistant for Rabetul Islam Asif's portfolio.</p>
                  <p>I can tell you about:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>📚 His education (schools, colleges, universities)</li>
                    <li>💻 Programming skills and technical expertise</li>
                    <li>🎯 Courses and certifications</li>
                    <li>📞 Contact information and location</li>
                    <li>🏃 Hobbies and personal interests</li>
                    <li>🌐 Language proficiencies</li>
                    <li>🚀 Career goals and aspirations</li>
                  </ul>
                  <p>Feel free to ask me anything!</p>
                </div>
              )}
              {messages.map((msg, index) => (
                <div key={index} className={`max-w-xs ${
                  msg.type === 'user' ? 'ml-auto' : 'mr-auto'
                } rounded-lg p-3 text-sm`} style={{ 
                  backgroundColor: msg.type === 'user' ? '#2563eb' : (isDark ? '#374151' : '#f3f4f6'),
                  color: msg.type === 'user' ? 'white' : (isDark ? '#f3f4f6' : '#1f2937')
                }}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="p-4 border-t" style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}>
              <div className="flex space-x-2">
                <Input
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Ask about Asif..."
                  onKeyPress={(e) => e.key === 'Enter' && handleChatMessage()}
                  className="flex-1 placeholder:text-gray-400 dark:placeholder:text-gray-400"
                  style={{ backgroundColor: isDark ? '#1f2937' : 'white', borderColor: isDark ? '#374151' : '#d1d5db', color: isDark ? '#f3f4f6' : '#1f2937' }}
                />
                <Button size="sm" onClick={handleChatMessage} style={{ backgroundColor: '#2563eb' }}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        )}
        <Button
          size="lg"
          className="chat-assistant-button bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-full w-16 h-16 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none relative overflow-hidden group"
          onClick={() => setChatOpen(!chatOpen)}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
          
          {/* Pulsing ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 group-hover:border-white/50 transition-all duration-300 animate-pulse"></div>
          
          {/* Icon with rotation */}
          <Bot className="h-7 w-7 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  )
}