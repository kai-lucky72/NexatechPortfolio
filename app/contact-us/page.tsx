"use client"
import { MapPin } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function ContactUsPage() {
  const [service, setService] = useState<string>("")
  const [language, setLanguage] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = (data.get('name') as string) || ''
    const phone = (data.get('phone') as string) || ''
    const email = (data.get('email') as string) || ''
    const company = (data.get('company') as string) || ''
    // service and language come from controlled Selects
    const message = (data.get('message') as string) || ''

    // basic validation
    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.')
      return
    }

    const subject = encodeURIComponent(`New inquiry from ${name || 'NexaTech Website'}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nService: ${service}\nLanguage: ${language}\n\nMessage:\n${message}`
    )

    window.location.href = `mailto:nexatech317@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/about-us.jpg)",
          }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <motion.div className="relative z-10 text-center text-white px-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 bg-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>•</span>
            <span>Contact us</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-balance">
            We're a passionate team of African tech innovators, building the ecosystem that will make Rwanda the brain of Africa's technological revolution.
          </p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 dark:from-primary/80 dark:via-primary/60 dark:to-primary/40 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <motion.div className="text-white" initial={{ x: -24, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                Let's Solve Your IT Challenges Start Today!
              </h2>
              <p className="text-base sm:text-lg mb-8 leading-relaxed">
                Fill out the form below, and one of our experts will contact you within 24 hours to discuss your needs.
                Whether it's cybersecurity, cloud solutions, or tech support, we're here to tailor a plan that works for
                you.
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-12">
                <div className="flex items-center gap-2 bg-foreground/10 backdrop-blur-sm rounded-full px-3 sm:px-6 py-2 sm:py-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-background flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#6C4FE0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm sm:text-base">24/7 Online Support</span>
                </div>
                <div className="flex items-center gap-2 bg-foreground/10 backdrop-blur-sm rounded-full px-3 sm:px-6 py-2 sm:py-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-background flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#6C4FE0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm sm:text-base">Free Consultation</span>
                </div>
                <div className="flex items-center gap-2 bg-foreground/10 backdrop-blur-sm rounded-full px-3 sm:px-6 py-2 sm:py-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-background flex items-center justify-center">
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-[#6C4FE0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm sm:text-base">Multilingual Support</span>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-3 mb-10">
                <a href="tel:+250723374650" className="inline-flex items-center gap-2 rounded-lg bg-background/20 px-4 py-3 text-white hover:bg-background/30 transition-colors">
                  Call Us Now
                </a>
                <a href="mailto:nexatech317@gmail.com" className="inline-flex items-center gap-2 rounded-lg bg-background/20 px-4 py-3 text-white hover:bg-background/30 transition-colors">
                  Email Us Directly
                </a>
              </div>

              {/* World Map */}
              <div className="relative h-64 opacity-40 overflow-hidden">
                <svg viewBox="0 0 800 400" className="w-full h-full max-w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dotted world map pattern */}
                  <g opacity="0.6">
                    {Array.from({ length: 80 }).map((_, i) =>
                      Array.from({ length: 40 }).map((_, j) => (
                        <circle key={`${i}-${j}`} cx={i * 10} cy={j * 10} r="1" fill="white" />
                      )),
                    )}
                  </g>
                </svg>
                {/* Location pins */}
                <MapPin className="absolute top-1/4 left-1/4 w-6 h-6 text-white" />
                <MapPin className="absolute top-1/3 left-1/2 w-6 h-6 text-white" />
                <MapPin className="absolute top-1/2 right-1/3 w-6 h-6 text-white" />
                <MapPin className="absolute bottom-1/3 right-1/4 w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div className="bg-card rounded-3xl p-6 sm:p-8 shadow-2xl" initial={{ x: 24, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="name" placeholder="Name*" required className="h-12 border-gray-200" />
                  <Input name="phone" placeholder="Phone number" type="tel" className="h-12 border-gray-200" />
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="email" placeholder="Email*" type="email" required className="h-12 border-gray-200" />
                  <Input name="company" placeholder="Company Name" className="h-12 border-gray-200" />
                </div>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger className="h-12 border-gray-200">
                      <SelectValue placeholder="What can we help you with?*" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Design">Web Design</SelectItem>
                      <SelectItem value="Mobile App Design">Mobile App Design</SelectItem>
                      <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                      <SelectItem value="Website Development">Website Development</SelectItem>
                      <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                      <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-12 border-gray-200">
                      <SelectValue placeholder="Preferred Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Kinyarwanda">Kinyarwanda</SelectItem>
                      <SelectItem value="Swahili">Swahili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Textarea */}
                <Textarea
                  placeholder="Briefly describe your challenge or goals..."
                  name="message"
                  className="min-h-32 border-gray-200 resize-none"
                />

                {/* Privacy Text */}
                <p className="text-sm text-muted-foreground">
                  Your data is safe with us. We never share your information and only use it to serve you better
                </p>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-14 bg-[#6C4FE0] hover:bg-[#5A3FD0] text-white text-lg font-semibold rounded-xl"
                >
                  Get Your Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
        </section>
        <Footer variant="secondary" />
    </main>
  )
}
