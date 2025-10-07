import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lxtuippfykcxwoyquesl.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4dHVpcHBmeWtjeHdveXF1ZXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4Nzk1MTAsImV4cCI6MjA3NDQ1NTUxMH0.4wh6CGWk8CX56aTJZNKZNUjGs7xKpIQkwPbIio_v2Qk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image_url: string
  categories: string[]
  author: string
  published_at: string
  external_url: string
  created_at: string
  updated_at: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  department: 'director' | 'senior' | 'dev'
  image: string
  description: string
  email: string
  linkedin: string
  twitter: string
  created_at: string
  updated_at: string
}

export interface Project {
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

export interface ContactInfo {
  id: string
  email: string
  phone: string
  address: string
  company_name: string
  tagline: string
  updated_at: string
}

export interface Testimonial {
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
