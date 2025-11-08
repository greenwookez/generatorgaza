import { Separator } from '@/components/elements/Separator'
import { TextWithLabel } from '@/components/elements/TextWithLabel'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export const ConnectPopover = ({ children }: React.PropsWithChildren) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-58.5 p-6 flex flex-col gap-y-5 rounded-[16px]">
        <TextWithLabel
          label="Отдел продаж"
          text="+7 (916) 681-88-34"
          a={{ href: 'tel:+79166818834' }}
        />
        <TextWithLabel
          label="Протвино"
          text="+7 (4967) 74-59-55"
          a={{ href: 'tel:+74967459555' }}
        />
        <TextWithLabel label="Москва" text="+7 (916) 681-88-34" a={{ href: 'tel:+79166818834' }} />
        <TextWithLabel label="Калуга" text="+7 (916) 681-88-34" a={{ href: 'tel:+79166818834' }} />
        <Separator />
        <TextWithLabel
          label="Email"
          text="otz-gaz@yandex.ru"
          a={{ href: 'mailto:otz-gaz@yandex.ru' }}
        />
        <Separator />
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
      </PopoverContent>
    </Popover>
  )
}
