import React from 'react'
import { getPayload } from 'payload'
import { Download, File } from 'lucide-react'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '@/app/(frontend)/_components/PopularLinks'
import { CatalogCategory, Media } from '@/payload-types'
import { ImagesCarousel } from './_components/ImagesCarousel'
import { AskQuestionButton } from './_components/AskQuestionButton'
import { MakeInquiryButton } from './_components/MakeInquiryButton'
import './styles.css'

type CatalogItemForThisPage = {
  id: number
  title: string
  category: number | CatalogCategory
  variations?: string | null | undefined
  volumes?: string | null | undefined
  shortSpecification?: string | null | undefined
  specification?: any
  specification_key_value?:
    | { key?: string | null; value?: string | null; id?: string | null }[]
    | null
    | undefined
  shortDescription: string
  fullDescription?: any
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
  const payload = await getPayload({ config })

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
    <div className="flex flex-col gap-y-12 pt-7.5 pb-22.5">
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

    if (item.fullDescription) {
      sections.push({
        title: 'Описание',
        value: 'description',
        content: (
          // @ts-ignore
          <RichText data={item.fullDescription} />
        ),
      })
    }

    if (item.advantages) {
      sections.push({
        title: 'Преимущества',
        value: 'advantages',
        content: <div className="text-[1rem] leading-[170%]">{item.advantages}</div>,
      })
    }

    if (item.specification) {
      sections.push({
        title: 'Технические характеристики',
        value: 'specification',
        content: (
          <div className="flex flex-col gap-y-8">
            {item.specification_key_value && (
              <div className="flex flex-col gap-y-3">
                {item.specification_key_value?.map((pair, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex justify-between w-full gap-x-6">
                      <span className="font-medium leading-[1.5rem] text-muted-foreground">
                        {pair.key}
                      </span>
                      <span className="leading-[1.5rem] text-foreground">{pair.value}</span>
                    </div>
                    {idx < (item.specification_key_value?.length ?? 0) - 1 && (
                      <Separator hr={{ className: 'bg-border2' }} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            {/* @ts-ignore */}
            <RichText data={item.specification} />
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
        content: <div className="text-[1rem] leading-[170%]">{item.services}</div>,
      })
    }

    return sections
  }

  const sections = getAccordionSections()

  return (
    <div className="grow flex flex-col gap-y-6">
      <div className="lg:hidden">
        <CatalogItemPageSidebarBody item={item} />
      </div>
      {item.images && (
        <div className="flex justify-center">
          <ImagesCarousel
            images={item.images.map((image) => ({
              src: (image as Media).url ?? '',
              alt: (image as Media).alt ?? '',
            }))}
          />
        </div>
      )}
      <p className="leading-[170%]">{item.shortDescription}</p>
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
  <Accordion type="multiple" className="w-full" defaultValue={['description', 'services']}>
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
  <div className="max-lg:hidden w-full max-w-[440px] sticky top-[94px] shadow-[0px_5px_20px_0px_rgba(0,31,84,0.08)] ">
    <CatalogItemPageSidebarBody item={item} />
  </div>
)

const CatalogItemPageSidebarBody = ({ item }: { item: CatalogItemForThisPage }) => (
  <div className="border rounded-[12px] p-6 flex flex-col gap-y-4.5 w-full">
    <h2 className="max-lg:hidden text-[1.375rem] font-semibold leading-[110%]">{item.title}</h2>
    <div className="flex flex-col gap-y-4">
      {item.variations && (
        <div className="flex flex-col gap-y-3 items-start">
          <span className="font-semibold leading-[160%]">Доступные вариации:</span>
          {item.variations.split('\n').map((variation, idx) => (
            <div
              key={idx}
              className="py-1 px-3 bg-accent rounded-[50px] text-accent-foreground leading-[140%] font-semibold"
            >
              {variation}
            </div>
          ))}
        </div>
      )}
      {item.volumes && (
        <div className="flex flex-col gap-y-3 items-start">
          <span className="font-semibold leading-[160%]">Доступные объемы баллонов:</span>
          <div className="flex gap-x-3 gap-y-3 flex-wrap">
            {item.volumes.split('\n').map((volume, idx) => (
              <div
                key={idx}
                className="py-1 px-3 bg-accent rounded-[50px] text-accent-foreground leading-[140%] font-semibold"
              >
                {volume}
              </div>
            ))}
          </div>
        </div>
      )}
      {item.shortSpecification && (
        <div className="flex flex-col gap-y-1 items-start">
          <span className="font-semibold leading-[160%]">Характеристики:</span>
          {item.shortSpecification.split('\n').map((volume, idx) => (
            <div key={idx} className="text-[0.875rem] leading-[180%]">
              {volume}
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
