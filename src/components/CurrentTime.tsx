"use client"

import { useEffect, useState } from "react"

import { TIME_FORMAT_OPTIONS } from "@/util"

export default function CurrentTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleString("en-US", TIME_FORMAT_OPTIONS))
    update()
    const interval = setInterval(update, 30_000)
    return () => clearInterval(interval)
  }, [])

  return <span suppressHydrationWarning>{time ?? "—"} IST</span>
}
