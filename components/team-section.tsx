"use client"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export function TeamSection() {
  const [hasTeamMembers, setHasTeamMembers] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkTeamMembers()
  }, [])

  const checkTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('id')
        .limit(1)

      if (error) throw error
      setHasTeamMembers((data || []).length > 0)
    } catch (error) {
      console.error('Error checking team members:', error)
    } finally {
      setLoading(false)
    }
  }

  // Don't render anything while loading or if no team members
  if (loading || !hasTeamMembers) {
    return null
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="rounded-[28px] bg-primary/5 p-10 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-semibold mb-6">Leadership</span>
            <h2 className="text-5xl font-bold mb-6 text-balance">
              Meet The Visionaries Building Africa's Tech Future
            </h2>
            <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
              Our team is the driving force behind Rwanda's tech ecosystem transformation. Get to know the passionate innovators dedicated to making Rwanda the brain of Africa's technological revolution.
            </p>

            <Link href="/our-team" className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary transition-colors mb-6 inline-block">
              All Team Members
            </Link>

            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Want to Join Africa's Tech Revolution?</span>
              <Link
                href="/contact-us"
                className="text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-[520px] rounded-[28px] overflow-hidden">
            <Image src="/our-team.jpg" alt="Team member working" fill className="object-cover" />
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
