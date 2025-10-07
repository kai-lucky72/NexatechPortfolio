"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

interface Testimonial {
  id: string
  client_name: string
  client_role: string
  client_company: string
  testimonial: string
  rating: number
  image: string
  approved: boolean
  created_at: string
  updated_at: string
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Don't render anything while loading or if no testimonials
  if (loading || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium mb-6">Testimonial</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">What Our Customers Say?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore how businesses and individuals have achieved their goals with our tailored solutions and exceptional
            support.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={prevTestimonial}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-3 gap-6 flex-1">
              {[0, 1, 2].map((offset) => {
                const index = (currentIndex + offset) % testimonials.length
                const testimonial = testimonials[index]

                // Skip if testimonial is undefined
                if (!testimonial) return null

                return (
                  <div key={testimonial.id} className="bg-card rounded-2xl p-8 shadow-sm relative">
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial?.rating || 5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 fill-primary" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">{testimonial?.testimonial || ''}</p>

                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial?.image || "/placeholder.svg"}
                        alt={testimonial?.client_name || 'Client'}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{testimonial?.client_name || 'Anonymous'}</p>
                        <p className="text-sm text-muted-foreground">{testimonial?.client_role || 'Client'}{testimonial?.client_company ? `, ${testimonial.client_company}` : ''}</p>
                      </div>
                    </div>

                    <svg
                      className="absolute bottom-8 right-8 w-16 h-16 text-primary/10"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>
                )
              })}
            </div>

            <button
              onClick={nextTestimonial}
              className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
