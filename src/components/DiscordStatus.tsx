"use client"

import { useLanyard } from "react-use-lanyard"

import { DISCORD_USER_ID } from "@/util"

const labels = {
  online: "online",
  idle: "idle",
  dnd: "do not disturb",
  offline: "offline",
} as const

const dotColor = {
  online: "bg-emerald-600",
  idle: "bg-amber-500",
  dnd: "bg-red-600",
  offline: "bg-ink-mute",
} as const

export default function DiscordStatus() {
  const { data, isLoading } = useLanyard({ userId: DISCORD_USER_ID })

  const status = data?.data.discord_status ?? "offline"
  const isReady = !isLoading && data

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${isReady ? dotColor[status] : "bg-ink-mute"}`} />
      <span>{isReady ? labels[status] : "—"}</span>
    </span>
  )
}
