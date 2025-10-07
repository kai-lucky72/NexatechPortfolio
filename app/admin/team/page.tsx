"use client"
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface TeamMember {
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
import { Plus, Edit, Trash2, Linkedin, User } from 'lucide-react'

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setTeamMembers(data || [])
    } catch (error) {
      console.error('Error fetching team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return

    setDeletingId(id)
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id)

      if (error) throw error
      setTeamMembers(teamMembers.filter(member => member.id !== id))
    } catch (error) {
      console.error('Error deleting team member:', error)
      alert('Failed to delete team member')
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team member profiles
          </p>
        </div>
        <a
          href="/admin/team/new"
          className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Team Member
        </a>
      </div>

      {/* Team Members List */}
      <div className="bg-card rounded-lg border">
        {teamMembers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <User className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">No team members yet</p>
              <p className="text-sm">Get started by adding your first team member</p>
            </div>
            <a
              href="/admin/team/new"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Team Member
            </a>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      
                      {member.description && (
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {member.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm"
                          >
                            <Linkedin className="h-4 w-4" />
                            LinkedIn
                          </a>
                        )}
                        {member.email && (
                          <span className="text-sm text-muted-foreground">
                            {member.email}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground capitalize">
                          {member.department}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <a
                      href={`/admin/team/${member.id}/edit`}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => handleDelete(member.id)}
                      disabled={deletingId === member.id}
                      className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deletingId === member.id ? (
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
