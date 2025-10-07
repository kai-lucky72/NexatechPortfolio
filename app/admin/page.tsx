"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  FileText, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Settings,
  TrendingUp,
  Eye,
  Plus
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    teamMembers: 0,
    projects: 0,
    testimonials: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [blogsResult, teamResult, projectsResult, testimonialsResult] = await Promise.all([
        supabase.from('blogs').select('id', { count: 'exact' }),
        supabase.from('team_members').select('id', { count: 'exact' }),
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' })
      ])

      setStats({
        blogs: blogsResult.count || 0,
        teamMembers: teamResult.count || 0,
        projects: projectsResult.count || 0,
        testimonials: testimonialsResult.count || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'Add Blog Post',
      description: 'Create a new blog post',
      href: '/admin/blogs/new',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Add Team Member',
      description: 'Add a new team member',
      href: '/admin/team/new',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Add Project',
      description: 'Add a new project',
      href: '/admin/projects/new',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      title: 'Add Testimonial',
      description: 'Add a new testimonial',
      href: '/admin/testimonials/new',
      icon: MessageSquare,
      color: 'bg-orange-500'
    }
  ]

  const managementSections = [
    {
      title: 'Blog Posts',
      description: 'Manage your blog content',
      href: '/admin/blogs',
      icon: FileText,
      count: stats.blogs
    },
    {
      title: 'Team Members',
      description: 'Manage team member profiles',
      href: '/admin/team',
      icon: Users,
      count: stats.teamMembers
    },
    {
      title: 'Projects',
      description: 'Manage your projects',
      href: '/admin/projects',
      icon: Briefcase,
      count: stats.projects
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      href: '/admin/testimonials',
      icon: MessageSquare,
      count: stats.testimonials
    },
    {
      title: 'Contact Info',
      description: 'Update contact information',
      href: '/admin/contact',
      icon: Settings,
      count: 1
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content and settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="bg-card p-6 rounded-lg border">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-2xl font-bold text-foreground">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <a
                key={action.title}
                href={action.href}
                className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Management Sections */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Content Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managementSections.map((section) => {
            const Icon = section.icon
            return (
              <a
                key={section.title}
                href={section.href}
                className="bg-card p-6 rounded-lg border hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">{section.count}</span>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="bg-card p-6 rounded-lg border">
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activity to display</p>
            <p className="text-sm text-muted-foreground mt-2">
              Start managing your content to see activity here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

