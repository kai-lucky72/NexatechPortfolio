import { Phone, MessageCircle, MapPin, CheckCircle, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function ContactCTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-[500px] lg:h-auto">
            <Image
              src="/contact.jpg"
              alt="Professional working on laptop"
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-gradient-to-br from-primary via-primary to-primary/90 dark:from-primary dark:via-primary/80 dark:to-primary/60 p-12 lg:p-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">
              Join Africa's Tech Revolution—Start Today!
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-3 rounded-full bg-card px-3 py-2 text-foreground shadow-lg">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span className="font-semibold text-sm sm:text-base">24/7 Online Support</span>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-card px-2 py-1 text-foreground shadow-lg">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span className="font-semibold">Free Consultation</span>
              </div>
              <div className="flex items-center gap-3 rounded-full bg-card px-2 py-1 text-foreground shadow-lg">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span className="font-semibold">Multilingual Support</span>
              </div>
            </div>

            <p className="text-white/90 mb-12 text-pretty leading-relaxed">
              Connect with NexaTech Rwanda and become part of the ecosystem transforming African businesses. Our experts will contact you within 24 hours to discuss how we can contribute to Rwanda's tech hub vision together.
            </p>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
            <div className="rounded-2xl bg-foreground/10 from-foreground/20 to-foreground/10 p-8 backdrop-blur-sm mb-4 hover:bg-foreground/20 transition-colors">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <Link href="/contact-us" className="font-semibold inline-flex items-center gap-2">
                  Call Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="text-center">
            <div className="rounded-2xl bg-foreground/10 from-foreground/20 to-foreground/10 p-8 backdrop-blur-sm mb-4 hover:bg-foreground/20 transition-colors">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <Link href="/contact-us" className="font-semibold inline-flex items-center gap-2">
                  Chat with Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="text-center">
            <div className="rounded-2xl bg-foreground/10 from-foreground/20 to-foreground/10 p-8 backdrop-blur-sm mb-4 hover:bg-foreground/20 transition-colors">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-card shadow-lg">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <Link href="/contact-us" className="font-semibold inline-flex items-center gap-2">
                  See Location <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
