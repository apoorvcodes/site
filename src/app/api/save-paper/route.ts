import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id")

  if (!id) {
    return new NextResponse("Missing paper ID", { status: 400 })
  }

  try {
    const body = await req.json()
    
    await supabase
      .from("papers")
      .update({ outcome: body.outcome })
      .eq("id", id)

    return new NextResponse("OK", { status: 200 })
  } catch (error) {
    console.error("Save error:", error)
    return new NextResponse("Failed to save", { status: 500 })
  }
}

