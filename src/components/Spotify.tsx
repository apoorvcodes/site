"use client"

import { useLanyard } from "react-use-lanyard"

import { DISCORD_USER_ID } from "@/util"

export default function Spotify() {
  const { data } = useLanyard({ userId: DISCORD_USER_ID })

  if (!data?.data.listening_to_spotify || !data.data.spotify) return null

  const { song, artist, track_id } = data.data.spotify

  return (
    <a
      href={`https://open.spotify.com/track/${track_id}`}
      target="_blank"
      rel="noopener noreferrer"
      title={`${song} — ${artist}`}
      className="inline-flex max-w-[260px] items-center gap-1.5 transition-colors hover:text-ink"
    >
      <span aria-hidden className="animate-pulse text-accent">
        ♪
      </span>
      <span className="truncate">
        {song} — {artist}
      </span>
    </a>
  )
}
