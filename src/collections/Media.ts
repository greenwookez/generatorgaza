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
      label: {
        ru: 'Альтернативный текст для изображения',
      },
      admin: {
        condition: (data) => {
          return data?.file?.type?.startsWith('image/') || false
        },
        description:
          'Требуется для скринридеров, которые используются людьми с нарушениями зрения. В этом поле следует в двух словах описать, что изображено на картинке. Например: "Мобильная азотная установка".',
      },
    },
  ],
  upload: {
    disableLocalStorage: true,
  },
}
