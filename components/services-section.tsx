"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowRight, Bot, Code, Brain, Cloud } from "lucide-react"
import Tilt from "react-parallax-tilt"
import { motion } from "framer-motion"

const services = [
  {
    icon: Bot,
    title: "AI-Powered Business Solutions",
    description: "We create intelligent automation systems that transform African businesses, enhancing productivity and connecting enterprises to Rwanda's growing tech ecosystem...",
  },
  {
    icon: Code,
    title: "Custom Tech Solutions",
    description: "From concept to deployment, we build tailored technology solutions that address unique African business challenges and contribute to Rwanda's digital transformation...",
  },
  {
    icon: Brain,
    title: "African AI Innovation",
    description: "We harness AI to unlock smarter decision-making for African businesses, creating predictive capabilities that drive continental economic growth and technological advancement...",
  },
  {
    icon: Cloud,
    title: "Pan-African Cloud Infrastructure",
    description: "Our cloud services provide scalable, secure infrastructure that connects African businesses to global markets while maintaining local relevance and government compliance..."
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative -mt-56 overflow-hidden bg-transparent py-20">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.1} glarePosition="all">
                  <Card
                    className="group relative flex flex-col items-center border-border/50 bg-card p-8 text-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
                      <Icon className="h-10 w-10 text-primary" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="mb-4 text-xl font-bold text-card-foreground">{service.title}</h3>
                    {/* Animated divider */}
                    <div className="relative mb-4 h-px w-3/4 overflow-hidden rounded-full bg-transparent">
                      <span className="absolute inset-0 block bg-gradient-to-r from-primary via-primary/20 to-transparent bg-[length:200%_100%] animate-service-glow" />
                    </div>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary">
                        <Link href="/services">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                  </Card>
                </Tilt>
              </motion.div>
            )
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes serviceGlow {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-service-glow {
          animation: serviceGlow 2.4s linear infinite;
        }
      `}</style>
    </section>
  )
}
