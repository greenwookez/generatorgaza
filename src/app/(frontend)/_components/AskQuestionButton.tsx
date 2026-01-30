'use client'

import { Button } from '@/components/ui/button'
import { scrollToID } from '@/lib/helpers/scrollToID'

export const AskQuestionButton = () => {
  const scrollToFeedbackForm = () => {
    scrollToID('feedback-form', 64)
  }
  return (
    <Button variant="outline" size={'lg'} onClick={scrollToFeedbackForm}>
      Задать вопрос
    </Button>
  )
}
