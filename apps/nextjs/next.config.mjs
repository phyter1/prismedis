// Importing env files here to validate on build
import "./src/env.mjs"
import "@prismedis/auth/env"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@icons-pack/react-simple-icons"],
  },
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: [
    "@prismedis/api",
    "@prismedis/auth",
    "@prismedis/db",
    "@prismedis/ui",
    "@prismedis/validators",
    "@prismedis/locales",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
}

export default config
