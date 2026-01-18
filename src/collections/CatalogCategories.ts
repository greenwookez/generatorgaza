import type { CollectionConfig } from 'payload'
import { UserRoleAdmin, UserRoleDefault } from './Users'

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
  ],
}
