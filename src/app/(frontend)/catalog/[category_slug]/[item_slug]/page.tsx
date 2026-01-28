import React from 'react'
import { Download, File } from 'lucide-react'
import { notFound } from 'next/navigation'
import { SerializedEditorState } from 'lexical'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { hasText } from '@payloadcms/richtext-lexical/shared'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '@/app/(frontend)/_components/PopularLinks/PopularLinks'
import { CatalogCategory, Media } from '@/payload-types'
import { ImagesCarousel } from '@/components/elements/ImagesCarousel'
import { AskQuestionButton } from './_components/AskQuestionButton'
import { MakeInquiryButton } from './_components/MakeInquiryButton'
import { cn } from '@/lib/utils'
import { ContentClass } from '@/app/(frontend)/layout'
import { initPayload } from '@/lib/utils/initPayload'
import { LexicalConverters } from '@/app/(frontend)/_lexical/converters'

type CatalogItemForThisPage = {
  id: number
  title: string
  category: number | CatalogCategory
  variations?: string | null | undefined
  volumes?: string | null | undefined
  shortSpecification?: string | null | undefined
  specification?: SerializedEditorState | null
  specification_key_value?:
    | { key?: string | null; value?: string | null; id?: string | null }[]
    | null
    | undefined
  shortDescription: string
  fullDescription?: SerializedEditorState | null
  advantages?: string | null | undefined
  documents?: (number | Media)[] | null | undefined
  services?: string | null | undefined
  images?: (number | Media)[] | null | undefined
}

export default async function CatalogItemPage({
  params,
}: {
  params: Promise<{ item_slug: string }>
}) {
  const payload = await initPayload()

  const { item_slug } = await params

  const items = await payload.find({
    collection: 'catalog-items',
    where: {
      slug: { equals: item_slug },
    },
    limit: 1,
    pagination: false,
    select: {
      title: true,
      category: true,
      variations: true,
      volumes: true,
      specification: true,
      shortSpecification: true,
      fullDescription: true,
      shortDescription: true,
      advantages: true,
      specification_key_value: true,
      documents: true,
      services: true,
      images: true,
    },
  })

  const item = items.docs?.[0]
  if (!item) {
    notFound()
  }

  return (
    <div className={cn(ContentClass)}>
      <div className="flex flex-col gap-y-7">
        <BreadCrumbsTrail
          items={[
            { title: 'Каталог', href: '/catalog' },
            {
              title: (item.category as CatalogCategory).title,
              href: `/catalog/${(item.category as CatalogCategory).slug}`,
            },
            { title: item.title },
          ]}
        />
        <h1 className="text-[1.875rem] max-sm:text-[1.5rem] font-medium leading-[110%]">
          {item.title}
        </h1>
        <div className="flex gap-x-30 items-start max-xl:gap-x-20">
          <CatalogItemPageContent item={item} />
          <CatalogItemPageSidebar item={item} />
        </div>
      </div>
      <Separator />
      <PopularLinks />
    </div>
  )
}

const CatalogItemPageContent = ({ item }: { item: CatalogItemForThisPage }) => {
  const getAccordionSections = () => {
    const sections: AccordionSection[] = []

    if (hasText(item.fullDescription)) {
      sections.push({
        title: 'Описание',
        value: 'description',
        content: <RichText converters={LexicalConverters} data={item.fullDescription!} />,
      })
    }

    if (item.advantages) {
      sections.push({
        title: 'Преимущества',
        value: 'advantages',
        content: (
          <ul className="text-[1rem] leading-[170%] list-disc pl-5 marker:text-muted-foreground">
            {item.advantages.split('\n').map((advantage, idx) => (
              <li key={idx}>{advantage}</li>
            ))}
          </ul>
        ),
      })
    }

    if (
      hasText(item.specification) ||
      (item.specification_key_value && item.specification_key_value.length > 0)
    ) {
      sections.push({
        title: 'Технические характеристики',
        value: 'specification',
        content: (
          <div className="flex flex-col gap-y-8">
            {item.specification_key_value && item.specification_key_value.length > 0 && (
              <div className="flex flex-col gap-y-3">
                {item.specification_key_value?.map((pair, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex justify-between w-full gap-x-6">
                      <span className="font-medium leading-[1.5rem] text-muted-foreground">
                        {pair.key}
                      </span>
                      <span className="leading-[1.5rem] text-foreground text-right">
                        {pair.value}
                      </span>
                    </div>
                    {idx < (item.specification_key_value?.length ?? 0) - 1 && (
                      <Separator hr={{ className: 'bg-border2' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            {hasText(item.specification) && (
              <RichText converters={LexicalConverters} data={item.specification!} />
            )}
          </div>
        ),
      })
    }

    if (item.documents && item.documents.length > 0) {
      sections.push({
        title: 'Документы',
        value: 'documents',
        content: (
          <div className="flex flex-col gap-y-4">
            {item.documents.map((doc, idx) => (
              <div className="flex gap-x-3 items-center" key={idx}>
                <div className="size-12 rounded-[8px] bg-accent2 flex justify-center items-center">
                  <File className="size-6 text-muted-foreground" />
                </div>
                <span className="text-[0.875rem] max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {(doc as Media).filename}
                </span>
                <Button variant="link" size="indent-none" asChild>
                  <a href={(doc as Media).url!} target="_blank" rel="noopener noreferrer">
                    Скачать <Download className="size-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        ),
      })
    }

    if (item.services) {
      sections.push({
        title: 'Услуги',
        value: 'services',
        content: (
          <ul className="text-[1rem] leading-[170%] list-disc pl-5 marker:text-muted-foreground">
            {item.services.split('\n').map((service, idx) => (
              <li key={idx}>{service}</li>
            ))}
          </ul>
        ),
      })
    }

    return sections
  }

  const sections = getAccordionSections()

  return (
    <div className="max-w-[820px] grow flex flex-col gap-y-6">
      <div className="lg:hidden">
        <CatalogItemPageSidebarBody item={item} />
      </div>
      {item.images && item.images.length > 0 && (
        <div className="flex justify-center">
          <ImagesCarousel
            images={item.images as Media[]}
            containerClassName="rounded-[8px] border border-border2"
            imageClassName="h-[546.7px] max-sm:h-[267px]"
          />
        </div>
      )}
      <p className="text-[1.125rem] leading-[170%] whitespace-pre-wrap">{item.shortDescription}</p>
      {sections && <CatalogItemPageContentAccordion sections={sections} />}
      <CatalogItemPageMobileFooter />
    </div>
  )
}

type AccordionSection = {
  title: string
  content: React.ReactNode
  value: string
}

const CatalogItemPageContentAccordion = ({ sections }: { sections: AccordionSection[] }) => (
  <Accordion type="multiple" className="w-full">
    {sections.map((section, idx) => (
      <AccordionItem key={idx} value={section.value} className="border-border2">
        <AccordionTrigger className="text-[1.125rem] text-secondary-foreground font-semibold leading-[1.5rem] cursor-pointer">
          {section.title}
        </AccordionTrigger>
        <AccordionContent>{section.content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)

const CatalogItemPageSidebar = ({ item }: { item: CatalogItemForThisPage }) => (
  <div
    className={cn(
      'max-lg:hidden w-full max-w-[400px] sticky top-[94px] shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)]',
      CatalogItemPageSidebarBodyRoundedClass,
    )}
  >
    <CatalogItemPageSidebarBody item={item} />
  </div>
)

const CatalogItemPageSidebarBodyRoundedClass = 'rounded-[12px]'

const CatalogItemPageSidebarBody = ({ item }: { item: CatalogItemForThisPage }) => (
  <div
    className={cn(
      'border p-6 flex flex-col gap-y-4.5 w-full max-lg:rounded-[8px] max-lg:border-border2',
      CatalogItemPageSidebarBodyRoundedClass,
    )}
  >
    <h2 className="max-lg:hidden text-[1.375rem] font-semibold leading-[110%]">{item.title}</h2>
    <div className="flex flex-col gap-y-4">
      {item.variations && (
        <div className="flex flex-col gap-y-3 items-start">
          <span className="font-semibold leading-[160%]">Доступные вариации:</span>
          <div className="flex gap-x-3 gap-y-3 flex-wrap">
            {item.variations.split('\n').map((item, idx) => (
              <div
                key={idx}
                className="py-1 px-3 bg-accent rounded-[50px] text-accent-foreground leading-[140%] font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      {item.volumes && (
        <div className="flex flex-col gap-y-3 items-start">
          <span className="font-semibold leading-[160%]">Доступные объемы баллонов:</span>
          <div className="flex gap-x-3 gap-y-3 flex-wrap">
            {item.volumes.split('\n').map((item, idx) => (
              <div
                key={idx}
                className="py-1 px-3 bg-accent rounded-[50px] text-accent-foreground leading-[140%] font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
      {item.shortSpecification && (
        <div className="flex flex-col gap-y-1 items-start">
          <span className="font-semibold leading-[160%]">Характеристики:</span>
          {item.shortSpecification.split('\n').map((item, idx) => (
            <div key={idx} className="text-[0.875rem] leading-[160%]">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="max-lg:hidden flex flex-col gap-y-3">
      <MakeInquiryButton />
      <AskQuestionButton />
    </div>
  </div>
)

const CatalogItemPageMobileFooter = () => (
  <div className="lg:hidden sticky bottom-0 left-0 right-0 flex gap-x-3 bg-card pt-3 pb-4">
    <MakeInquiryButton />
    <AskQuestionButton />
  </div>
)
