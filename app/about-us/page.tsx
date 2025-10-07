"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Lightbulb, Users } from 'lucide-react'
import { Footer } from "@/components/footer"
import React, { useState } from "react"
import CountUp from "react-countup"

export default function AboutUsPage() {
  const testimonials = [
    {
      quote:
        "NexaTech Rwanda is more than just a workplace; it's a family united by the vision of transforming Africa's tech landscape. The leadership fosters a culture of innovation, collaboration, and growth, ensuring that each team member contributes to Rwanda's technological advancement. The passion for building Africa's tech ecosystem motivates me to give my best every day.",
      name: "Daniel Vaughn",
      role: "Chief Technology Officer",
      avatar: "/professional-man-headshot-smiling.jpg",
      image: "/about.jpg",
    },
    {
      quote:
        "Working at NexaTech Rwanda has accelerated my growth in ways I never imagined. Our collaborative teams share a clear vision of making Rwanda the tech hub of Africa, and the continuous learning opportunities make every day exciting and impactful for our continent's future.",
      name: "Sophia Reynolds",
      role: "IT Director",
      avatar: "/smiling-professional-woman.png",
      image: "/client.jpg",
    },
    {
      quote:
        "Leaders here empower you to innovate. You're trusted with ownership and supported with the right tools to succeed.",
      name: "Michael Carter",
      role: "Chief Executive Officer",
      avatar: "/professional-man-headshot.png",
      image: "/professional-working-at-modern-office-desk-with-la.jpg",
    },
  ]

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((idx) => (idx - 1 + testimonials.length) % testimonials.length)
  }

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((idx) => (idx + 1) % testimonials.length)
  }

  // Autoplay
  React.useEffect(() => {
    if (isHovered) return
    const id = setInterval(() => {
      setCurrentTestimonialIndex((idx) => (idx + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [isHovered, testimonials.length])
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <Image
          src="/about-us.jpg"
          alt="About Us"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>•</span>
            <span>About Us</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 text-balance">
            We're a passionate team of IT experts, delivering innovative solutions that empower your business and drive
            growth.
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Top Section with Button and Heading */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
              {/* Purple Button */}
              <button className="bg-primary text-white px-12 py-6 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Welcome to NexaTech Rwanda
              </button>

              {/* Two-line Heading */}
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                  Africa's Next Tech Hub – Innovative Solutions<br />
                  Built With Precision For Rwanda's Future
                </h2>
              </div>
            </div>

              {/* Large Business Meeting Image */}
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src="/aboutt.jpg"
                  alt="Business Meeting"
                  width={700}
                  height={200}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                />
              </div>
          </div>
        </div>
      </section>

       {/* Mission/Experience Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-card rounded-3xl p-8 md:p-12 ">
              <div className="inline-block border-2 border-gray-200 rounded-2xl p-6 mb-6">
                <p className="text-6xl font-bold text-primary">
                  <CountUp end={25} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-3xl">+</span>
                </p>
                <p className="text-sm text-muted-foreground mt-2">YEAR OF EXPERIENCE IN IT SOLUTION</p>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                As Rwanda's emerging tech powerhouse, NexaTech Rwanda is building the foundation for Africa's digital transformation. We are creating an ecosystem of innovative technology solutions that empower businesses across Rwanda and Africa to thrive in the digital age. Our journey is defined by our commitment to making Rwanda the continent's leading tech hub.
              </p>

              <ul className="space-y-4 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Passionate innovators building Africa's tech ecosystem</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Tech solutions designed for African businesses and governments</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Next-generation technologies elevating Rwanda's digital landscape</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Our Mission</h3>
              </div>

              <p className="text-lg leading-relaxed mb-8">
                Our mission is to be the brain of Africa's tech ecosystem, creating innovative solutions that transform every aspect of business in Rwanda and across Africa, while collaborating with governments to elevate citizen welfare and national development.
              </p>

              <div className="flex gap-4 justify-end">
                <button className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partner Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="mx-4 sm:mx-8 md:mx-12 rounded-xl bg-primary/5 dark:bg-primary/10 py-12 sm:py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-12 py-6 bg-primary text-white rounded-lg font-medium mb-6">
                Welcome To NexaTech Rwanda
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                More Than Just A Tech Company—We're Africa's Innovation Engine
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Choose <span className="text-primary font-semibold">NexaTech Rwanda</span> to be part of Africa's tech revolution. We create comprehensive tech solutions that transform businesses across Rwanda and Africa, working hand-in-hand with governments to build the continent's digital future. Our innovative ecosystem approach ensures every solution contributes to Rwanda's vision of becoming Africa's leading tech hub.
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">Strategic Analysis</span>
                    <span className="text-primary font-semibold">90%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">Enterprise Solutions</span>
                    <span className="text-primary font-semibold">95%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "95%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-foreground">Development Experience</span>
                    <span className="text-primary font-semibold">80%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
                  </div>
                </div>
              </div>

              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 sm:px-8 md:px-12 py-4 sm:py-6 rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                Read More About Us
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>

            <div className="relative">
              <Image
                src="/bright.jpg"
                alt="Professional working"
                width={500}
                height={600}
                className="rounded-3xl w-full"
              />
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
              </svg>
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp end={120} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-xl">+</span>
                </p>
                <p className="text-sm text-muted-foreground">Clients Worldwide</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
              </svg>
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp end={60} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-xl">+</span>
                </p>
                <p className="text-sm text-muted-foreground">Experience Engineers</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
              </svg>
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp end={70} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-xl">+</span>
                </p>
                <p className="text-sm text-muted-foreground">Completed Projects</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
              </svg>
              <div>
                <p className="text-3xl font-bold text-primary">
                  <CountUp end={120} duration={1.2} enableScrollSpy scrollSpyOnce />
                  <span className="align-top text-xl">%</span>
                </p>
                <p className="text-sm text-muted-foreground">Satisfaction Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Workers Testimonial Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden h-96 md:h-[420px] lg:h-[520px]">
              <Image
                key={testimonials[currentTestimonialIndex].image}
                src={testimonials[currentTestimonialIndex].image}
                alt={testimonials[currentTestimonialIndex].name}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 bg-card rounded-full px-4 sm:px-8 md:px-12 py-4 sm:py-6 shadow-lg flex items-center gap-2 sm:gap-3">
                <span className="font-semibold text-sm sm:text-base">Trusted Clients</span>
                <div className="flex -space-x-2">
                  <Image
                    src="/professional-headshot-1.png"
                    alt="Client"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                  <Image
                    src="/professional-headshot-2.png"
                    alt="Client"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                  <Image
                    src="/professional-headshot-3.png"
                    alt="Client"
                    width={32}
                    height={32}
                    className="rounded-full border-2 border-white"
                  />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium mb-6">
                Testimonial
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                What Your Future Co-Workers Say?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We blend cutting-edge technology with African innovation to build solutions that transform entire business ecosystems. Our commitment to excellence, scalability, and sustainability ensures every tech solution we create contributes to Rwanda's emergence as Africa's premier tech destination.
              </p>

              <div className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 relative">
                <svg className="absolute top-8 right-8 w-16 h-16 text-primary/20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                </svg>

                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-primary" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                <p className="text-foreground mb-8 leading-relaxed">
                  {testimonials[currentTestimonialIndex].quote}
                </p>

                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={testimonials[currentTestimonialIndex].avatar}
                    alt={testimonials[currentTestimonialIndex].name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonials[currentTestimonialIndex].name}</p>
                    <p className="text-sm text-primary">{testimonials[currentTestimonialIndex].role}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Indicators */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        aria-label={`Go to testimonial ${i + 1}`}
                        onClick={() => setCurrentTestimonialIndex(i)}
                        className={`${i === currentTestimonialIndex ? 'bg-primary' : 'bg-primary/20'} w-2.5 h-2.5 rounded-full transition-colors`}
                      />
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3">
                    <button
                      aria-label="Previous testimonial"
                      onClick={prevTestimonial}
                      className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button
                      aria-label="Next testimonial"
                      onClick={nextTestimonial}
                      className="w-10 h-10 rounded-full border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                    <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Form Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="/contact.jpg"
                alt="Professional working"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-primary text-white p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
                Ready To Join Africa's Tech Revolution? Book A Free Consultation
              </h2>
              <p className="mb-8 leading-relaxed">
                Leave your email below to start your journey with Rwanda's next tech hub. Let's shape the future of African technology together and build solutions that transform entire business ecosystems.
              </p>

              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 sm:px-6 md:px-12 py-4 sm:py-6 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 bg-background"
                />
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-4 sm:py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  Stay in the Loop
                </button>
              </form>
            </div>
          </div>
        </div>
        </section>
        <Footer variant="secondary" />
    </main>
  )
}
