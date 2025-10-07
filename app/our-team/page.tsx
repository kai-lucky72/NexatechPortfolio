"use client"
import { useState, useEffect } from "react"
import { Footer } from "@/components/footer"
import { Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Tilt from "react-parallax-tilt"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  image: string
  description: string
  email: string
  linkedin: string
  twitter: string
  created_at: string
  updated_at: string
}

export default function OurTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('department', 'director')
        .order('created_at', { ascending: true })

      if (error) throw error
      setTeamMembers(data || [])
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-gray-900" initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.0, ease: "easeOut" }}>
          <Image src="/about-us.jpg" alt="Our Team" fill className="object-cover opacity-40" />
        </motion.div>
        <motion.div className="relative z-10 text-center text-white px-4" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <span>•</span>
            <span>Our Team</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            We're a passionate team of African tech visionaries, building the ecosystem that will make Rwanda the brain of Africa's technological revolution.
          </p>
        </motion.div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary text-white px-6 py-2 rounded-md text-sm font-medium mb-4">
              LEADERSHIP
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet The Architects Of Africa's Tech Future</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our leadership team is the driving force behind Rwanda's tech ecosystem transformation. Get to know the visionaries dedicated to making Rwanda the continent's premier tech hub.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading team members...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No team members found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                >
                  <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable glareMaxOpacity={0.08} glarePosition="all">
                    <div className="group relative overflow-hidden rounded-lg">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-[400px] object-cover transition-transform group-hover:scale-105"
                      />

                      {/* Overlay with name and role */}
                      <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm p-4 sm:p-6 rounded-b-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold mb-1 text-foreground truncate">{member.name}</h3>
                            <p className="text-primary text-xs sm:text-sm font-medium">{member.role}</p>
                          </div>
                          {member.linkedin && (
                            <Link
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group/linkedin flex-shrink-0"
                              aria-label={`${member.name} LinkedIn`}
                            >
                              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover/linkedin:text-white" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer variant="primary" />
    </div>
  )
}
