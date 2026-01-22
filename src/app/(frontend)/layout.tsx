import React from 'react'
import { Manrope } from 'next/font/google'
import { Header } from '@/app/(frontend)/_components/Header/Header'

import './styles.css'
import { Footer } from './_components/Footer'
import { Feedback } from './_components/Feedback'
import { cn } from '@/lib/utils'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

// TODO: Обсудить Sheet вместо лайбокса (dialog)
// TODO: Проверить все ссылки (искать на href)

// Блочит релиз
// TODO: 404 страница
// TODO: Поиск
// TODO: Интеграция Jivo: Формы обратной связи и звонка, лайтбоксы
// TODO: О предприятии: фото, тексты и адаптация под мобильные
// TODO: Сертификаты: фото, тексты и адаптация под мобильные
// TODO: Доставка и оплата: фото, тексты и адаптация под мобильные
// TODO: Контакты: фото, тексты и адаптация под мобильные
// TODO: Футер - брать категории каталога из Payload CMS
// TODO: Политика обработки персональных данных - изучить как лучше
// TODO: Главная: фото, тексты, подвязать каталог из Payload CMS
// TODO: Главная: видео на Rutube или self-hosted
// TODO: Каталог: адаптация под мобильные
// TODO: Каталог: заполнить
// TODO: Подключить домен, настроить 307 редиректы со старого сайта
// TODO: База по локальной сети
// TODO: Перепроверить доступы в Payload CMS

// Не блочит релиз
// TODO: Адреса и конкакты в Payload CMS
// TODO: Метаданные в Global в Payload CMS
export const metadata = {
  title:
    'Производство генераторов газа, воздухоразделительных установок, газа в баллонах по оптимальным ценам | АО «Опытно-технологический завод»',
  description:
    'АО «Опытно-технологический завод» осуществляет производство генераторов газа, воздухо-разделительных установок, газа в баллонах по оптимальным ценам. Ждем Ваших звонков по телефонам в Москве и Протвино.',
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

export const ContainerClass = 'flex justify-center px-20 max-lg:px-10 max-sm:px-4'
export const InsideContainerClass = 'max-w-335 w-full'
export const ContentClass = 'flex flex-col gap-y-12 pt-7.5 pb-22.5 max-lg:pb-15 max-lg:gap-y-9'

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="en"
      className={cn(
        font.className,
        'max-[380px]:w-[380px] max-[380px]:mx-auto max-[380px]:origin-top max-[380px]:scale-[clamp(0.75,calc(100vw/380),1)]',
      )}
    >
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
