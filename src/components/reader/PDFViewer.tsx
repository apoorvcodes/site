"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import Script from "next/script"

interface PDFViewerProps {
  url: string | null
  paperId: string
  initialPage?: number
  onPageChange: (page: number) => void
}

declare global {
  interface Window {
    pdfjsLib: any
  }
}

export default function PDFViewer({ url, paperId, initialPage = 1, onPageChange }: PDFViewerProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [scale, setScale] = useState(1.2)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSdkLoaded, setIsSdkLoaded] = useState(false)
  const [rendering, setRendering] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderTaskRef = useRef<any>(null)

  // Initialize PDF.js
  const onScriptLoad = useCallback(() => {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      setIsSdkLoaded(true)
    }
  }, [])

  // Check if already loaded
  useEffect(() => {
    if (window.pdfjsLib) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      setIsSdkLoaded(true)
    }
  }, [])

  // Load Document
  useEffect(() => {
    if (!url || !isSdkLoaded || !window.pdfjsLib) return

    const loadPdf = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Proxy arXiv URLs to avoid CORS
        const pdfUrl = url.includes("arxiv.org") 
          ? `/api/proxy-pdf?url=${encodeURIComponent(url)}`
          : url

        const loadingTask = window.pdfjsLib.getDocument(pdfUrl)
        const pdf = await loadingTask.promise
        setPdfDoc(pdf)
        setNumPages(pdf.numPages)
        setLoading(false)
      } catch (err) {
        console.error("Error loading PDF:", err)
        setError("Failed to load PDF")
        setLoading(false)
      }
    }

    loadPdf()
  }, [url, isSdkLoaded])

  // Render Page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return

    let cancelled = false

    const renderPage = async () => {
      setRendering(true)
      try {
        // Cancel any existing render task
        if (renderTaskRef.current) {
          try {
            await renderTaskRef.current.cancel()
          } catch (e) {
            // Ignore cancel errors
          }
          renderTaskRef.current = null
        }

        if (cancelled) return

        const page = await pdfDoc.getPage(currentPage)
        
        if (cancelled) return

        // Account for device pixel ratio for sharp rendering on Retina displays
        const pixelRatio = window.devicePixelRatio || 1
        const viewport = page.getViewport({ scale: scale * pixelRatio })
        const canvas = canvasRef.current
        const context = canvas?.getContext("2d")

        if (!canvas || !context || cancelled) return

        // Clear the canvas first
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        // Set canvas dimensions at higher resolution
        canvas.height = viewport.height
        canvas.width = viewport.width
        
        // Scale canvas back down with CSS for crisp display
        canvas.style.width = `${viewport.width / pixelRatio}px`
        canvas.style.height = `${viewport.height / pixelRatio}px`

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        }

        const renderTask = page.render(renderContext)
        renderTaskRef.current = renderTask
        await renderTask.promise
        
        if (!cancelled) setRendering(false)
      } catch (err: any) {
        if (err.name !== "RenderingCancelledException" && !cancelled) {
          console.error("Render error:", err)
        }
        if (!cancelled) setRendering(false)
      }
    }

    renderPage()

    return () => {
      cancelled = true
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel()
        } catch (e) {
          // Ignore
        }
      }
    }
  }, [pdfDoc, currentPage, scale])

  // Save page on change
  useEffect(() => {
    if (currentPage > 0) {
      onPageChange(currentPage)
    }
  }, [currentPage, onPageChange])

  // Zoom controls
  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3))
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5))

  // Page navigation
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1))
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, numPages))

  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-paper">
        <p className="text-ink-muted font-sans text-sm">No PDF URL</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-paper">
      <Script 
        src="//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js" 
        onLoad={onScriptLoad}
        strategy="afterInteractive"
      />

      {/* Toolbar */}
      <div className="h-12 bg-ink/[0.02] border-b border-ink/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1}
            className="p-2 rounded-md text-ink hover:bg-ink/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          
          <span className="font-sans text-sm text-ink-muted">
            <span className="text-ink font-medium">{currentPage}</span> / {numPages || "..."}
          </span>
          
          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages}
            className="p-2 rounded-md text-ink hover:bg-ink/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded-md text-ink hover:bg-ink/5 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          
          <span className="font-sans text-xs text-ink-muted min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={zoomIn}
            className="p-2 rounded-md text-ink hover:bg-ink/5 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
          
          <div className="w-px h-5 bg-ink/10 mx-1" />
          
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
            title="Open original"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-ink/[0.02] flex justify-center p-6">
        {loading && (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
              <span className="font-sans text-xs text-ink-muted">Loading PDF...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-500 font-sans text-sm mb-2">{error}</p>
              <a href={url} target="_blank" className="text-ink-muted hover:text-ink font-sans text-xs underline">
                Open directly
              </a>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="relative">
            <canvas ref={canvasRef} className={`shadow-lg rounded-sm transition-opacity ${rendering ? 'opacity-50' : 'opacity-100'}`} />
            {rendering && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-ink/20 border-t-ink rounded-full animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
