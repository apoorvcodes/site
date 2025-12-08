"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import { supabase, ResearchPaper, PaperStatus } from "@/lib/supabase"
import dynamic from "next/dynamic"
import Link from "next/link"

const PDFViewer = dynamic(() => import("@/components/reader/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-paper">
      <div className="w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
    </div>
  ),
})

const NotesEditor = dynamic(() => import("@/components/reader/NotesEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-paper">
      <div className="w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
    </div>
  ),
})

export default function ReaderPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState(false)
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null)
  const [notes, setNotes] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showSidebar, setShowSidebar] = useState(true)
  const pageDebounceRef = useRef<NodeJS.Timeout | null>(null)

  // Auth check
  useEffect(() => {
    const stored = localStorage.getItem("dump_auth")
    if (stored === "true") setAuthenticated(true)
  }, [])

  // Fetch papers
  useEffect(() => {
    if (authenticated) fetchPapers()
  }, [authenticated])

  // Auto-select paper from localStorage
  useEffect(() => {
    const storedPaperId = localStorage.getItem("reader_paper_id")
    if (storedPaperId && papers.length > 0) {
      const paper = papers.find(p => p.id === storedPaperId)
      if (paper) {
        selectPaper(paper)
        localStorage.removeItem("reader_paper_id")
      }
    }
  }, [papers])

  const fetchPapers = async () => {
    const { data } = await supabase
      .from("papers")
      .select("*")
      .order("created_at", { ascending: false })
    if (data) setPapers(data)
  }

  const selectPaper = (paper: ResearchPaper) => {
    setSelectedPaper(paper)
    setShowSidebar(false)
    
    // Load saved notes
    setNotes(paper.outcome || "")
    
    // Load saved page from Supabase (fallback to localStorage for backwards compat)
    const localPage = localStorage.getItem(`paper_page_${paper.id}`)
    const savedPage = paper.current_page || (localPage ? parseInt(localPage) : 1)
    setCurrentPage(savedPage)
    
    setLastSaved(null)
  }

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    if (selectedPaper) {
      // Save to localStorage immediately for fast access
      localStorage.setItem(`paper_page_${selectedPaper.id}`, page.toString())
      
      // Debounce Supabase save to avoid too many requests
      if (pageDebounceRef.current) {
        clearTimeout(pageDebounceRef.current)
      }
      pageDebounceRef.current = setTimeout(async () => {
        await supabase
          .from("papers")
          .update({ current_page: page })
          .eq("id", selectedPaper.id)
        
        // Update local state
        setPapers(prev => prev.map(p => p.id === selectedPaper.id ? { ...p, current_page: page } : p))
      }, 1000) // Save after 1 second of no page changes
    }
  }, [selectedPaper])

  const saveNotes = useCallback(async () => {
    if (!selectedPaper) return
    setSaving(true)
    
    await supabase
      .from("papers")
      .update({ outcome: notes })
      .eq("id", selectedPaper.id)
    
    // Update local state
    setPapers(prev => prev.map(p => p.id === selectedPaper.id ? { ...p, outcome: notes } : p))
    setSelectedPaper(prev => prev ? { ...prev, outcome: notes } : null)
    
    setSaving(false)
    setLastSaved(new Date())
  }, [selectedPaper, notes])

  // Save on page close or tab switch
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (selectedPaper && notes !== selectedPaper.outcome) {
        // Use sendBeacon for reliable save on page close
        const data = JSON.stringify({ outcome: notes })
        navigator.sendBeacon(
          `/api/save-paper?id=${selectedPaper.id}`,
          data
        )
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && selectedPaper && notes !== selectedPaper.outcome) {
        // Save when tab becomes hidden
        saveNotes()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [selectedPaper, notes, saveNotes])

  const markAsRead = async () => {
    if (!selectedPaper) return
    
    await supabase
      .from("papers")
      .update({ status: 'read' as PaperStatus })
      .eq("id", selectedPaper.id)
    
    setPapers(papers.map(p => p.id === selectedPaper.id ? { ...p, status: 'read' as PaperStatus } : p))
    setSelectedPaper({ ...selectedPaper, status: 'read' as PaperStatus })
  }

  const updateStatus = async (status: PaperStatus) => {
    if (!selectedPaper) return
    
    await supabase
      .from("papers")
      .update({ status })
      .eq("id", selectedPaper.id)
    
    setPapers(papers.map(p => p.id === selectedPaper.id ? { ...p, status } : p))
    setSelectedPaper({ ...selectedPaper, status })
  }

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

  // Get PDF URL
  const getPdfUrl = (paper: ResearchPaper) => {
    if (!paper.url) return null
    if (paper.url.includes("arxiv.org/abs/")) {
      return paper.url.replace("arxiv.org/abs/", "arxiv.org/pdf/") + ".pdf"
    }
    if (paper.url.includes("arxiv.org/pdf/")) {
      return paper.url.endsWith(".pdf") ? paper.url : paper.url + ".pdf"
    }
    return paper.url
  }

  const statusLabels: Record<PaperStatus, string> = { to_read: "To Read", reading: "Reading", read: "Read" }

  // Login screen
  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 bg-paper">
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 bg-transparent border border-ink/20 rounded-lg font-sans text-sm focus:outline-none focus:border-ink/40 placeholder:text-ink-muted"
          />
          <button
            type="submit"
            className="w-full mt-3 px-4 py-3 bg-ink text-paper rounded-lg font-sans text-sm hover:bg-ink-light transition-colors"
          >
            Enter Reader
          </button>
          {loginError && (
            <p className="mt-2 text-center font-sans text-xs text-red-500">Wrong password</p>
          )}
        </form>
      </main>
    )
  }

  return (
    <main className="h-screen bg-paper overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-paper border-b border-ink/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="p-2 rounded-md text-ink hover:bg-ink/5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {selectedPaper && (
            <div className="flex items-center gap-3">
              <h1 className="font-medium text-sm text-ink truncate max-w-md">
                {selectedPaper.title || "Untitled"}
              </h1>
              <select
                value={selectedPaper.status}
                onChange={(e) => updateStatus(e.target.value as PaperStatus)}
                className="px-2 py-1 bg-ink/5 border-0 rounded font-sans text-xs text-ink-muted focus:outline-none"
              >
                <option value="to_read">To Read</option>
                <option value="reading">Reading</option>
                <option value="read">Read</option>
              </select>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {selectedPaper && selectedPaper.status !== 'read' && (
            <button
              onClick={markAsRead}
              className="px-3 py-1.5 bg-green-600 text-white rounded-md font-sans text-xs hover:bg-green-700 transition-colors"
            >
              ✓ Mark as Read
            </button>
          )}
          <Link
            href="/dump"
            className="font-sans text-xs text-ink-muted hover:text-ink transition-colors"
          >
            ← Back to Dump
          </Link>
        </div>
      </header>

      <div className="h-[calc(100vh-56px)] flex">
        {/* Paper List Sidebar */}
        {showSidebar && (
          <aside className="w-72 bg-paper border-r border-ink/10 overflow-y-auto">
            <div className="p-4">
              <h2 className="font-sans text-xs uppercase tracking-[0.15em] text-ink-muted mb-4">
                Papers ({papers.length})
              </h2>
              <div className="space-y-1">
                {papers.map((paper) => {
                  const hasNotes = paper.outcome && paper.outcome.length > 0
                  const savedPage = paper.current_page || 1
                  return (
                    <button
                      key={paper.id}
                      onClick={() => selectPaper(paper)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        selectedPaper?.id === paper.id
                          ? "bg-ink/10 text-ink"
                          : "text-ink-light hover:bg-ink/5"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className="line-clamp-2 flex-1">{paper.title || paper.url || "Untitled"}</span>
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-muted">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          paper.status === "reading" ? "bg-amber-100 text-amber-700" :
                          paper.status === "read" ? "bg-green-100 text-green-700" :
                          "bg-ink/5 text-ink-muted"
                        }`}>
                          {statusLabels[paper.status]}
                        </span>
                        {hasNotes && <span className="text-green-600">📝</span>}
                        {savedPage > 1 && (
                          <span className="text-ink-muted">p.{savedPage}</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        {selectedPaper ? (
          <PanelGroup direction="horizontal" className="flex-1">
            {/* PDF Panel */}
            <Panel defaultSize={55} minSize={30}>
              <PDFViewer
                url={getPdfUrl(selectedPaper)}
                paperId={selectedPaper.id}
                initialPage={currentPage}
                onPageChange={handlePageChange}
              />
            </Panel>

            {/* Resize Handle */}
            <PanelResizeHandle className="w-1 bg-ink/10 hover:bg-ink/20 transition-colors cursor-col-resize" />

            {/* Notes Panel */}
            <Panel defaultSize={45} minSize={25}>
              <NotesEditor
                content={notes}
                onChange={setNotes}
                paperTitle={selectedPaper.title || "Untitled"}
                onSave={saveNotes}
                saving={saving}
                lastSaved={lastSaved}
              />
            </Panel>
          </PanelGroup>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-paper">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ink/5 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <p className="text-ink-muted font-sans text-sm">Select a paper to start reading</p>
              {!showSidebar && (
                <button
                  onClick={() => setShowSidebar(true)}
                  className="mt-3 text-ink font-sans text-sm underline underline-offset-4 hover:text-ink-light"
                >
                  Show paper list
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
