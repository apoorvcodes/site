export const BASE_URL = "https://apxrv.sh" as const

export const DATE_OF_BIRTH = new Date("2006-6-15")

export const DISCORD_USER_ID = "924252039737905162" as const

export const REPOSITORY_LINK = "https://github.com/apoorvcodes" as const

export const SOCIAL_LINKS = {
  Discord: `https://discordapp.com/users/${DISCORD_USER_ID}`,
  Email: "mailto:apoorvcodes381@gmail.com",
  GitHub: "https://github.com/apoorvcodes",
  Linkedin: "https://www.linkedin.com/in/apoorv-singh-344338232/",
  Twitter: "https://twitter.com/apoorvcodes",
} as const

export const TIME_FORMAT_OPTIONS = {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
} as const satisfies Intl.DateTimeFormatOptions
