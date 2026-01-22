import { FeedbackForm } from './FeedbackForm'

export const Feedback = () => {
  return (
    <div
      id="feedback-form"
      className="p-10 flex gap-x-20 gap-y-10 bg-accent rounded-[20px] max-lg:flex-col max-sm:py-5 max-sm:px-4 max-sm:gap-y-5"
    >
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
      <FeedbackForm />
    </div>
  )
}
