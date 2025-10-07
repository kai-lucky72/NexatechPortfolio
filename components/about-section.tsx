"use client"
import { Lightbulb, Users, Headphones, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useEffect } from "react"

export function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Force video to play when component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play()

        } catch (error) {
          // Auto-play failed silently
        }
      }
    }
    
    playVideo()
  }, [])
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">About Us</span>
            </div>

            <h2 className="text-5xl font-bold text-foreground leading-tight text-balance">
              Who Are We? The Brain Of Africa's Tech Ecosystem
            </h2>

            <p className="text-muted-foreground text-lg leading-relaxed">
              At NexaTech Rwanda, we are more than just a tech company—we are the architects of Africa's digital future. As Rwanda's emerging tech powerhouse, we create comprehensive technology solutions that transform businesses across Africa while working hand-in-hand with governments to elevate citizen welfare and drive national development.
            </p>

            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              {/* Auto-playing Video (left) */}
              <div className="relative aspect-square w-full max-w-[260px] md:max-w-none rounded-2xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  onLoadedData={() => {
                    // Ensure video plays when loaded
                    if (videoRef.current) {
                      videoRef.current.play().catch(console.error)
                    }
                  }}
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Feature list (right) */}
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Modern Technology</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Leveraging cutting-edge technology to enhance efficiency, precision, and sustainability in every
                      project.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Innovation Engineers</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A passionate team of African tech innovators dedicated to building solutions that transform entire business ecosystems across the continent.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Button asChild size="lg" className="px-8 py-6 text-base">
                <Link href="/about-us">
                  More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact Us 24/7</p>
                  <p className="text-xl font-bold text-foreground">+250723374650</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[600px] lg:h-full rounded-xl overflow-hidden">
            <Image
              src="/kigali.jpg"
              alt="IT professional working at computer"
              fill
              className="object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={75}
            />

            {/* 25+ Years badge */}
            <div className="absolute top-6 right-6 flex items-center gap-4 rounded-3xl bg-card/95 px-6 py-5 shadow-2xl">
              <div className="text-primary font-bold leading-none">
                <span className="text-6xl">1</span>
                <sup className="text-3xl align-super">st</sup>
              </div>
              <div className="text-[11px] uppercase tracking-widest text-foreground/70 font-semibold">
                <div>Africa's Next</div>
                <div>Tech Hub</div>
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-card rounded-full px-6 py-4 shadow-xl flex items-center gap-4">
              <p className="font-semibold text-foreground whitespace-nowrap">Building Africa's Tech Future</p>
              <div className="flex -space-x-2">
                <Image
                  src="/professional-headshot-1.png"
                  alt="Customer"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="/professional-headshot-2.png"
                  alt="Customer"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
                <Image
                  src="/professional-headshot-3.png"
                  alt="Customer"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white"
                />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
