"use client"
import { Globe, Code2, Target, Cog, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import CountUp from "react-countup"
import { motion } from "framer-motion"

export function AboutStatsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-5 gap-8 rounded-3xl overflow-hidden">
          {/* Left image */}
          <motion.div
            className="relative h-[600px] lg:col-span-2 lg:h-full"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/about_us.jpg"
              alt="Working happily"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Right stats grid */}
          <motion.div
            className="relative bg-[#433878] text-white p-8 md:p-10 lg:p-12 rounded-xl lg:col-span-3"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 divide-y divide-x divide-white/10 rounded-2xl overflow-hidden">
              {/* Top-left */}
              <div className="p-8 lg:p-12">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
                  <Globe className="h-8 w-8" />
                </div>
                <p className="text-5xl font-bold leading-none mb-2">
                  <CountUp end={1500} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-3xl">+</span>
                </p>
                <p className="text-lg font-semibold mb-2">Clients Worldwide</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  We prioritize understanding to ensure solutions resonate with unique needs.
                </p>
              </div>

              {/* Top-right */}
              <div className="p-8 lg:p-12">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
                  <Code2 className="h-8 w-8" />
                </div>
                <p className="text-5xl font-bold leading-none mb-2">
                  <CountUp end={120} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-3xl">+</span>
                </p>
                <p className="text-lg font-semibold mb-2">Performance Driven</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Continuously optimizing quality and performance to exceed expectations.
                </p>
              </div>

              {/* Bottom-left */}
              <div className="p-8 lg:p-12">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
                  <Target className="h-8 w-8" />
                </div>
                <p className="text-5xl font-bold leading-none mb-2">
                  <CountUp end={100} duration={1.2} enableScrollSpy scrollSpyOnce />
                </p>
                <p className="text-lg font-semibold mb-2">Honest & Integrity</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Built on trust and transparency in every aspect of our work.
                </p>
              </div>

              {/* Bottom-right */}
              <div className="p-8 lg:p-12">
                <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
                  <Cog className="h-8 w-8" />
                </div>
                <p className="text-5xl font-bold leading-none mb-2">
                  <CountUp end={98} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-3xl">%</span>
                </p>
                <p className="text-lg font-semibold mb-2">Teamwork & Collaboration</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  Fostering a culture of teamwork to achieve shared success.
                </p>
              </div>
            </div>

            {/* Center badge */}
            <div className="pointer-events-none absolute inset-0 hidden lg:flex items-center justify-center">
              <div className="z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-card/80 text-foreground shadow-2xl ring-1 ring-black/5 backdrop-blur-sm">
                <ArrowUpRight className="mb-0.5 h-6 w-6" />
                <span className="text-center text-sm font-semibold leading-snug">Commitment To<br />Growth!</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
