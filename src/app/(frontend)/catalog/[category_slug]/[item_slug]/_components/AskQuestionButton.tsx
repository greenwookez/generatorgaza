'use client'

import { Button } from '@/components/ui/button'
import { scrollToID } from '@/lib/helpers/scrollToID'
import useMaxWidth from '@/lib/hooks/useMaxWidth'

export const AskQuestionButton = () => {
  const isLess640px = useMaxWidth(640)

  const scrollToFeedbackForm = () => {
    scrollToID('feedback-form', 64)
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
