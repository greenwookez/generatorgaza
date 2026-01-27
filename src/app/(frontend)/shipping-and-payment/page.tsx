import Image from 'next/image'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { ContentClass } from '../layout'
import { cn } from '@/lib/utils'
import ScaniaImg from '@/assets/images/scania.png'

export default function ShippingAndPaymentPage() {
  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'Доставка и оплата' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">Доставка и оплата</h1>
        <span className="text-[1.125rem] leading-[160%]">
          В нашей компании есть 70 единиц транспорта, и мы осуществляем доставку товара по всей
          России.
        </span>
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-[1.5rem] font-medium leading-[160%]">Способы получения</h2>
          <div className="flex gap-6 max-lg:flex-col">
            <div className="flex flex-col gap-y-3">
              <div className="py-3 px-5 rounded-[12px] bg-accent2 flex flex-col gap-y-1">
                <h3 className="text-[1.125rem] font-semibold leading-[160%]">Самовывоз</h3>
                <p className="leading-[160%]">
                  В Москве, возможно получение товар на месте.
                  <br />
                  Уточняйте наличие товара заранее – интересующая Вас позиция может отсутствовать
                  или уже быть забронирована
                </p>
              </div>
              <div className="py-3 px-5 rounded-[12px] bg-accent2 flex flex-col gap-y-1">
                <h3 className="text-[1.125rem] font-semibold leading-[160%]">Доставка до адреса</h3>
                <p className="leading-[160%]">
                  В данный момент, собственная служба доставки функционирует в Москве
                </p>
              </div>
              <div className="py-3 px-5 rounded-[12px] bg-accent2 flex flex-col gap-y-1">
                <h3 className="text-[1.125rem] font-semibold leading-[160%]">Самовывоз</h3>
                <p className="leading-[160%]">
                  Доставка по всей России. Доставка осуществляется из Москвы, по поводу стоимости
                  доставки Вы можете уточнить по телефону в Москве 
                  <a className="underline" type="tel" href="tel:+74991887356">
                    +7 (499) 188-73-56
                  </a>
                   либо в Протвино по телефону 
                  <a className="underline" type="tel" href="tel:+74967755955">
                    +7 (4967) 75-59-55
                  </a>
                </p>
              </div>
            </div>
            <div className="max-md:h-[350px] max-lg:h-[450px] relative w-full">
              <Image
                alt={'Scania'}
                src={ScaniaImg}
                className="object-cover max-h-[450px] rounded-[12px]"
                fill
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <h2 className="text-[1.5rem] font-medium leading-[160%]">Оплата</h2>
        <ul className="text-[1.125rem] leading-[170%] list-disc marker:text-muted-foreground pl-5">
          <li>Цены на наш товар включают все налоги, в том числе и НДС</li>
          <li>Оплата заказов производится безналичным путем на основании выставленных счетов</li>
          <li>
            Счета выставляются Заказчику после согласования и уточнения всех деталей заказа и его
            доставки
          </li>
          <li>
            Оригиналы документов (счет, накладная, счет-фактура, ТТН) передаются Заказчику
            одновременно с заказом
          </li>
          <li>Основная форма оплаты - 100% предоплата</li>
          <li>Для постоянных клиентов порядок оплаты устанавливается индивидуально</li>
          <li>
            Для покупателей, заключивших долгосрочные договора, предоставляются дополнительные
            скидки
          </li>
        </ul>
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}
