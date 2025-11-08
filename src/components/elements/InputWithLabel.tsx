import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

type InputWithLabelProps = React.ComponentProps<'input'> & {
  label: string
  containerClassName?: string
}

export const InputWithLabel = (props: InputWithLabelProps) => {
  const { label, containerClassName, ...inputProps } = props

  return (
    <div className={cn('flex flex-col gap-y-[0.375rem]', containerClassName)}>
      <label className="text-[0.875rem] font-medium leading-5">{label}</label>
      <Input {...inputProps} />
    </div>
  )
}
