export function absoluteUrl(path: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const env = process.env as {
    NEXT_PUBLIC_VERCEL_URL?: string
    NEXT_PUBLIC_APP_URL?: string
  }
  const base = env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${env.NEXT_PUBLIC_VERCEL_URL}`
    : env.NEXT_PUBLIC_APP_URL
  return `${base}${path}`
}
