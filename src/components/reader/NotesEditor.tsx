"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Placeholder from "@tiptap/extension-placeholder"
import { useEffect, useCallback, useRef } from "react"
import TurndownService from "turndown"

interface NotesEditorProps {
  content: string
  onChange: (content: string) => void
  paperTitle: string
  onSave: () => void
  saving: boolean
  lastSaved: Date | null
}

export default function NotesEditor({
  content,
  onChange,
  paperTitle,
  onSave,
  saving,
  lastSaved,
}: NotesEditorProps) {
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Start taking notes...",
      }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-full px-5 py-4 text-ink",
      },
    },
    onUpdate: ({ editor }) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onChange(editor.getHTML())
      }, 300)
    },
  })

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  const downloadMarkdown = useCallback(() => {
    if (!editor) return
    
    const turndown = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
    })
    
    const markdown = `# ${paperTitle}\n\n${turndown.turndown(editor.getHTML())}`
    
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${paperTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_notes.md`
    a.click()
    URL.revokeObjectURL(url)
  }, [editor, paperTitle])

  return (
    <div className="h-full flex flex-col bg-paper">
      {/* Toolbar */}
      <div className="h-12 bg-ink/[0.02] border-b border-ink/10 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded-md font-sans text-xs font-bold transition-colors ${
              editor?.isActive("bold") ? "bg-ink/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            B
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded-md font-sans text-xs italic transition-colors ${
              editor?.isActive("italic") ? "bg-ink/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            I
          </button>
          <div className="w-px h-5 bg-ink/10 mx-1" />
          <button
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded-md font-sans text-xs transition-colors ${
              editor?.isActive("heading", { level: 2 }) ? "bg-ink/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded-md font-sans text-xs transition-colors ${
              editor?.isActive("bulletList") ? "bg-ink/10 text-ink" : "text-ink-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            •
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded-md font-sans text-xs transition-colors ${
              editor?.isActive("highlight") ? "bg-amber-100 text-amber-700" : "text-ink-muted hover:text-ink hover:bg-ink/5"
            }`}
          >
            ✦
          </button>
        </div>

        <div className="flex items-center gap-2">
          {lastSaved && (
            <span className="font-sans text-xs text-ink-muted">
              {saving ? "Saving..." : `Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </span>
          )}
          <button
            onClick={onSave}
            disabled={saving}
            className="px-3 py-1.5 bg-ink text-paper rounded-md font-sans text-xs hover:bg-ink-light transition-colors disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={downloadMarkdown}
            className="p-2 rounded-md text-ink-muted hover:text-ink hover:bg-ink/5 transition-colors"
            title="Download as Markdown"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  )
}
