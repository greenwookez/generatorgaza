'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Link from 'next/link'
import { useMask } from '@react-input/mask'
import { InputWithLabel } from '@/components/elements/InputWithLabel'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CreateCallback } from '@/runtime/callbacks/CreateCallback'
import useSimpleError from '@/lib/hooks/useSimpleError'
import { cn } from '@/lib/utils'
import { isValidPhoneNumber } from '@/lib/helpers/isValidPhoneNumber'
import {
  CreateCallbackOutputInvalidParams,
  CreateCallbackOutputOK,
  CreateCallbackOutputTooManyRequests,
} from '@/runtime/callbacks/model'
import { toast } from 'sonner'

type FormState = {
  name: string
  phone: string
  consent: boolean
}

const emptyFormState: FormState = {
  name: '',
  phone: '',
  consent: false,
}

const phoneMaskOptions = {
  mask: '+7 (___) ___-__-__',
  replacement: { _: /\d/ },
  showMask: true,
}

export const CallbackForm = () => {
  const [hasErr, setErr] = useSimpleError(['name', 'phone', 'email', 'message', 'consent'])
  const [formState, setFormState] = useState<FormState>(emptyFormState)

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

    return isValid
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const status = await CreateCallback({
      name: formState.name,
      phone: formState.phone,
      page_url: window.location.href,
    })

    if (status === CreateCallbackOutputOK) {
      toast.success('Успешно отправлено', {
        duration: 3000,
        description: 'Спасибо за вопрос! Мы свяжемся с вами в ближайшее время.',
        position: 'top-center',
      })
      setFormState(emptyFormState)
      return
    }

    if (status === CreateCallbackOutputTooManyRequests) {
      toast.warning('Слишком много сообщений', {
        duration: 3000,
        description: 'Мы заметили слишком много сообщений от вас. Пожалуйста, попробуйте позже.',
        position: 'top-center',
      })
      return
    }

    if (status === CreateCallbackOutputInvalidParams) {
      toast.info('Что-то пошло не так', {
        duration: 3000,
        description:
          'Не волнуйтесь, это на нашей стороне. Наши разработчики уже оповещены. Пожалуйста, попробуйте позже.',
        position: 'top-center',
      })
      return
    }
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
    <form onSubmit={onSubmit} className="flex flex-col gap-6 p-4">
      <InputWithLabel
        label="Ваше имя"
        autoComplete="name"
        onChange={onChange('name')}
        value={formState.name}
        className={hasErr('name') ? 'border-destructive text-destructive' : undefined}
        labelClassName={hasErr('name') ? 'text-destructive' : undefined}
      />
      <InputWithLabel
        ref={inputRef}
        placeholder={phoneMaskOptions.mask}
        containerClassName="flex-1"
        label="Контактный телефон"
        type="tel"
        autoComplete="tel"
        onChange={onChange('phone')}
        value={formState.phone}
        className={
          hasErr('phone')
            ? 'border-destructive placeholder:text-destructive text-destructive'
            : undefined
        }
        labelClassName={hasErr('phone') ? 'text-destructive' : undefined}
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 cursor-pointer">
          <Checkbox
            className={cn('cursor-pointer shrink-0', hasErr('consent') && 'border-destructive')}
            id="callback-consent-checkbox"
            name="callback-consent-checkbox"
            checked={formState.consent}
            onCheckedChange={onConsentChange}
          />
          <Label
            className={cn(
              'cursor-pointer block text-[0.75rem] font-medium leading-4 text-muted-foreground',
              hasErr('consent') && 'text-destructive',
            )}
            htmlFor="callback-consent-checkbox"
          >
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
