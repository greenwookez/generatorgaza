import { ArrowRight, LucideIcon } from 'lucide-react'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { PopularLinks } from '../_components/PopularLinks/PopularLinks'
import { Separator } from '@/components/elements/Separator'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ContentClass } from '../layout'
import { initPayload } from '@/lib/utils/initPayload'
import { About, Media } from '@/payload-types'
import { ImagesCarousel } from '@/components/elements/ImagesCarousel'
import { AskQuestionButton } from '../catalog/[category_slug]/[item_slug]/_components/AskQuestionButton'

export default async function AboutPage() {
  const payload = await initPayload()
  const data = await payload.findGlobal({
    slug: 'about',
  })

  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail items={[{ title: 'О предприятии' }]} />
        <h1 className="text-[1.875rem] font-medium leading-[110%]">О предприятии</h1>
      </div>
      <div className="flex gap-x-30 items-start max-xl:gap-x-20">
        <AboutPageContent data={data} />
        <AboutPageSidebar />
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}

const AboutPageContent = ({ data }: { data: About }) => (
  <div className="max-w-[820px] grow flex flex-col gap-y-7">
    <div className="lg:hidden">
      <AboutPageSidebarBody />
    </div>
    {data.images && data.images.length > 0 && (
      <div className="flex justify-center">
        <ImagesCarousel
          images={data.images as Media[]}
          containerClassName="rounded-[8px] border border-border2"
          imageClassName="h-[546.7px] max-sm:h-[267px]"
        />
      </div>
    )}
    {data.links && data.links.length > 0 && (
      <div className="flex gap-7 max-sm:flex-col">
        {data.links.map((link, key) => (
          <AboutPageLinkingBlock
            key={key}
            title={link.title}
            href={link.href}
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            icon={require('lucide-react')[link.icon]}
          />
        ))}
      </div>
    )}
    {data.sections &&
      data.sections.map((section, key) => (
        <div key={key} className="flex gap-y-3 flex-col">
          <h2 className="text-[1.5rem] font-medium leading-[160%]">{section.heading}</h2>
          <p className="text-[1.125rem] max-sm:text-[1rem] leading-[170%] whitespace-pre-wrap">
            {section.text}
          </p>
        </div>
      ))}
  </div>
)

const AboutPageSidebar = () => (
  <div
    className={cn(
      'max-lg:hidden w-full max-w-[400px] sticky top-[94px] shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)]',
      AboutPageSidebarBodyRoundedClass,
    )}
  >
    <AboutPageSidebarBody />
  </div>
)

const AboutPageSidebarBodyRoundedClass = 'rounded-[12px]'

const AboutPageSidebarBody = () => (
  <div
    className={cn(
      'border p-6 flex flex-col gap-y-4.5 w-full max-lg:rounded-[8px] max-lg:border-border2',
      AboutPageSidebarBodyRoundedClass,
    )}
  >
    <div className="flex flex-col gap-y-3">
      <div className="font-medium text-muted-foreground leading-[110%]">Есть вопросы?</div>
      <h3 className="font-medium text-[1.375rem] leading-[110%] max-sm:text-[1.5rem]">
        Свяжитесь с нами!
      </h3>
    </div>
    <AskQuestionButton />
  </div>
)

type AboutPageLinkingBlockProps = {
  title: string
  href: string
  icon: LucideIcon
}

const AboutPageLinkingBlock = ({ title, href, icon: Icon }: AboutPageLinkingBlockProps) => {
  return (
    <div className="w-full p-6 rounded-[12px] border border-border2 flex flex-col gap-y-5 items-start">
      <div className="bg-accent rounded-[50%] size-16 flex justify-center items-center">
        <Icon className="size-8.5 text-accent-foreground" />
      </div>
      <h2 className="text-[1.25rem] leading-[140%] font-semibold">{title}</h2>
      <Button asChild variant="outline">
        <Link href={href} prefetch>
          Подробнее <ArrowRight />
        </Link>
      </Button>
    </div>
  )
}
