import { cn } from '@/lib/utils'

type TextWithLabelProps = {
  label: React.ReactNode
  text: React.ReactNode
  containerClassName?: string
  a?: React.ComponentProps<'a'>
  span?: React.ComponentProps<'span'>
}

export const TextWithLabel = ({ label, text, containerClassName, a, span }: TextWithLabelProps) => {
  const renderText = () => {
    if (a) {
      const { className, ...props } = a
      return (
        <a
          {...props}
          className={cn(
            'text-[1.25rem] font-medium text-secondary-foreground hover:underline',
            className,
          )}
        >
          {text}
        </a>
      )
    }

    const { className, ...props } = span || {}
    return (
      <span
        {...props}
        className={cn('text-[1.25rem] font-medium text-secondary-foreground', className)}
      >
        {text}
      </span>
    )
  }

  return (
    <div className={cn('flex flex-col gap-y-[0.375rem]', containerClassName)}>
      <label className="text-[0.875rem] font-medium leading-5 text-muted-foreground">{label}</label>
      {renderText()}
    </div>
  )
}
