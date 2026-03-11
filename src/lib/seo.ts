import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'http://localhost:5200'
const SITE_NAME = 'АО «Опытно-технологический завод»'
const DEFAULT_OG_IMAGE_PATH = '/web-app-manifest-512x512.png'

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '')

export const getSiteUrl = () => {
  const raw = process.env.SITE_URL ?? DEFAULT_SITE_URL

  try {
    return new URL(trimTrailingSlash(raw))
  } catch {
    throw new Error(`Invalid SITE_URL: "${raw}"`)
  }
}

export const getAbsoluteUrl = (path: string = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  return new URL(normalizedPath, getSiteUrl()).toString()
}

type PageMetadataInput = {
  title: string
  description: string
  path: string
  keywords?: string | string[]
  noIndex?: boolean
}

export const buildPageMetadata = ({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataInput): Metadata => {
  const absoluteUrl = getAbsoluteUrl(path)
  const ogImage = getAbsoluteUrl(DEFAULT_OG_IMAGE_PATH)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'ru_RU',
      images: [
        {
          url: ogImage,
          width: 512,
          height: 512,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : undefined,
  }
}

export const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
