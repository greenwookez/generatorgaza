import { cn } from '@/lib/utils'

export type SeparatorProps = {
  hr?: React.ComponentProps<'hr'>
}
export const Separator = ({ hr }: SeparatorProps) => {
  const { className, ...rest } = hr || {}
  return <hr className={cn('h-px w-full border-0 bg-border', className)} {...rest} />
}
