import { cn } from '@/lib/utils'
import { LucideIcon, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export type LinkWithIconProps = React.ComponentProps<typeof Link> & {
  icon?: LucideIcon
}

export const LinkWithIcon = ({ icon: Icon, className, children, ...rest }: LinkWithIconProps) => {
  return (
    <Link className={cn('flex gap-x-2 items-center group', className)} {...rest}>
      {Icon && (
        <div className="rounded-full shrink-0 size-12 bg-accent flex items-center justify-center text-secondary-foreground">
          <Icon className="size-6" />
        </div>
      )}
      <span className="text-[1.125rem] font-medium leading-[1.5rem] ml-2 group-hover:underline max-sm:text-[1rem] text-secondary-foreground">
        {children}
      </span>
      <ArrowUpRight className="size-5 shrink-0 text-secondary-foreground" />
    </Link>
  )
}
