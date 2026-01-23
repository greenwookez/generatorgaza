import type { CollectionConfig } from 'payload'

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
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: {
        ru: 'Альтернативный текст для изображения',
      },
      admin: {
        description:
          'Требуется для скринридеров, которые используются людьми с нарушениями зрения. В этом поле следует в двух словах описать, что изображено на картинке. Например: "Мобильная азотная установка".',
      },
    },
  ],
  defaultPopulate: {
    url: true,
    alt: true,
    filename: true,
  },
  upload: {
    disableLocalStorage: true,
  },
}
