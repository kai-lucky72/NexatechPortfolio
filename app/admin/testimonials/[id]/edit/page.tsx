"use client"
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditTestimonialPage() {
  const [formData, setFormData] = useState({
    testimonial: '',
    client_name: '',
    client_role: '',
    client_company: '',
    rating: 5,
    image: '',
    approved: true
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const params = useParams()
  const testimonialId = params.id as string

  useEffect(() => {
    if (testimonialId) {
      fetchTestimonial()
    }
  }, [testimonialId])

  const fetchTestimonial = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', testimonialId)
        .single()

      if (error) throw error
      
      setFormData({
        testimonial: data.testimonial || '',
        client_name: data.client_name || '',
        client_role: data.client_role || '',
        client_company: data.client_company || '',
        rating: data.rating || 5,
        image: data.image || '',
        approved: data.approved || false
      })
    } catch (error) {
      console.error('Error fetching testimonial:', error)
      alert('Failed to load testimonial')
      router.push('/admin/testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', testimonialId)

      if (error) throw error
      router.push('/admin/testimonials')
    } catch (error) {
      console.error('Error updating testimonial:', error)
      alert('Failed to update testimonial')
    } finally {
      setSaving(false)
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
      <div className="flex items-center gap-4">
        <a href="/admin/testimonials" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </a>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Edit Testimonial</h1>
          <p className="text-muted-foreground mt-2">Update testimonial information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card p-6 rounded-lg border space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Testimonial *</label>
            <textarea
              required
              value={formData.testimonial}
              onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter the customer testimonial"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Client Name *</label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Client Role *</label>
              <input
                type="text"
                required
                value={formData.client_role}
                onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., Chief Technology Officer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Company *</label>
              <input
                type="text"
                required
                value={formData.client_company}
                onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g., TechCore Solutions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="/image.jpg or https://example.com/avatar.jpg"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use relative path (e.g., /image.jpg) or full URL
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <select
                value={formData.approved.toString()}
                onChange={(e) => setFormData({ ...formData, approved: e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="true">Approved</option>
                <option value="false">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <a href="/admin/testimonials" className="px-4 py-2 border border-input text-foreground rounded-md hover:bg-muted">
            Cancel
          </a>
          <button
            type="submit"
            disabled={saving || !formData.testimonial || !formData.client_name || !formData.client_role || !formData.client_company}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : <Save className="h-4 w-4" />}
            {saving ? 'Updating...' : 'Update Testimonial'}
          </button>
        </div>
      </form>
    </div>
  )
}