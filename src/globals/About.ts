import { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'О предприятии',
  admin: {
    group: 'Страницы',
  },
  fields: [
    {
      type: 'upload',
      name: 'images',
      hasMany: true,
      relationTo: 'media',
      label: {
        ru: 'Галерея изображений',
      },
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'links',
      type: 'array',
      label: 'Ссылки на другие страницы',
      labels: {
        singular: {
          ru: 'Ссылка',
        },
        plural: {
          ru: 'Ссылки',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Текст ссылки',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Ссылка',
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: {
            ru: 'Иконка ссылки',
          },
          admin: {
            description: 'ComponentName из https://lucide.dev/icons (например, Cylinder)',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Главная страница',
          fields: [
            {
              name: 'landing_text',
              type: 'textarea',
              label: 'Текст на лендинге',
            },
          ],
        },
        {
          label: 'Страница «О предприятии»',
          fields: [
            {
              name: 'sections',
              type: 'array',
              label: 'Разделы страницы',
              labels: {
                singular: {
                  ru: 'Раздел',
                },
                plural: {
                  ru: 'Разделы',
                },
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  label: {
                    ru: 'Заголовок',
                  },
                },
                {
                  name: 'text',
                  type: 'textarea',
                  label: {
                    ru: 'Текст',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
