import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { BreadCrumbsTrail } from '@/components/elements/BreadCrumbsTrail'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/elements/Separator'
import { PopularLinks } from '@/app/(frontend)/_components/PopularLinks'
import { CatalogCategory } from '@/payload-types'

export default async function IndustrialGasPage({
  params,
}: {
  params: Promise<{ item_slug: string }>
}) {
  const payload = await getPayload({ config: await config })

  const { item_slug } = await params

  const items = await payload.find({
    collection: 'catalog-items',
    where: {
      slug: { equals: item_slug },
    },
    limit: 1,
  })

  const item = items.docs?.[0]
  if (!item) {
    notFound()
  }

  const categories = await payload.find({
    collection: 'catalog-categories',
    where: {
      id: { equals: (item.category as CatalogCategory).id },
    },
    limit: 1,
  })

  const category = categories.docs[0]
  if (!category) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-y-7 pt-7.5 pb-22.5">
      <BreadCrumbsTrail
        items={[
          { title: 'Каталог', href: '/catalog' },
          { title: category.title, href: `/catalog/${category.slug}` },
          { title: item.title },
        ]}
      />
      <h1 className="text-[1.875rem] font-medium leading-[110%]">{item.title}</h1>
      <div className="flex flex-col gap-y-12">
        {/* {item.variations && (
          <div className="flex gap-y-8 gap-x-6 items-stretch flex-wrap">
            {item.variations.split('\n').map((data, idx) => (
              // <IndustrialGasVariationCard key={idx} data={data} />
            ))}
          </div>
        )} */}
        <Separator />
        <p className="text-[1.25rem] leading-[160%]">{item.shortDescription}</p>
        <Separator />
        <PopularLinks />
      </div>
    </div>
  )
}

// type IndustrialGasVariationCardProps = {
//   data: IndustrialGasVariation
// }

// const IndustrialGasVariationCard = ({ data }: IndustrialGasVariationCardProps) => (
//   <div className="w-full max-w-[440px] max-lg:max-w-full py-5 px-6 border border-border2 rounded-[12px] flex flex-col gap-y-5">
//     <div className="flex gap-x-6">
//       <h2 className="text-[1.5rem] font-semibold leading-[110%]">{data.title}</h2>
//       <Button>Запросить цену</Button>
//     </div>
//     <div className="flex flex-col gap-y-3">
//       <h3 className="text-[1.25rem] font-semibold leading-[160%]">Доступные объемы баллонов:</h3>
//       <div className="flex gap-x-3">
//         {data.volumes.map((volume, idx) => (
//           <div
//             key={idx}
//             className="py-1 px-3 bg-accent rounded-[50px] text-accent-foreground text-[1.125rem] leading-[140%] font-semibold"
//           >
//             {volume} литров
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className="flex flex-col gap-y-1">
//       <h3 className="text-[1.25rem] font-semibold leading-[160%]">Характеристики:</h3>
//       <div className="text-[1.125rem] leading-[200%] whitespace-pre-line">{data.description}</div>
//     </div>
//   </div>
// )
