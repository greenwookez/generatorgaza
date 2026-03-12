import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Header } from '@/app/(frontend)/_components/Header/Header'
import { Footer } from './_components/Footer'
import { Feedback } from './_components/Feedback/Feedback'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { CookiePopup } from './_components/CookiePopup'
import { JsonLd } from './_components/Seo/JsonLd'
import { YandexMetrika } from './_components/YandexMetrika'
import { getAbsoluteUrl, getSiteUrl } from '@/lib/seo'
import './styles.css'
import './_lexical/lexical.css'

// Перед релизом:
// [ ]: Подключить корпоративную почту
// На потом:
// [ ]: Поиск по сайту
// [ ]: Создать карточки на Яндекс.Картах и обязательно добавить ссылки на сайт
// [ ]: Адреса и контакты в Payload CMS

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default:
      'Производство генераторов газа, воздухоразделительных установок, газа в баллонах по оптимальным ценам | АО «Опытно-технологический завод»',
    template: '%s | АО «Опытно-технологический завод»',
  },
  description:
    'АО «Опытно-технологический завод» осуществляет производство генераторов газа, воздухо-разделительных установок, газа в баллонах по оптимальным ценам. Ждем Ваших звонков по телефонам в Москве и Протвино.',
  keywords: [
    'АО «Опытно-технологический завод»',
    'производство генераторов газа',
    'газ в баллонах',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'АО «Опытно-технологический завод»',
    description:
      'Производство генераторов газа, воздухо-разделительных установок и технических газов.',
    url: getAbsoluteUrl('/'),
    siteName: 'АО «Опытно-технологический завод»',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: getAbsoluteUrl('/web-app-manifest-512x512.png'),
        width: 512,
        height: 512,
        alt: 'АО «Опытно-технологический завод»',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'АО «Опытно-технологический завод»',
    description:
      'Производство генераторов газа, воздухо-разделительных установок и технических газов.',
    images: [getAbsoluteUrl('/web-app-manifest-512x512.png')],
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  other: {
    'apple-mobile-web-app-title': 'АО «ОТЗ»',
  },
}

export const revalidate = 60

export const ContainerClass = 'flex justify-center px-20 max-lg:px-10 max-sm:px-4'
export const InsideContainerClass = 'max-w-335 w-full'
export const ContentClass = 'flex flex-col gap-y-12 pt-7.5 pb-22.5 max-lg:pb-15 max-lg:gap-y-9'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'АО «Опытно-технологический завод»',
  url: getAbsoluteUrl('/'),
  logo: getAbsoluteUrl('/web-app-manifest-512x512.png'),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+7-499-188-73-56',
      areaServed: 'RU',
      availableLanguage: 'ru',
    },
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: '+7-4967-74-59-55',
      areaServed: 'RU',
      availableLanguage: 'ru',
    },
  ],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="ru"
      className={cn(
        font.className,
        'max-[380px]:w-[380px] max-[380px]:mx-auto max-[380px]:origin-top max-[380px]:scale-[clamp(0.75,calc(100vw/380),1)]',
      )}
    >
      <body>
        <Suspense fallback={null}>
          <YandexMetrika />
        </Suspense>
        <JsonLd data={organizationJsonLd} />
        <CookiePopup />
        <Header />
        <main className={ContainerClass}>
          <section className={InsideContainerClass}>
            {children}
            <Feedback />
          </section>
        </main>
        <Footer />
        <Toaster theme="light" className="border-border2" />
      </body>
    </html>
  )
}
