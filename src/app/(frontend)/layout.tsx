import React from 'react'
import { Manrope } from 'next/font/google'
import { Header } from '@/app/(frontend)/_components/Header/Header'
import { Footer } from './_components/Footer'
import { Feedback } from './_components/Feedback/Feedback'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { CookiePopup } from './_components/CookiePopup'
import './styles.css'
import './_lexical/lexical.css'

// Перед релизом:
// [ ]: Формы обратной связи: успешный и ошибочный UI после отправки, отдельная форма в Sheet
// [ ]: Контакты: фото, тексты и адаптация под мобильные
// -----------------------------------------------------
// [ ]: Главная: видео на Rutube или self-hosted
// [ ]: Политика обработки персональных данных - изучить как лучше
// [ ]: Проверить все ссылки (искать на href)
// [ ]: Подключить домен, настроить 307 редиректы со старого сайта
// [ ]: Перепроверить метаданные, SEO, подключить аналитику в Яндексе
// [ ]: Подключить корпоративную почту
// На потом:
// [ ]: Поиск по сайту
// [ ]: Создать карточки на Яндекс.Картах и обязательно добавить ссылки на сайт
// [ ]: Адреса и конкакты в Payload CMS
// [ ]: Метаданные в Global в Payload CMS

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

export const revalidate = 60

export const ContainerClass = 'flex justify-center px-20 max-lg:px-10 max-sm:px-4'
export const InsideContainerClass = 'max-w-335 w-full'
export const ContentClass = 'flex flex-col gap-y-12 pt-7.5 pb-22.5 max-lg:pb-15 max-lg:gap-y-9'

const font = Manrope({
  subsets: ['latin'],
  display: 'swap',
})

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
