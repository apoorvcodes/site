import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { url } = await request.json()
  
  let metadata = { 
    title: null as string | null, 
    authors: null as string | null, 
    abstract: null as string | null 
  }
  
  try {
    // arXiv
    if (url.includes("arxiv.org")) {
      const arxivId = url.match(/(\d{4}\.\d{4,5})/)?.[1] || url.match(/abs\/([a-z-]+\/\d+)/)?.[1]
      if (arxivId) {
        const res = await fetch(`https://export.arxiv.org/api/query?id_list=${arxivId}`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        })
        const text = await res.text()
        
        // Parse XML manually since we're on server
        const titleMatch = text.match(/<title>([\s\S]*?)<\/title>/g)
        const title = titleMatch?.[1]?.replace(/<\/?title>/g, '').trim().replace(/\s+/g, ' ')
        
        const authorMatches = text.match(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/g)
        const authors = authorMatches
          ?.map(a => a.match(/<name>([\s\S]*?)<\/name>/)?.[1]?.trim())
          .filter(Boolean)
          .join(', ')
        
        const abstractMatch = text.match(/<summary>([\s\S]*?)<\/summary>/)
        const abstract = abstractMatch?.[1]?.trim().replace(/\s+/g, ' ')
        
        if (title) metadata.title = title
        if (authors) metadata.authors = authors
        if (abstract) metadata.abstract = abstract
      }
    }
    
    // Semantic Scholar fallback
    if (!metadata.title) {
      // Try with URL directly
      const encoded = encodeURIComponent(url)
      const ssRes = await fetch(`https://api.semanticscholar.org/graph/v1/paper/URL:${encoded}?fields=title,authors,abstract`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      })
      
      if (ssRes.ok) {
        const data = await ssRes.json()
        if (data.title) metadata.title = data.title
        if (data.authors) metadata.authors = data.authors.map((a: { name: string }) => a.name).join(', ')
        if (data.abstract) metadata.abstract = data.abstract
      }
    }

    // OpenGraph fallback for any URL
    if (!metadata.title) {
      const pageRes = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      })
      const html = await pageRes.text()
      
      const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"/) ||
                      html.match(/<meta[^>]*content="([^"]*)"[^>]*property="og:title"/) ||
                      html.match(/<title>([^<]*)<\/title>/)
      
      const ogDesc = html.match(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"/) ||
                     html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)
      
      if (ogTitle?.[1]) metadata.title = ogTitle[1].trim()
      if (ogDesc?.[1]) metadata.abstract = ogDesc[1].trim()
    }
    
  } catch (err) {
    console.error("Failed to fetch metadata:", err)
  }
  
  return NextResponse.json(metadata)
}

