import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        // eslint-disable-next-line react/no-unknown-property
        tw="flex items-center justify-center bg-black text-[1.5rem] leading-8 text-white"
        style={{ ...size }}
      >
        P
      </div>
    ),
    { ...size },
  )
}
