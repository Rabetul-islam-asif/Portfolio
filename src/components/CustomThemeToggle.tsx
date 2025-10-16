"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function CustomThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDarkMode(theme === 'dark')
  }, [theme])

  const switchTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark'
    setTheme(newTheme)
    setIsDarkMode(!isDarkMode)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="toggle toggle--daynight">
        <input 
          type="checkbox" 
          id="toggle--daynight" 
          className="toggle--checkbox" 
          checked={isDarkMode}
          onChange={switchTheme}
        />
        <label className="toggle--btn" htmlFor="toggle--daynight">
          <span className="toggle--feature"></span>
        </label>
      </div>
      
      <style jsx>{`
        .toggle {
          display: block;
          text-align: center;
          margin-top: 0px;
          user-select: none;
        }
        
        .toggle--checkbox {
          display: none;
        }
        
        .toggle--btn {
          display: block;
          margin: 0 auto;
          font-size: 1.4em;
          transition: all 350ms ease-in;
          position: relative;
          height: 24px;
          width: 48px;
          border-radius: 24px;
          border: 2px solid #1c1c1c;
          background-color: #3c4145;
          cursor: pointer;
        }
        
        .toggle--btn:hover {
          cursor: pointer;
        }
        
        .toggle--btn:before,
        .toggle--btn:after {
          content: '';
          display: block;
          transition: all 250ms ease-in;
        }
        
        .toggle--btn:before {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background-color: #fff;
          border: 2px solid #e3e3c7;
        }
        
        .toggle--btn:after {
          position: absolute;
          top: 62%;
          left: 22px;
          z-index: 10;
          width: 3px;
          height: 3px;
          opacity: 0;
          background-color: #fff;
          border-radius: 50%;
          box-shadow: #fff 0 0,
                      #fff 1px 0,
                      #fff 2px 0,
                      #fff 3px 0,
                      #fff 4px 0,
                      #fff 5px 0,
                      #fff 6px 0 0 1px,
                      #fff 5px -1px 0 -1px,
                      #fff 2px -1px 0 0px,
                      #d3d3d3 0 0 0 1px,
                      #d3d3d3 2px 0 0 1px,
                      #d3d3d3 4px 0 0 1px,
                      #d3d3d3 6px 0 0 1px,
                      #d3d3d3 6px -1px 0 1px,
                      #d3d3d3 2px -1px 0 1px;
          transition: opacity 100ms ease-in;
        }
        
        .toggle--feature {
          display: block;
          position: absolute;
          top: 3px;
          left: 52.5%;
          z-index: 20;
          width: 1.5px;
          height: 1.5px;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: rgba(255,255,255,0.1) 12px -1px 0 0,
                      rgba(255,255,255,0.1) 5px 4px 0 -1px,
                      #fff 15px 7px 0 0px,
                      rgba(255,255,255,0.1) 13px 14px 0 0,
                      #fff 8px 10px 0 -1px,
                      rgba(255,255,255,0.1) 2px 15px 0 0px;
          animation: starry_star 5s ease-in-out infinite;
        }
        
        .toggle--feature:before {
          position: absolute;
          top: -1px;
          left: -10px;
          width: 7px;
          height: 7px;
          background-color: #fff;
          border-radius: 50%;
          border: 2px solid #e3e3c7;
          box-shadow: #e3e3c7 -11px 0 0 -2px,
                      #e3e3c7 -3px 10px 0 -1px;
          transform-origin: -2px 65%;
        }
        
        @keyframes starry_star {
          50% {
            background-color: rgba(255,255,255,0.1);
            box-shadow: #fff 12px -1px 0 0,
                        #fff 5px 4px 0 -1px,
                        rgba(255,255,255,0.1) 15px 7px 0 0px,
                        #fff 13px 14px 0 0,
                        rgba(255,255,255,0.1) 8px 10px 0 -1px,
                        #fff 2px 15px 0 0px;
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(.3);
          }
          50% {
            opacity: 100;
            transform: scale(1.1);
          }
          55% {
            transform: scale(1.1);
          }
          75% {
            transform: scale(.9);
          }
          100% {
            opacity: 100;
            transform: scale(1);
          }
        }
        
        .toggle--checkbox:checked + .toggle--btn {
          background-color: #9ee3fb;
          border: 2px solid #86c3d7;
        }
        
        .toggle--checkbox:checked + .toggle--btn:before {
          left: 26px;
          background-color: #ffdf6d;
          border: 2px solid #e1c348;
        }
        
        .toggle--checkbox:checked + .toggle--btn:after {
          opacity: 100;
          animation-name: bounceIn;
          animation-duration: 0.60s;
          animation-delay: 0.10s;
          animation-fill-mode: backwards;
          animation-timing-function: ease-in-out;
        }
        
        .toggle--checkbox:checked + .toggle--btn > .toggle--feature {
          opacity: 0;
          box-shadow: rgba(255,255,255,0.1) 12px -1px 0 -2px,
                      rgba(255,255,255,0.1) 5px 4px 0 -2px,
                      #fff 15px 7px 0 -1px,
                      rgba(255,255,255,0.1) 13px 14px 0 -2px,
                      #fff 8px 10px 0 -2px,
                      rgba(255,255,255,0.1) 2px 15px 0 -1px;
          animation: none;
        }
        
        .toggle--checkbox:checked + .toggle--btn > .toggle--feature:before {
          left: 10px;
          transform: rotate(70deg);
        }
        

      `}</style>
    </div>
  )
}