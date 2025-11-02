import React from 'react'
import { Inter } from 'next/font/google'
import { Header } from '@/app/(frontend)/_components/Header'

import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

// TODO: Уточнить информацию
export const metadata = {
  title:
    'Производство генераторов газа, воздухоразделительных установок, газа в баллонах по оптимальным ценам | АО «Опытно-технологический завод»',
  description:
    'АО «Опытно-технологический завод» осуществляет производство генераторов газа, воздухо-разделительных установок, газа в баллонах по оптимальным ценам. Ждем Ваших звонков по телефонам в Москве, Калуге и Протвино.',
  keywords: 'АО «Опытно-технологический завод»: общая информация',
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

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
