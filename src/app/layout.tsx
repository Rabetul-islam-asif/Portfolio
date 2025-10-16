import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { BackgroundManager } from "@/components/BackgroundManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://your-portfolio.netlify.app'),
  title: "Rabetul Islam Asif - Computer Science Student & Programmer | Portfolio",
  description: "Rabetul Islam Asif - Computer Science Student, Programmer, and Future AI Developer. Explore my portfolio featuring projects in Next.js, React, TypeScript, and AI development. Passionate about creating innovative solutions.",
  keywords: [
    "Rabetul Islam Asif", "Rabetul Asif", "Asif Rabetul", "Rabetul", "Asif",
    "Computer Science Student", "Programmer", "AI Developer", "Web Developer",
    "Next.js Developer", "React Developer", "TypeScript Developer",
    "Portfolio", "Web Development", "Software Engineering", "AI Programming",
    "Full Stack Developer", "Frontend Developer", "Backend Developer"
  ],
  authors: [{ name: "Rabetul Islam Asif" }],
  creator: "Rabetul Islam Asif",
  publisher: "Rabetul Islam Asif",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Rabetul Islam Asif - Computer Science Student & Programmer",
    description: "Explore the portfolio of Rabetul Islam Asif - Computer Science Student, Programmer, and Future AI Developer. Specialized in Next.js, React, TypeScript, and AI development.",
    url: "https://your-portfolio.netlify.app",
    siteName: "Rabetul Islam Asif Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rabetul Islam Asif - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabetul Islam Asif - Computer Science Student & Programmer",
    description: "Computer Science Student, Programmer, and Future AI Developer. Specialized in Next.js, React, TypeScript, and AI development.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://your-portfolio.netlify.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html:not(.dark) {
              background-color: #BCE7FC !important;
              min-height: 100vh !important;
            }
            html:not(.dark) body {
              background-color: #BCE7FC !important;
              min-height: 100vh !important;
            }
            html:not(.dark) *,
            html:not(.dark) [class*="bg-"] {
              background-color: transparent !important;
            }
            html:not(.dark) .card,
            html:not(.dark) .bg-card,
            html:not(.dark) [role="dialog"],
            html:not(.dark) .popover {
              background: rgba(255, 255, 255, 0.8) !important;
              backdrop-filter: blur(10px) !important;
              border: 1px solid rgba(255, 255, 255, 0.3) !important;
            }
            /* Dark mode - restore original styling */
            html.dark {
              background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%) !important;
              min-height: 100vh !important;
            }
            html.dark body {
              background: linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%) !important;
              min-height: 100vh !important;
            }
          `
        }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rabetul Islam Asif",
              "alternateName": ["Rabetul Asif", "Asif Rabetul", "Rabetul", "Asif"],
              "jobTitle": "Computer Science Student",
              "description": "Computer Science Student, Programmer, and Future AI Developer passionate about creating innovative solutions.",
              "url": "https://your-portfolio.netlify.app",
              "sameAs": [
                "https://github.com/Rabetul-islam-asif",
                "https://www.facebook.com/share/171vkfyPbE/",
                "https://linkedin.com/in/rabetul-islam-asif"
              ],
              "knowsAbout": [
                "Computer Science",
                "Programming",
                "Web Development",
                "Next.js",
                "React",
                "TypeScript",
                "AI Development",
                "Software Engineering"
              ],
              "offers": {
                "@type": "Service",
                "serviceType": "Web Development",
                "description": "Full-stack web development services using modern technologies"
              },
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "Stamford University Bangladesh",
                  "sameAs": "https://www.stamforduniversity.edu.bd"
                },
                {
                  "@type": "EducationalOrganization", 
                  "name": "University of the People",
                  "sameAs": "https://www.uopeople.edu"
                }
              ],
              "email": "asifrabetul@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Bangladesh"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground`}
        style={{
          backgroundColor: '#BCE7FC',
          minHeight: '100vh'
        }}
        id="main-body"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <PerformanceMonitor />
            <BackgroundManager />
            {children}
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
