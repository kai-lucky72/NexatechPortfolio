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
    icon: [
      { url: '/nexatech_logo_title.PNG', sizes: '32x32', type: 'image/png' },
      { url: '/nexatech_logo_title.PNG', sizes: '16x16', type: 'image/png' },
      { url: '/nexatech_logo_title.PNG', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/nexatech_logo_title.PNG',
    apple: '/nexatech_logo_title.PNG',
  },
  openGraph: {
    title: "NexaTech Rwanda - Africa's Next Tech Hub",
    description: "Building Africa's Tech Ecosystem From Rwanda",
    type: "website",
    locale: "en_US",
    images: ['/nexatech_logo_title.PNG'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/nexatech_logo_title.PNG" />
        <link rel="icon" type="image/png" sizes="16x16" href="/nexatech_logo_title.PNG" />
        <link rel="apple-touch-icon" sizes="180x180" href="/nexatech_logo_title.PNG" />
        <link rel="shortcut icon" href="/nexatech_logo_title.PNG" />
      </head>
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
