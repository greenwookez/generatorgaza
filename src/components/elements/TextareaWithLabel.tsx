import { cn } from '@/lib/utils'
import { Textarea } from '../ui/textarea'

type TextareaWithLabelProps = React.ComponentProps<'textarea'> & {
  label: string
  labelClassName?: string
}

export const TextareaWithLabel = (props: TextareaWithLabelProps) => {
  const { label, labelClassName, ...textareaProps } = props

  return (
    <div className="flex flex-col gap-y-[0.375rem]">
      <label className={cn('text-[0.875rem] font-medium leading-5', labelClassName)}>{label}</label>
      <Textarea {...textareaProps} />
    </div>
  )
}
