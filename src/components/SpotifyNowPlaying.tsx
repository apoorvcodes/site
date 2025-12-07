"use client"

import { useLanyard } from "react-use-lanyard"
import { DISCORD_USER_ID } from "@/util"

export default function SpotifyNowPlaying() {
  const { data, isLoading } = useLanyard({ userId: DISCORD_USER_ID })

  if (isLoading) return null

  const spotify = data?.data.spotify

  if (!spotify) return null

  return (
    <div className="flex items-center gap-3 text-sm text-ink-muted font-sans">
      <span className="text-ink-light">♫</span>
      <span>
        {spotify.song} — {spotify.artist}
      </span>
    </div>
  )
}

