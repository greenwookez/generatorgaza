import { InputWithLabel } from '@/components/elements/InputWithLabel'
import { TextareaWithLabel } from '@/components/elements/TextareaWithLabel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// FIXME: Переписать компоненты формы на shadcn field (новый компонент)
export const Feedback = () => {
  return (
    <div className="p-10 flex gap-x-20 gap-y-10 bg-accent rounded-[20px] max-lg:flex-col max-sm:py-5 max-sm:px-4 max-sm:gap-y-5">
      <div className="w-full">
        <div className="mb-3 font-medium text-muted-foreground leading-[110%]">Есть вопросы?</div>
        <h3 className="mb-7 font-medium text-[1.75rem] leading-[110%] max-sm:text-[1.5rem] max-sm:mb-5">
          Свяжитесь с нами!
        </h3>
        <p className="text-[1.125rem] leading-[140%] max-sm:text-[1rem]">
          Напишите, пожалуйста, Ваш вопрос, имя, контактный телефон и электронную почту.
          <br />
          <br />
          Наш специалист свяжется с Вами в течение 15 минут.
        </p>
      </div>
      <form className="w-full py-4 px-6 rounded-[12px] bg-background border-[1px] border-border2 flex flex-col gap-y-4 max-sm:py-4 max-sm:px-4">
        <InputWithLabel label="Ваше имя" autoComplete="name" />
        <div className="flex gap-4 max-md:flex-col">
          <InputWithLabel
            containerClassName="flex-1"
            label="Контактный телефон"
            type="tel"
            autoComplete="tel"
          />
          <InputWithLabel
            containerClassName="flex-1"
            label="Email"
            type="email"
            autoComplete="email"
          />
        </div>
        <TextareaWithLabel
          className="resize-none h-[80px]"
          label="Сообщение"
          placeholder="Введите свой вопрос"
        />
        <div className="flex flex-col gap-y-2">
          <div className="text-[0.75rem] font-medium leading-4 text-muted-foreground">
            Нажимая на кнопку, я соглашаюсь с{' '}
            <Link href="#" className="underline">
              Политикой обработки персональных данных
            </Link>
          </div>
          <Button type="submit">Отправить</Button>
        </div>
      </form>
    </div>
  )
}
