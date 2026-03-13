'use client'

import { useState } from 'react'
import Image, { type StaticImageData } from 'next/image'
import { Play } from 'lucide-react'

type VideoWithPreviewProps = {
  title: string
  videoSrc: string
  previewImageSrc?: string | StaticImageData
}

export const VideoWithPreview = ({ title, videoSrc, previewImageSrc }: VideoWithPreviewProps) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false)

  if (isPlayerVisible) {
    return (
      <video
        className="max-w-[1000px] aspect-video w-full rounded-[20px] bg-black"
        controls
        preload="metadata"
        autoPlay
      >
        <source src={videoSrc} type="video/mp4" />
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Воспроизвести видео: ${title}`}
      className="group relative max-w-[1000px] aspect-video w-full overflow-hidden rounded-[20px] bg-[#d9ddd2] text-left cursor-pointer"
      onClick={() => setIsPlayerVisible(true)}
    >
      {previewImageSrc ? (
        <Image
          src={previewImageSrc}
          alt={`Предпросмотр видео: ${title}`}
          className="absolute inset-0 h-full w-full object-cover"
          fill
          sizes="(max-width: 1024px) 100vw, 1000px"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.65),_transparent_55%),linear-gradient(135deg,#d9ddd2_0%,#bcc9b1_100%)]" />
      )}

      <div className="absolute inset-0 bg-black/18 transition-colors group-hover:bg-black/26" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <span className="flex size-20 items-center justify-center rounded-full bg-white/85 text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform group-hover:scale-105 max-sm:size-16">
          <Play className="ml-1 size-8 fill-current max-sm:size-7" />
        </span>
      </div>
    </button>
  )
}
