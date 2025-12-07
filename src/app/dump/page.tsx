"use client"

import { useState, useEffect } from "react"
import { 
  supabase, 
  Task, 
  ClipboardItem, 
  ResearchPaper, 
  EmailNote,
  PaperStatus,
  getTodayString,
  formatDate 
} from "@/lib/supabase"

export default function DumpPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(false)
  const [activeTab, setActiveTab] = useState<"tasks" | "clipboard" | "papers" | "emails">("tasks")
  
  // Data states
  const [tasks, setTasks] = useState<Task[]>([])
  const [clipboard, setClipboard] = useState<ClipboardItem[]>([])
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [emails, setEmails] = useState<EmailNote[]>([])
  
  // Input states
  const [newTask, setNewTask] = useState({ content: "", priority: "medium" as Task["priority"] })
  const [newClipboard, setNewClipboard] = useState({ content: "", label: "" })
  const [newPaperUrl, setNewPaperUrl] = useState("")
  const [newEmail, setNewEmail] = useState({ subject: "", reason: "", priority: "medium" as EmailNote["priority"] })
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(getTodayString())
  const [paperFilter, setPaperFilter] = useState<PaperStatus | "all">("all")
  const [editingPaper, setEditingPaper] = useState<string | null>(null)
  const [outcomeInput, setOutcomeInput] = useState("")

  useEffect(() => {
    const stored = localStorage.getItem("dump_auth")
    if (stored === "true") setAuthenticated(true)
  }, [])

  useEffect(() => {
    if (authenticated) fetchAll()
  }, [authenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(false)
    
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      
      if (res.ok) {
        setAuthenticated(true)
        localStorage.setItem("dump_auth", "true")
      } else {
        setLoginError(true)
      }
    } catch {
      setLoginError(true)
    }
  }

  const handleLogout = () => {
    setAuthenticated(false)
    localStorage.removeItem("dump_auth")
  }

  const fetchAll = async () => {
    const [tasksRes, clipRes, papersRes, emailsRes] = await Promise.all([
      supabase.from("tasks").select("*").order("created_at", { ascending: false }),
      supabase.from("clipboard").select("*").order("created_at", { ascending: false }),
      supabase.from("papers").select("*").order("created_at", { ascending: false }),
      supabase.from("emails").select("*").order("created_at", { ascending: false }),
    ])
    
    if (tasksRes.data) setTasks(tasksRes.data)
    if (clipRes.data) setClipboard(clipRes.data)
    if (papersRes.data) setPapers(papersRes.data)
    if (emailsRes.data) setEmails(emailsRes.data)
  }

  // Task functions
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.content.trim()) return
    
    const { data } = await supabase
      .from("tasks")
      .insert({ 
        content: newTask.content, 
        completed: false, 
        date: selectedDate,
        priority: newTask.priority 
      })
      .select()
      .single()
    
    if (data) setTasks([data, ...tasks])
    setNewTask({ content: "", priority: "medium" })
  }

  const toggleTask = async (id: string, completed: boolean) => {
    await supabase.from("tasks").update({ completed: !completed }).eq("id", id)
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !completed } : t))
  }

  const deleteTask = async (id: string) => {
    await supabase.from("tasks").delete().eq("id", id)
    setTasks(tasks.filter(t => t.id !== id))
  }

  // Clipboard functions
  const addClipboard = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newClipboard.content.trim()) return
    
    const { data } = await supabase
      .from("clipboard")
      .insert({ content: newClipboard.content, label: newClipboard.label || null })
      .select()
      .single()
    
    if (data) setClipboard([data, ...clipboard])
    setNewClipboard({ content: "", label: "" })
  }

  const deleteClipboard = async (id: string) => {
    await supabase.from("clipboard").delete().eq("id", id)
    setClipboard(clipboard.filter(c => c.id !== id))
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  // Paper functions with metadata fetch
  const fetchPaperMetadata = async (url: string) => {
    let metadata = { title: null as string | null, authors: null as string | null, abstract: null as string | null }
    
    // arXiv
    if (url.includes("arxiv.org")) {
      try {
        const arxivId = url.match(/(\d{4}\.\d{4,5})/)?.[1]
        if (arxivId) {
          const res = await fetch(`https://export.arxiv.org/api/query?id_list=${arxivId}`)
          const text = await res.text()
          const parser = new DOMParser()
          const xml = parser.parseFromString(text, "text/xml")
          const entry = xml.querySelector("entry")
          if (entry) {
            metadata.title = entry.querySelector("title")?.textContent?.trim().replace(/\s+/g, ' ') || null
            metadata.authors = Array.from(entry.querySelectorAll("author name"))
              .map(n => n.textContent)
              .join(", ") || null
            metadata.abstract = entry.querySelector("summary")?.textContent?.trim().replace(/\s+/g, ' ') || null
          }
        }
      } catch (err) {
        console.error("Failed to fetch arXiv metadata:", err)
      }
    }
    
    // Semantic Scholar (for other URLs)
    if (!metadata.title && (url.includes("semanticscholar") || url.includes("doi.org"))) {
      try {
        const res = await fetch(`https://api.semanticscholar.org/v1/paper/${encodeURIComponent(url)}`)
        if (res.ok) {
          const data = await res.json()
          metadata.title = data.title || null
          metadata.authors = data.authors?.map((a: { name: string }) => a.name).join(", ") || null
          metadata.abstract = data.abstract || null
        }
      } catch (err) {
        console.error("Failed to fetch Semantic Scholar metadata:", err)
      }
    }
    
    return metadata
  }

  const addPaper = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPaperUrl.trim()) return
    setLoading(true)

    const metadata = await fetchPaperMetadata(newPaperUrl)

    const { data } = await supabase
      .from("papers")
      .insert({ 
        url: newPaperUrl, 
        ...metadata,
        status: 'to_read',
        outcome: null
      })
      .select()
      .single()
    
    if (data) setPapers([data, ...papers])
    setNewPaperUrl("")
    setLoading(false)
  }

  const updatePaperStatus = async (id: string, status: PaperStatus) => {
    await supabase.from("papers").update({ status }).eq("id", id)
    setPapers(papers.map(p => p.id === id ? { ...p, status } : p))
  }

  const savePaperOutcome = async (id: string) => {
    await supabase.from("papers").update({ outcome: outcomeInput, status: 'read' }).eq("id", id)
    setPapers(papers.map(p => p.id === id ? { ...p, outcome: outcomeInput, status: 'read' } : p))
    setEditingPaper(null)
    setOutcomeInput("")
  }

  const deletePaper = async (id: string) => {
    await supabase.from("papers").delete().eq("id", id)
    setPapers(papers.filter(p => p.id !== id))
  }

  const refetchMetadata = async (paper: ResearchPaper) => {
    setLoading(true)
    const metadata = await fetchPaperMetadata(paper.url)
    await supabase.from("papers").update(metadata).eq("id", paper.id)
    setPapers(papers.map(p => p.id === paper.id ? { ...p, ...metadata } : p))
    setLoading(false)
  }

  // Email functions
  const addEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newEmail.subject.trim()) return
    
    const { data } = await supabase
      .from("emails")
      .insert({ ...newEmail, done: false })
      .select()
      .single()
    
    if (data) setEmails([data, ...emails])
    setNewEmail({ subject: "", reason: "", priority: "medium" })
  }

  const toggleEmail = async (id: string, done: boolean) => {
    await supabase.from("emails").update({ done: !done }).eq("id", id)
    setEmails(emails.map(e => e.id === id ? { ...e, done: !done } : e))
  }

  const deleteEmail = async (id: string) => {
    await supabase.from("emails").delete().eq("id", id)
    setEmails(emails.filter(e => e.id !== id))
  }

  // Get unique dates from tasks
  const taskDates = Array.from(new Set(tasks.map(t => t.date))).sort().reverse()
  const tasksForSelectedDate = tasks.filter(t => t.date === selectedDate)

  // Filter papers
  const filteredPapers = paperFilter === "all" 
    ? papers 
    : papers.filter(p => p.status === paperFilter)

  const priorityColors = {
    low: "text-ink-muted",
    medium: "text-amber-600",
    high: "text-red-500"
  }

  const statusLabels: Record<PaperStatus, string> = {
    to_read: "To Read",
    reading: "Reading",
    read: "Read"
  }

  // Login screen
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
            autoFocus
          />
          <button
            type="submit"
            className="w-full mt-3 px-4 py-3 bg-ink text-paper rounded-lg font-sans text-sm hover:bg-ink-light transition-colors"
          >
            Enter
          </button>
          {loginError && (
            <p className="mt-2 text-center font-sans text-xs text-red-500">
              Wrong password
            </p>
          )}
        </form>
      </main>
    )
  }

  const tabs = [
    { id: "tasks", label: "Tasks", count: tasksForSelectedDate.filter(t => !t.completed).length },
    { id: "clipboard", label: "Clipboard", count: clipboard.length },
    { id: "papers", label: "Papers", count: papers.filter(p => p.status !== 'read').length },
    { id: "emails", label: "Emails", count: emails.filter(e => !e.done).length },
  ] as const

  return (
    <main className="min-h-screen pt-16 pb-24 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-medium">Dump</h1>
          <button
            onClick={handleLogout}
            className="font-sans text-xs text-ink-muted hover:text-ink transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-ink/5 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-2.5 font-sans text-sm rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-paper text-ink shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-ink/10 rounded-full">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tasks Tab */}
        {activeTab === "tasks" && (
          <div className="space-y-6">
            {/* Date selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {taskDates.length === 0 || !taskDates.includes(getTodayString()) ? (
                <button
                  onClick={() => setSelectedDate(getTodayString())}
                  className={`px-3 py-1.5 font-sans text-xs rounded-full whitespace-nowrap transition-colors ${
                    selectedDate === getTodayString()
                      ? "bg-ink text-paper"
                      : "bg-ink/5 text-ink-muted hover:bg-ink/10"
                  }`}
                >
                  Today
                </button>
              ) : null}
              {taskDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-1.5 font-sans text-xs rounded-full whitespace-nowrap transition-colors ${
                    selectedDate === date
                      ? "bg-ink text-paper"
                      : "bg-ink/5 text-ink-muted hover:bg-ink/10"
                  }`}
                >
                  {formatDate(date)}
                  <span className="ml-1 opacity-50">
                    ({tasks.filter(t => t.date === date && !t.completed).length})
                  </span>
                </button>
              ))}
            </div>

            {/* Add task form */}
            <form onSubmit={addTask} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTask.content}
                  onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
                  placeholder="New task..."
                  className="flex-1 px-4 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
                />
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task["priority"] })}
                  className="px-3 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-xs focus:outline-none focus:border-ink/40"
                >
                  <option value="low">Low</option>
                  <option value="medium">Med</option>
                  <option value="high">High</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-ink text-paper rounded-lg font-sans text-sm hover:bg-ink-light transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
            
            {/* Task list */}
            <div className="space-y-1">
              {tasksForSelectedDate
                .sort((a, b) => {
                  if (a.completed !== b.completed) return a.completed ? 1 : -1
                  const priorityOrder = { high: 0, medium: 1, low: 2 }
                  return priorityOrder[a.priority] - priorityOrder[b.priority]
                })
                .map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg group transition-colors ${
                    task.completed ? "bg-ink/[0.02]" : "bg-ink/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id, task.completed)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                      task.completed
                        ? "bg-ink border-ink text-paper"
                        : "border-ink/30 hover:border-ink/50"
                    }`}
                  >
                    {task.completed && <span className="text-xs">✓</span>}
                  </button>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`font-sans text-sm block ${
                        task.completed ? "line-through text-ink-muted" : ""
                      }`}
                    >
                      {task.content}
                    </span>
                  </div>
                  <span className={`font-sans text-xs ${priorityColors[task.priority]}`}>
                    {task.priority === "high" && "●"}
                    {task.priority === "medium" && "○"}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-red-500 transition-all"
                  >
                    ×
                  </button>
                </div>
              ))}
              {tasksForSelectedDate.length === 0 && (
                <p className="text-center py-12 text-ink-muted font-sans text-sm">
                  No tasks for {formatDate(selectedDate)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Clipboard Tab */}
        {activeTab === "clipboard" && (
          <div className="space-y-4">
            <form onSubmit={addClipboard} className="space-y-2">
              <input
                type="text"
                value={newClipboard.content}
                onChange={(e) => setNewClipboard({ ...newClipboard, content: e.target.value })}
                placeholder="Paste anything..."
                className="w-full px-4 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newClipboard.label}
                  onChange={(e) => setNewClipboard({ ...newClipboard, label: e.target.value })}
                  placeholder="Label (optional)..."
                  className="flex-1 px-4 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-ink text-paper rounded-lg font-sans text-sm hover:bg-ink-light transition-colors"
                >
                  Save
                </button>
              </div>
            </form>
            
            <div className="space-y-2">
              {clipboard.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 bg-ink/[0.02] rounded-lg group hover:bg-ink/[0.04] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {item.label && (
                        <p className="font-sans text-xs text-ink-muted mb-1">{item.label}</p>
                      )}
                      <p className="font-mono text-sm break-all">{item.content}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => copyToClipboard(item.content)}
                        className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-ink transition-all"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => deleteClipboard(item.id)}
                        className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-red-500 transition-all"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 font-sans text-xs text-ink-muted">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {clipboard.length === 0 && (
                <p className="text-center py-12 text-ink-muted font-sans text-sm">Nothing saved yet</p>
              )}
            </div>
          </div>
        )}

        {/* Papers Tab */}
        {activeTab === "papers" && (
          <div className="space-y-4">
            {/* Add paper form */}
            <form onSubmit={addPaper} className="flex gap-2">
              <input
                type="url"
                value={newPaperUrl}
                onChange={(e) => setNewPaperUrl(e.target.value)}
                placeholder="Paper URL (arXiv, Semantic Scholar, DOI)..."
                className="flex-1 px-4 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2.5 bg-ink text-paper rounded-lg font-sans text-sm hover:bg-ink-light transition-colors disabled:opacity-50"
              >
                {loading ? "..." : "Add"}
              </button>
            </form>

            {/* Filter */}
            <div className="flex gap-1 p-1 bg-ink/5 rounded-lg w-fit">
              {(["all", "to_read", "reading", "read"] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setPaperFilter(status)}
                  className={`px-3 py-1.5 font-sans text-xs rounded-md transition-colors ${
                    paperFilter === status
                      ? "bg-paper text-ink shadow-sm"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {status === "all" ? "All" : statusLabels[status]}
                  <span className="ml-1 opacity-50">
                    ({status === "all" ? papers.length : papers.filter(p => p.status === status).length})
                  </span>
                </button>
              ))}
            </div>
            
            {/* Paper list */}
            <div className="space-y-3">
              {filteredPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="px-4 py-4 bg-ink/[0.02] rounded-lg group hover:bg-ink/[0.04] transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <select
                          value={paper.status}
                          onChange={(e) => updatePaperStatus(paper.id, e.target.value as PaperStatus)}
                          className="px-2 py-0.5 bg-ink/5 border-0 rounded font-sans text-xs focus:outline-none"
                        >
                          <option value="to_read">To Read</option>
                          <option value="reading">Reading</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sm hover:text-ink-light transition-colors line-clamp-2"
                      >
                        {paper.title || paper.url}
                      </a>
                      {paper.authors && (
                        <p className="mt-1 font-sans text-xs text-ink-muted line-clamp-1">
                          {paper.authors}
                        </p>
                      )}
                      {paper.abstract && (
                        <p className="mt-2 font-sans text-xs text-ink-light line-clamp-3">
                          {paper.abstract}
                        </p>
                      )}
                      
                      {/* Outcome section */}
                      {paper.status === "read" && paper.outcome && (
                        <div className="mt-3 p-3 bg-ink/5 rounded-md">
                          <p className="font-sans text-xs text-ink-muted mb-1">Outcome / Notes:</p>
                          <p className="font-sans text-sm">{paper.outcome}</p>
                        </div>
                      )}
                      
                      {/* Edit outcome */}
                      {editingPaper === paper.id && (
                        <div className="mt-3 space-y-2">
                          <textarea
                            value={outcomeInput}
                            onChange={(e) => setOutcomeInput(e.target.value)}
                            placeholder="What did you learn? Key takeaways..."
                            className="w-full px-3 py-2 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted resize-none"
                            rows={3}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => savePaperOutcome(paper.id)}
                              className="px-3 py-1.5 bg-ink text-paper rounded font-sans text-xs hover:bg-ink-light transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingPaper(null); setOutcomeInput("") }}
                              className="px-3 py-1.5 font-sans text-xs text-ink-muted hover:text-ink transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-1 shrink-0">
                      {!paper.title && (
                        <button
                          onClick={() => refetchMetadata(paper)}
                          disabled={loading}
                          className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-ink transition-all"
                        >
                          Fetch
                        </button>
                      )}
                      {editingPaper !== paper.id && (
                        <button
                          onClick={() => { setEditingPaper(paper.id); setOutcomeInput(paper.outcome || "") }}
                          className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-ink transition-all"
                        >
                          Note
                        </button>
                      )}
                      <button
                        onClick={() => deletePaper(paper.id)}
                        className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-red-500 transition-all"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredPapers.length === 0 && (
                <p className="text-center py-12 text-ink-muted font-sans text-sm">
                  {paperFilter === "all" ? "No papers saved yet" : `No ${statusLabels[paperFilter as PaperStatus].toLowerCase()} papers`}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Emails Tab */}
        {activeTab === "emails" && (
          <div className="space-y-4">
            <form onSubmit={addEmail} className="space-y-2">
              <input
                type="text"
                value={newEmail.subject}
                onChange={(e) => setNewEmail({ ...newEmail, subject: e.target.value })}
                placeholder="Who to email..."
                className="w-full px-4 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newEmail.reason}
                  onChange={(e) => setNewEmail({ ...newEmail, reason: e.target.value })}
                  placeholder="Why you need to email them..."
                  className="flex-1 px-4 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
                />
                <select
                  value={newEmail.priority}
                  onChange={(e) => setNewEmail({ ...newEmail, priority: e.target.value as EmailNote["priority"] })}
                  className="px-3 py-2.5 bg-transparent border border-ink/20 rounded-lg font-sans text-xs focus:outline-none focus:border-ink/40"
                >
                  <option value="low">Low</option>
                  <option value="medium">Med</option>
                  <option value="high">High</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-ink text-paper rounded-lg font-sans text-sm hover:bg-ink-light transition-colors"
                >
                  Add
                </button>
              </div>
            </form>
            
            <div className="space-y-2">
              {emails
                .sort((a, b) => {
                  if (a.done !== b.done) return a.done ? 1 : -1
                  const priorityOrder = { high: 0, medium: 1, low: 2 }
                  return priorityOrder[a.priority] - priorityOrder[b.priority]
                })
                .map((email) => (
                <div
                  key={email.id}
                  className={`px-4 py-3 rounded-lg group transition-colors ${
                    email.done ? "bg-ink/[0.02]" : "bg-ink/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleEmail(email.id, email.done)}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        email.done
                          ? "bg-ink border-ink text-paper"
                          : "border-ink/30 hover:border-ink/50"
                      }`}
                    >
                      {email.done && <span className="text-xs">✓</span>}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`font-sans text-sm font-medium ${email.done ? "line-through text-ink-muted" : ""}`}>
                          {email.subject}
                        </p>
                        <span className={`font-sans text-xs ${priorityColors[email.priority]}`}>
                          {email.priority === "high" && "●"}
                          {email.priority === "medium" && "○"}
                        </span>
                      </div>
                      {email.reason && (
                        <p className={`mt-1 font-sans text-xs ${email.done ? "text-ink-muted/50" : "text-ink-muted"}`}>
                          {email.reason}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteEmail(email.id)}
                      className="opacity-0 group-hover:opacity-100 font-sans text-xs text-ink-muted hover:text-red-500 transition-all"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              {emails.length === 0 && (
                <p className="text-center py-12 text-ink-muted font-sans text-sm">No email reminders yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
