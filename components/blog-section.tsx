"use client"
import { useState, useEffect } from 'react'
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { supabase, BlogPost } from '@/lib/supabase'

export function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(3)

      if (error) throw error
      setBlogPosts(data || [])
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Don't render anything while loading or if no blog posts
  if (loading || blogPosts.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg font-medium mb-6">Our Blog</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance max-w-4xl mx-auto">
            Latest Insights On Building Africa's Tech Ecosystem From Rwanda
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <div className="relative h-80 rounded-3xl overflow-hidden mb-6 shadow-xl">
                <Image
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                      style={{
                        background:
                          category === "AI For Business"
                            ? "linear-gradient(90deg, #3b82f6 0%, #22d3ee 100%)"
                            : "linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)",
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                <span>By {post.author || 'Anonymous'}</span>
                <span>•</span>
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-balance group-hover:text-primary transition-colors">
                {post.title}
              </h3>

              <a
                href={post.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Read Full Article
                <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}