import type { CollectionConfig } from 'payload'
import { UserRoleAdmin } from './Users'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Система',
  },
  labels: {
    singular: {
      ru: 'Файл',
    },
    plural: {
      ru: 'Файлы',
    },
  },
  access: {
    read: () => true,
    admin: ({ req: { user } }) => {
      return user?.role === UserRoleAdmin
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
}
