import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import "../styles/performance.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { AIChatbot } from "@/components/ai-chatbot"



export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "NexaTech Rwanda - Africa's Next Tech Hub",
  description: "Building Africa's Tech Ecosystem From Rwanda - Join the revolution transforming African businesses with innovative technology solutions",
  generator: "v0.app",
  keywords: "Rwanda tech, Africa technology, web development, mobile apps, AI solutions, digital transformation",
  authors: [{ name: "NexaTech Rwanda" }],

  robots: "index, follow",
  icons: {
    icon: '/nexatech_logo.png',
    shortcut: '/nexatech_logo.png',
    apple: '/nexatech_logo.png',
  },
  openGraph: {
    title: "NexaTech Rwanda - Africa's Next Tech Hub",
    description: "Building Africa's Tech Ecosystem From Rwanda",
    type: "website",
    locale: "en_US",
    images: ['/nexatech_logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >

          <Navigation />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            {children}
          </Suspense>
          <Suspense fallback={null}>
            <AIChatbot />
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
