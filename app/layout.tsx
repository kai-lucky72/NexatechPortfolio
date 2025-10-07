import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { AIChatbot } from "@/components/ai-chatbot"


export const metadata: Metadata = {
  title: "NexaTech Rwanda - Africa's Next Tech Hub",
  description: "Building Africa's Tech Ecosystem From Rwanda - Join the revolution transforming African businesses with innovative technology solutions",
  generator: "v0.app",
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
          <Suspense fallback={null}>{children}</Suspense>
          <AIChatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
