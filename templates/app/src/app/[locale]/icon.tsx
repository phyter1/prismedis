import { Oxanium } from "next/font/google"
import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

const oxanium = Oxanium({
  subsets: ["latin"],
})

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        // eslint-disable-next-line react/no-unknown-property
        tw={
          oxanium.className +
          " flex items-center justify-center bg-black text-[24px] leading-8 text-white rounded-lg font-bold"
        }
        style={{
          width: 32,
          height: 32,
        }}
      >
        PD
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
