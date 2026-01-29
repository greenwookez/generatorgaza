'use client'

import useMaxWidth from '@/lib/hooks/useMaxWidth'
import { RequestCallbackButton } from '@/app/(frontend)/_components/Callback/RequestCallbackButton'

export const MakeInquiryButton = () => {
  const isLess640px = useMaxWidth(640)

  return (
    <RequestCallbackButton className="grow" size={isLess640px ? 'default' : 'lg'}>
      Подать заявку
    </RequestCallbackButton>
  )
}
