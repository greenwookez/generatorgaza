import { Textarea } from '../ui/textarea'

type TextareaWithLabelProps = React.ComponentProps<'textarea'> & {
  label: string
}

export const TextareaWithLabel = (props: TextareaWithLabelProps) => {
  const { label, ...textareaProps } = props

  return (
    <div className="flex flex-col gap-y-[0.375rem]">
      <label className="text-[0.875rem] font-medium leading-5">{label}</label>
      <Textarea {...textareaProps} />
    </div>
  )
}
