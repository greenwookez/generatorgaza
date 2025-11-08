import React from 'react'
import { Manrope } from 'next/font/google'
import { Header } from '@/app/(frontend)/_components/Header/Header'

import './styles.css'
import { Footer } from './_components/Footer'
import { Feedback } from './_components/Feedback'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

// TODO: Обсудить Sheet вместо лайбокса (dialog)
// TODO: Проверить все ссылки (искать на href)

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

export const ContainerClass = 'flex justify-center px-20 max-lg:px-10 max-sm:px-6'
export const InsideContainerClass = 'max-w-335 w-full'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={font.className}>
      <body>
        <Header />
        <main className={ContainerClass}>
          <section className={InsideContainerClass}>
            {children}
            <Feedback />
          </section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
