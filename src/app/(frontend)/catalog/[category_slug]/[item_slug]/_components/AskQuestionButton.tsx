'use client'

import { Button } from '@/components/ui/button'
import useMaxWidth from '@/lib/useMaxWidth'

export const AskQuestionButton = () => {
  const isLess640px = useMaxWidth(640)

  const scrollToFeedbackForm = () => {
    const form = document.getElementById('feedback-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Button
      className="grow"
      variant="outline"
      size={isLess640px ? 'default' : 'lg'}
      onClick={scrollToFeedbackForm}
    >
      Задать вопрос
    </Button>
  )
}
