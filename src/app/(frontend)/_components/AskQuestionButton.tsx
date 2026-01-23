'use client'

import { Button } from '@/components/ui/button'

export const AskQuestionButton = () => {
  const scrollToFeedbackForm = () => {
    const form = document.getElementById('feedback-form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  return (
    <Button variant="outline" size={'lg'} onClick={scrollToFeedbackForm}>
      Задать вопрос
    </Button>
  )
}
