import Image from 'next/image'
import { defaultJSXConverters } from '@payloadcms/richtext-lexical/react'
import { Media } from '@/payload-types'
import { JSXConverters } from '@payloadcms/richtext-lexical/react'

export const LexicalConverters: JSXConverters = {
  ...defaultJSXConverters,
  upload: ({ node }) => {
    const { value } = node

    const { url, alt, width, height } = value as Media

    if (!value || typeof value !== 'object' || !url || !width || !height) return null

    return (
      <Image
        data-component="lexical-image"
        src={url}
        alt={alt || ''}
        width={width}
        height={height}
      />
    )
  },
}
