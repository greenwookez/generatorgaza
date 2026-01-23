import type { CollectionConfig } from 'payload'
import { validateSlug } from '@/lib/validateSlug'

export const CatalogCategories: CollectionConfig = {
  slug: 'catalog-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Каталог',
  },
  labels: {
    singular: {
      ru: 'Категория',
    },
    plural: {
      ru: 'Категории',
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        ru: 'Название',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: {
        ru: 'Идентификатор (slug)',
      },
      admin: {
        description: 'Часть URL страницы категории. Например, industrial-gases',
      },
      validate: validateSlug,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        ru: 'Обложка',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: {
        ru: 'Краткое описание',
      },
    },
    {
      name: 'navDescription',
      type: 'textarea',
      required: true,
      label: {
        ru: 'Описание в навигационном меню',
      },
    },
    {
      name: 'navIcon',
      type: 'text',
      required: true,
      label: {
        ru: 'Иконка в навигационном меню',
      },
      admin: {
        description: 'ComponentName из https://lucide.dev/icons (например, Cylinder)',
      },
    },
  ],
  defaultPopulate: {
    title: true,
    slug: true,
  },
}
