import { InputWithLabel } from '@/components/elements/InputWithLabel'
import { TextareaWithLabel } from '@/components/elements/TextareaWithLabel'
import { Button } from '@/components/ui/button'

// FIXME: Переписать компоненты формы на shadcn field (новый компонент)
export const Feedback = () => {
  return (
    <div className="p-10 flex gap-x-20 gap-y-10 bg-accent rounded-[20px] max-lg:flex-col">
      <div className="w-full">
        <div className=" mb-3 font-medium text-muted-foreground leading-[110%]">Есть вопросы?</div>
        <h3 className="mb-7 text-[1.75rem] leading-[110%]">Свяжитесь с нами!</h3>
        <p className="text-[1.125rem] leading-[140%]">
          Напишите, пожалуйста, Ваш вопрос, имя, контактный телефон и электронную почту.
          <br />
          <br />
          Наш специалист свяжется с Вами в течение 15 минут.
        </p>
      </div>
      <form className="w-full py-4 px-6 rounded-[12px] bg-background border-[1px] border-border2 flex flex-col gap-y-4">
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
          <div className="text-[0.75rem] font-medium leading-5 text-muted-foreground">
            Нажимая на кнопку, я соглашаюсь с{' '}
            <a href="#" className="underline">
              Политикой обработки персональных данных
            </a>
          </div>
          <Button type="submit">Отправить</Button>
        </div>
      </form>
    </div>
  )
}
