'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useMask } from '@react-input/mask'
import { InputWithLabel } from '@/components/elements/InputWithLabel'
import { TextareaWithLabel } from '@/components/elements/TextareaWithLabel'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CreateFeedback } from '@/runtime/feedback/CreateFeedback'
import useSimpleError from '@/lib/hooks/useSimpleError'
import { cn } from '@/lib/utils'
import { isValidEmail } from '@/lib/helpers/isValidEmail'
import { isValidPhoneNumber } from '@/lib/helpers/isValidPhoneNumber'

type FormState = {
  name: string
  phone: string
  email: string
  message: string
  consent: boolean
}

const phoneMaskOptions = {
  mask: '+7 (___) ___-__-__',
  replacement: { _: /\d/ },
  showMask: true,
}

export const FeedbackForm = () => {
  const [hasErr, setErr] = useSimpleError(['name', 'phone', 'email', 'message', 'consent'])
  const [formState, setFormState] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  })

  const inputRef = useMask(phoneMaskOptions)

  const validateForm = () => {
    let isValid = true

    if (!formState.consent) {
      setErr('consent', true)
      isValid = false
    }

    if (formState.name.trim() === '') {
      setErr('name', true)
      isValid = false
    }

    if (formState.phone.trim() === '' || !isValidPhoneNumber(formState.phone)) {
      setErr('phone', true)
      isValid = false
    }

    if (formState.email.trim() === '' || !isValidEmail(formState.email)) {
      setErr('email', true)
      isValid = false
    }

    if (formState.message.trim() === '') {
      setErr('message', true)
      isValid = false
    }

    return isValid
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // TODO: UI for successfull/unsuccessfull submission
    CreateFeedback({
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      message: formState.message,
      page_url: window.location.href,
    })
  }

  const onChange =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (field in formState) {
        setErr(field, false)

        setFormState({
          ...formState,
          [field]: e.target.value,
        })
      }
    }

  const onConsentChange = (checked: boolean) => {
    setErr('consent', false)
    setFormState({
      ...formState,
      consent: checked,
    })
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
        value={formState.name}
        className={hasErr('name') ? 'border-destructive text-destructive' : undefined}
        labelClassName={hasErr('name') ? 'text-destructive' : undefined}
      />
      <div className="flex gap-4 max-md:flex-col">
        <InputWithLabel
          ref={inputRef}
          placeholder={phoneMaskOptions.mask}
          containerClassName="flex-1"
          label="Контактный телефон"
          type="tel"
          autoComplete="tel"
          onChange={onChange('phone')}
          value={formState.phone}
          className={hasErr('phone') ? 'border-destructive text-destructive' : undefined}
          labelClassName={hasErr('phone') ? 'text-destructive' : undefined}
        />
        <InputWithLabel
          containerClassName="flex-1"
          label="Email"
          autoComplete="email"
          onChange={onChange('email')}
          value={formState.email}
          className={hasErr('email') ? 'border-destructive text-destructive' : undefined}
          labelClassName={hasErr('email') ? 'text-destructive' : undefined}
        />
      </div>
      <TextareaWithLabel
        label="Сообщение"
        placeholder="Введите свой вопрос"
        onChange={onChange('message')}
        value={formState.message}
        className={cn(
          'resize-none h-[80px]',
          hasErr('message')
            ? 'border-destructive text-destructive placeholder:text-destructive'
            : undefined,
        )}
        labelClassName={hasErr('message') ? 'text-destructive' : undefined}
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 cursor-pointer">
          <Checkbox
            className={cn('cursor-pointer shrink-0', hasErr('consent') && 'border-destructive')}
            id="feedback-consent-checkbox"
            name="feedback-consent-checkbox"
            checked={formState.consent}
            onCheckedChange={onConsentChange}
          />
          <Label
            className={cn(
              'cursor-pointer block text-[0.75rem] font-medium leading-4 text-muted-foreground',
              hasErr('consent') && 'text-destructive',
            )}
            htmlFor="feedback-consent-checkbox"
          >
            {' '}
            Я согласен с{' '}
            <Link href="#" className="underline hover:no-underline" prefetch>
              Политикой обработки персональных данных
            </Link>
          </Label>
        </div>
        <Button type="submit">Отправить</Button>
      </div>
    </form>
  )
}
