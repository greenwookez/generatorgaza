import type { CollectionConfig } from 'payload'
import { UserRoleAdmin, UserRoleDefault } from './Users'
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
  access: {
    admin: ({ req: { user } }) => {
      return user?.role === UserRoleDefault || user?.role === UserRoleAdmin
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
  ],
}
