"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

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
import { Plus, Edit, Trash2, MessageSquare, User } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id))
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      alert('Failed to delete testimonial')
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials</h1>
          <p className="text-muted-foreground mt-2">Manage customer testimonials</p>
        </div>
        <a href="/admin/testimonials/new" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </a>
      </div>

      <div className="bg-card rounded-lg border">
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-muted-foreground mb-4">No testimonials yet</p>
            <p className="text-sm text-muted-foreground mb-4">Get started by adding your first testimonial</p>
            <a href="/admin/testimonials/new" className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Testimonial
            </a>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {testimonial.image ? (
                      <img
                        src={testimonial.image}
                        alt={testimonial.client_name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{testimonial.client_name}</h3>
                        {testimonial.approved ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Approved</span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
                        )}
                      </div>
                      <p className="text-primary font-medium mb-1">{testimonial.client_role}</p>
                      <p className="text-sm text-muted-foreground mb-2">{testimonial.client_company}</p>
                      <p className="text-muted-foreground text-sm line-clamp-3">{testimonial.testimonial}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating || 0)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(testimonial.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <a href={`/admin/testimonials/${testimonial.id}/edit`} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
                      <Edit className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      disabled={deletingId === testimonial.id}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg disabled:opacity-50"
                    >
                      {deletingId === testimonial.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-destructive"></div>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
