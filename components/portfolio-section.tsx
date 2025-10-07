"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Project {
  id: string
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  status: 'active' | 'completed' | 'planned'
  created_at: string
  updated_at: string
}

export function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("All Projects")
  const [loading, setLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      
      setProjects(data || [])
      
      // Extract unique categories
      const uniqueCategories = ["All Projects", ...new Set(data?.map(p => p.category) || [])]
      setCategories(uniqueCategories)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = activeCategory === "All Projects" 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  const handleScroll = (direction: "left" | "right") => {
    if (typeof document === 'undefined') return
    
    try {
      const container = document.getElementById("projects-container")
      if (container) {
        const scrollAmount = 300
        const newPosition = direction === "left" 
          ? scrollPosition - scrollAmount 
          : scrollPosition + scrollAmount
        
        container.scrollTo({
          left: newPosition,
          behavior: "smooth"
        })
        setScrollPosition(newPosition)
      }
    } catch (error) {
      console.error("Error scrolling:", error)
    }
  }

  // Don't render anything while loading or if no projects
  if (loading || projects.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium mb-6">
            Our Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance max-w-4xl mx-auto">
            Building Africa's Tech Ecosystem Through Innovation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our cutting-edge projects that are transforming businesses across Rwanda and Africa
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span 
                    className="px-3 py-1 text-xs font-semibold text-white rounded-full"
                    style={{ 
                      backgroundColor: 
                        project.status === 'completed' ? '#10b981' :
                        project.status === 'active' ? '#f59e0b' :
                        project.status === 'planned' ? '#3b82f6' : '#6b7280'
                    }}
                  >
                    {project.status === 'completed' ? 'COMPLETED' :
                     project.status === 'active' ? 'IN DEVELOPMENT' :
                     project.status === 'planned' ? 'PLANNED' : 'UNKNOWN'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-1 flex-wrap">
                    {project.technologies?.slice(0, 3).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                  
                  <div className="text-sm text-muted-foreground">
                    {project.technologies?.length || 0} technologies
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <ArrowUpRight className="h-8 w-8" />
              </div>
              <p className="text-lg font-medium">No projects found</p>
              <p className="text-sm">Try selecting a different category</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}