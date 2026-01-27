import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { TextWithLabel } from '@/components/elements/TextWithLabel'
import { cn } from '@/lib/utils'
import { ContentClass } from '../layout'

export default async function ContactUsPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'Контакты' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Контакты</h1>
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-10">
            <ContactUsBlockWithMap
              title="Москва"
              telephone="+7 (499) 188-73-56"
              addresses={[
                {
                  label: 'Адрес',
                  address: '129337, г. Москва, ул. Красная сосна, д. 24, cтр. 1',
                },
              ]}
            />
            <Separator />
            <ContactUsBlockWithMap
              title="Протвино"
              telephone="+7 (4967) 74-59-55"
              addresses={[
                {
                  label: 'Адрес газового производства',
                  address: '142280, Московская обл., г. Протвино, ул. Железнодорожная, д. 1',
                },
                {
                  label: 'Адрес производства оборудования',
                  address:
                    '142280, Московская обл., г. Протвино, ул. Индустриальный проезд, д. 4 (проходная №2)',
                },
              ]}
            />
            <Separator />
          </div>
          <div>
            <h2 className="text-[1.5rem] leading-[160%] font-medium mb-3">Контактные телефоны</h2>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-y-2">
                <h3 className="text-[1.125rem] font-semibold leading-[160%]">
                  Генеральный директор (секретарь)
                </h3>
                <TextWithLabel
                  label="Телефон"
                  text="+7 (4967) 74-59-55"
                  a={{ href: 'tel:+74967745595' }}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <h3 className="text-[1.125rem] font-semibold leading-[160%]">Главный инженер</h3>
                <TextWithLabel
                  label="Телефон"
                  text="+7 (4967) 74-59-55"
                  a={{ href: 'tel:+74967745595' }}
                />
              </div>
              <div>
                <h3 className="text-[1.125rem] font-semibold leading-[160%] mb-2">Отделы</h3>
                <div className="flex flex-col gap-y-4">
                  <TextWithLabel
                    label="Бухглатерия"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                  <TextWithLabel
                    label="Отдел продаж"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                  <TextWithLabel
                    label="Отдел сбыта"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                  <TextWithLabel
                    label="Отдел материально-технического снабжения"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                  <TextWithLabel
                    label="Отдел подготовки производства"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                  <TextWithLabel
                    label="Отдел кадров"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                  <TextWithLabel
                    label="Магазин газосварочного оборудования"
                    text="+7 (4967) 74-59-55"
                    a={{ href: 'tel:+74967745595' }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[1.5rem] leading-[160%] font-medium mb-3">Электронная почта</h2>
            <div className="flex flex-col gap-y-4">
              <TextWithLabel
                label="Секретарь"
                text="otz-gaz@yandex.ru"
                a={{ href: 'mailto:otz-gaz@yandex.ru' }}
              />
              <TextWithLabel
                label="Азотные и кислородные установки"
                text="6818834@mail.ru"
                a={{ href: 'mailto:6818834@mail.ru' }}
              />
              <TextWithLabel
                label="Технические газы"
                text="oooetin@yandex.ru"
                a={{ href: 'mailto:oooetin@yandex.ru' }}
              />
              {/* TODO: Спросить у папы про этин */}
              <TextWithLabel
                label="Бухгалтерия"
                text="otz-buh@yandex.ru"
                a={{ href: 'mailto:otz-buh@yandex.ru' }}
              />
            </div>
          </div>
          <Separator />
          <PopularLinks />
        </div>
      </div>
    </div>
  )
}

type ContactUsBlockWithMapAddress = {
  label: string
  address: string
}

type ContactUsBlockWithMapProps = {
  title: string
  addresses: ContactUsBlockWithMapAddress[]
  telephone: string
}

const ContactUsBlockWithMap = ({ title, addresses, telephone }: ContactUsBlockWithMapProps) => {
  return (
    <div className="flex gap-x-10">
      <div className="max-w-[520px] grow-1 flex flex-col gap-y-4">
        <h2 className="text-[1.375rem] font-semibold leading-[140%]">{title}</h2>
        {addresses.map((address, index) => (
          <TextWithLabel
            key={index}
            label={address.label}
            text={address.address}
            span={{ className: 'text-[1.125rem] text-secondary-foreground font-medium' }}
          />
        ))}
        <TextWithLabel
          label="Телефон"
          text={telephone}
          a={{ href: `tel:${telephone.replace(/[^+\d]/g, '')}` }}
        />
        <TextWithLabel
          label="Режим работы"
          text={
            <>
              Пн-Пт: 08:00 - 17:00
              <br />
              Сб-Вс: Выходные
            </>
          }
          span={{ className: 'text-[1rem] leading-[140%] text-foreground' }}
        />
      </div>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A7fee0fd8215b1756edcc141245a766a52e0f6a01090bfe6d5b3c1a5e5a342385&amp;source=constructor"
        className="h-87.5 w-full max-w-[800px] rounded-[8px]"
      ></iframe>
    </div>
  )
}
