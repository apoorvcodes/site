import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our tables
export interface Task {
  id: string
  content: string
  completed: boolean
  date: string // YYYY-MM-DD format for daily grouping
  priority: 'low' | 'medium' | 'high'
  created_at: string
}

export interface ClipboardItem {
  id: string
  content: string
  label: string | null
  created_at: string
}

export type PaperStatus = 'to_read' | 'reading' | 'read'

export interface ResearchPaper {
  id: string
  url: string
  title: string | null
  authors: string | null
  abstract: string | null
  status: PaperStatus
  outcome: string | null // notes after reading
  current_page: number | null // reading progress
  created_at: string
}

export interface EmailNote {
  id: string
  subject: string
  reason: string
  priority: 'low' | 'medium' | 'high'
  done: boolean
  created_at: string
}

export type GoalStatus = 'active' | 'completed' | 'ditched'

export interface Goal {
  id: string
  title: string
  description: string | null
  status: GoalStatus
  ditch_reason: string | null
  completed_at: string | null
  created_at: string
}

// Helper to get today's date string
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0]
}

// Helper to format date for display
export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  if (dateStr === getTodayString()) return 'Today'
  if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday'
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  })
}
