"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, Building, Mail, Phone, MapPin, Globe, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'

interface CompanyInfo {
  id: string
  key: string
  value: string
  type: 'text' | 'image' | 'json'
  updated_at: string
}

export default function CompanyInfoPage() {
  const [companyInfo, setCompanyInfo] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchCompanyInfo()
  }, [])

  const fetchCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .single()

      if (error) throw error
      
      setCompanyInfo(data || {})
    } catch (error) {
      console.error('Error fetching company info:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('contact_info')
        .update(companyInfo)
        .eq('id', companyInfo.id)

      if (error) throw error

      alert('Company information updated successfully!')
    } catch (error) {
      console.error('Error saving company info:', error)
      alert('Failed to save company information')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (key: string, value: string) => {
    setCompanyInfo(prev => ({
      ...prev,
      [key]: value
    }))
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
          <h1 className="text-3xl font-bold text-foreground">Company Information</h1>
          <p className="text-muted-foreground mt-2">Manage your company details that appear on the website</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Basic Information</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
            <input
              type="text"
              value={companyInfo.company_name || ''}
              onChange={(e) => updateField('company_name', e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="NexaTech Rwanda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Tagline</label>
            <input
              type="text"
              value={companyInfo.tagline || ''}
              onChange={(e) => updateField('tagline', e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Africa's Next Tech Hub"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              value={companyInfo.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief description of your company"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Contact Information</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={companyInfo.email || ''}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="nexatech317@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="tel"
                value={companyInfo.phone || ''}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+250723374650"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={companyInfo.address || ''}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Kigali, Rwanda"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                value={companyInfo.website || ''}
                onChange={(e) => updateField('website', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://nexatechrwanda.com"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="bg-card p-6 rounded-lg border space-y-4">
        <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Add your company's social media links. Leave empty to hide from website.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              LinkedIn Company Page
            </label>
            <input
              type="text"
              value={companyInfo.linkedin || ''}
              onChange={(e) => updateField('linkedin', e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://linkedin.com/company/nexatech-rwanda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              X (Twitter) Profile
            </label>
            <input
              type="text"
              value={companyInfo.twitter || ''}
              onChange={(e) => updateField('twitter', e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://x.com/nexatechrwanda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Facebook Page
            </label>
            <input
              type="text"
              value={companyInfo.facebook || ''}
              onChange={(e) => updateField('facebook', e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://facebook.com/nexatechrwanda"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Instagram Profile
            </label>
            <input
              type="text"
              value={companyInfo.instagram || ''}
              onChange={(e) => updateField('instagram', e.target.value)}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://instagram.com/nexatechrwanda"
            />
          </div>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium text-foreground mb-2">Social Media Management</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Add full URLs to your social media profiles</li>
            <li>• Social icons will appear in the footer when URLs are provided</li>
            <li>• Leave fields empty to hide specific social media links</li>
            <li>• Changes will be reflected immediately on the website</li>
          </ul>
        </div>
      </div>
    </div>
  )
}