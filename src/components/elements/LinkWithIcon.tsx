import { cn } from '@/lib/utils'
import { LucideIcon, ArrowUpRight } from 'lucide-react'

export type LinkWithIconProps = React.ComponentProps<'a'> & {
  icon?: LucideIcon
}

export const LinkWithIcon = ({ icon: Icon, className, children, ...rest }: LinkWithIconProps) => {
  return (
    <a className={cn('flex gap-x-2 items-center group', className)} {...rest}>
      {Icon && (
        <div className="rounded-full shrink-0 size-12 bg-accent flex items-center justify-center">
          <Icon className="size-6" />
        </div>
      )}
      <span className="text-[1.125rem] font-medium leading-[1.5rem] ml-2 group-hover:underline">
        {children}
      </span>
      <ArrowUpRight className="size-5" />
    </a>
  )
}
