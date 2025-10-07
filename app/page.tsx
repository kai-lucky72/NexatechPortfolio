"use client"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { AboutStatsSection } from "@/components/about-stats-section"
import { HowWeWorkSection } from "@/components/how-we-work-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactCTASection } from "@/components/contact-cta-section"
import { TeamSection } from "@/components/team-section"
import { BlogSection } from "@/components/blog-section"
import { Footer } from "@/components/footer"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const [hasBlogPosts, setHasBlogPosts] = useState(false)

  useEffect(() => {
    checkBlogPosts()
  }, [])

  const checkBlogPosts = async () => {
    try {
      const { count, error } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true })

      if (error) throw error
      setHasBlogPosts((count || 0) > 0)
    } catch (error) {
      console.error('Error checking blog posts:', error)
      setHasBlogPosts(false)
    }
  }

  return (
      <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <section id="services">
        <ServicesSection />
      </section>
      <section id="about">
        <AboutSection />
      </section>
      <AboutStatsSection />
      <section id="portfolio">
        <PortfolioSection />
      </section>
      <HowWeWorkSection />
      <TestimonialsSection />
      <TeamSection />
      {hasBlogPosts && (
        <section id="blog">
          <BlogSection />
        </section>
      )}
      <section id="contact">
        <ContactCTASection />
      </section>
      <Footer variant="primary" />
    </main>
  )
}
