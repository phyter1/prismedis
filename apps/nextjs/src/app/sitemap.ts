import type { MetadataRoute } from "next"
import { absoluteUrl } from "@prismedis/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/auth", "/register", "/login"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
