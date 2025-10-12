import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import PerformanceMonitor from "@/components/PerformanceMonitor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fluid Smoke Animation - Interactive WebGL Experience",
  description: "Stunning interactive fluid dynamics smoke animation using WebGL. Move your mouse to create beautiful smoke trails.",
  keywords: ["Fluid Smoke", "WebGL", "Animation", "Interactive", "Next.js", "TypeScript", "React"],
  authors: [{ name: "Fluid Smoke Developer" }],
  openGraph: {
    title: "Fluid Smoke Animation - Interactive WebGL Experience",
    description: "Stunning interactive fluid dynamics smoke animation using WebGL",
    url: "https://your-domain.netlify.app",
    siteName: "Fluid Smoke Animation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluid Smoke Animation",
    description: "Interactive fluid dynamics smoke animation using WebGL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        style={{
          '--background': 'linear-gradient(180deg, #CACFF9 0%, #F5CBD9 100%)'
        } as React.CSSProperties}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <PerformanceMonitor />
            {children}
            <Toaster />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
