"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Lazy load video after critical content loads
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load()
        videoRef.current.play().catch(() => {
          // Silently fail - poster will show
        })
      }
    }, 2000) // Delay video loading by 2 seconds

    return () => clearTimeout(timer)
  }, [])
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-background pb-64 pt-16">
      {/* Background Video - Testing Video 1 */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/70 dark:from-black/20 dark:via-black/10 dark:to-black/30 z-10" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="h-full w-full object-cover opacity-80"
          poster="/digital-globe-network-connections-dark-blue.jpg"
          onLoadedData={() => {
            if (videoRef.current) {
              videoRef.current.play().catch(console.error)
            }
          }}
        >
          <source src="/video_testing_1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">

        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl drop-shadow-lg">
            Building Africa's Tech Ecosystem From Rwanda
          </h1>
          <p className="mb-8 text-pretty text-lg text-gray-800 dark:text-white/90 md:text-xl drop-shadow-md">
            Transform Africa's digital landscape with NexaTech Rwanda's innovative solutions. We're creating the tech ecosystem that will make Rwanda the brain of Africa's technological revolution. Ready to be part of the future?
          </p>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button asChild size="lg" className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-white/90 shadow-lg">
              <Link href="/contact-us">
                Join Africa's Tech Revolution
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
