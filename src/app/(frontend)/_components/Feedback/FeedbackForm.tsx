'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { InputWithLabel } from '@/components/elements/InputWithLabel'
import { TextareaWithLabel } from '@/components/elements/TextareaWithLabel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreateFeedback } from '@/actions/CreateFeedback'

type FormData = {
  name: string
  phone: string
  email: string
  message: string
}

export const FeedbackForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    CreateFeedback({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      page_url: window.location.href,
    })
  }

  const onChange =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field in formData) {
        setFormData({
          ...formData,
          [field]: e.target.value,
        })
      }
    }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full py-4 px-6 rounded-[12px] bg-background border border-border2 flex flex-col gap-y-4 max-sm:py-4 max-sm:px-4"
    >
      <InputWithLabel
        label="Ваше имя"
        autoComplete="name"
        onChange={onChange('name')}
        value={formData.name}
      />
      <div className="flex gap-4 max-md:flex-col">
        <InputWithLabel
          containerClassName="flex-1"
          label="Контактный телефон"
          type="tel"
          autoComplete="tel"
          onChange={onChange('phone')}
          value={formData.phone}
        />
        <InputWithLabel
          containerClassName="flex-1"
          label="Email"
          type="email"
          autoComplete="email"
          onChange={onChange('email')}
          value={formData.email}
        />
      </div>
      <TextareaWithLabel
        className="resize-none h-[80px]"
        label="Сообщение"
        placeholder="Введите свой вопрос"
        onChange={onChange('message')}
        value={formData.message}
      />
      <div className="flex flex-col gap-y-2">
        <div className="text-[0.75rem] font-medium leading-4 text-muted-foreground">
          Нажимая на кнопку, я соглашаюсь с{' '}
          <Link href="#" className="underline" prefetch>
            Политикой обработки персональных данных
          </Link>
        </div>
        <Button type="submit">Отправить</Button>
      </div>
    </form>
  )
}
