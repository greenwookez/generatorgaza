import Image from 'next/image'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { ContentClass } from '../layout'
import { cn } from '@/lib/utils'

export default function IndustrialGasPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'Доставка и оплата' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Доставка и оплата</h1>
        <span className="text-[1.25rem] leading-[160%]">
          В нашей компании есть 70 единиц транспорта, и мы осуществляем доставку товара по всей
          России.
        </span>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-[1.5rem] font-medium leading-[160%]">Способы получения</h2>
          <div className="py-3 px-5 rounded-[12px] bg-accent2 flex flex-col gap-y-1">
            <h3 className="text-[1.375rem] font-semibold leading-[160%]">Самовывоз</h3>
            <p className="text-[1.25rem] leading-[160%]">
              В Москве, возможно получение товар на месте. Уточняйте наличие товара заранее –
              интересующая Вас позиция может отсутствовать или уже быть забронирована
            </p>
          </div>
          <div className="py-3 px-5 rounded-[12px] bg-accent2 flex flex-col gap-y-1">
            <h3 className="text-[1.375rem] font-semibold leading-[160%]">Доставка до адреса</h3>
            <p className="text-[1.25rem] leading-[160%]">
              В данный момент, собственная служба доставки функционирует в Москве
            </p>
          </div>
          <div className="py-3 px-5 rounded-[12px] bg-accent2 flex flex-col gap-y-1">
            <h3 className="text-[1.375rem] font-semibold leading-[160%]">Самовывоз</h3>
            <p className="text-[1.25rem] leading-[160%]">
              Доставка по всей России Доставка осуществляется из Москвы, по поводу стоимости
              доставки Вы можете уточнить по телефону в Москве 
              <a className="hover:underline" type="tel" href="tel:+74991887356">
                +7 (499) 188-73-56
              </a>
               либо в Протвино по телефону 
              <a className="hover:underline" type="tel" href="tel:+74967755955">
                +7 (4967) 75-59-55
              </a>
            </p>
          </div>
        </div>
        <Image
          alt={'Скания'}
          src="https://placehold.co/900x680.png"
          className="object-cover max-h-[340px] rounded-[16px]"
          width={450}
          height={340}
        />
      </div>
      <div className="flex flex-col gap-y-3">
        <h2 className="text-[1.5rem] font-medium leading-[160%]">Оплата</h2>
        <p className="text-[1.25rem] leading-[200%]">
          Цены на наш товар включают все налоги, в том числе и НДС.
          <br />
          Оплата заказов производится безналичным путем на основании выставленных счетов.
          <br />
          Счета выставляются Заказчику после согласования и уточнения всех деталей заказа и его
          доставки.
          <br />
          Оригиналы документов (счет, накладная, счет-фактура, ТТН) передаются Заказчику
          одновременно с заказом.
          <br />
          Основная форма оплаты - 100% предоплата.
          <br />
          Для постоянных клиентов порядок оплаты устанавливается индивидуально.
          <br />
          Для покупателей, заключивших долгосрочные договора, предоставляются дополнительные скидки.
        </p>
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}
