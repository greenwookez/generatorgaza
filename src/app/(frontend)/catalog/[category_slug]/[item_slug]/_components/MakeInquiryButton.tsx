'use client'

import { Button } from '@/components/ui/button'
import useMaxWidth from '@/lib/useMaxWidth'

export const MakeInquiryButton = () => {
  const isLess640px = useMaxWidth(640)

  const scrollToFeedbackForm = () => {
    const form = document.getElementById('feedback-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  return (
    <Button className="grow" size={isLess640px ? 'default' : 'lg'} onClick={scrollToFeedbackForm}>
      Подать заявку
    </Button>
  )
}
