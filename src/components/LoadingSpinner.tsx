'use client'

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-primary/30"></div>
      </div>
    </div>
  )
}