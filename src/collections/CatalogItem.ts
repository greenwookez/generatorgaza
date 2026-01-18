import type { CollectionConfig } from 'payload'
import { UserRoleAdmin, UserRoleDefault } from './Users'
import { validateSlug } from '@/lib/validateSlug'

export const CatalogItems: CollectionConfig = {
  slug: 'catalog-items',
  admin: {
    useAsTitle: 'title',
    group: 'Каталог',
  },
  labels: {
    singular: {
      ru: 'Товар',
    },
    plural: {
      ru: 'Товары',
    },
  },
  access: {
    admin: ({ req: { user } }) => {
      return user?.role === UserRoleDefault || user?.role === UserRoleAdmin
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            ru: 'Основные данные',
          },
          fields: [
            {
              type: 'text',
              name: 'title',
              required: true,
              label: {
                ru: 'Название',
              },
            },
            {
              type: 'relationship',
              name: 'category',
              relationTo: 'catalog-categories',
              required: true,
              label: {
                ru: 'Категория',
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
                description: 'Часть URL страницы товара. Например, acetylene',
              },
              validate: validateSlug,
            },
            {
              type: 'upload',
              name: 'cardImage',
              relationTo: 'media',
              required: true,
              label: {
                ru: 'Обложка в каталоге',
              },
              filterOptions: {
                mimeType: { contains: 'image' },
              },
            },
          ],
        },
        {
          label: {
            ru: 'Описание',
          },
          fields: [
            {
              type: 'textarea',
              name: 'shortDescription',
              label: {
                ru: 'Краткое описание',
              },
              required: true,
            },
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
              type: 'richText',
              name: 'fullDescription',
              label: {
                ru: 'Подробное описание',
              },
            },
            {
              type: 'textarea',
              name: 'advantages',
              label: {
                ru: 'Преимущества',
              },
            },
            {
              type: 'upload',
              name: 'documents',
              hasMany: true,
              relationTo: 'media',
              filterOptions: {
                mimeType: { equals: 'application/pdf' },
              },
              label: {
                ru: 'Документы',
              },
            },
            {
              type: 'textarea',
              name: 'services',
              label: {
                ru: 'Услуги',
              },
            },
          ],
        },
        {
          label: {
            ru: 'Технические характеристики',
          },
          fields: [
            {
              type: 'array',
              name: 'specification_key_value',
              label: false,
              labels: {
                singular: {
                  ru: 'Характеристика',
                },
                plural: {
                  ru: 'Характеристики',
                },
              },
              fields: [
                {
                  name: 'key',
                  type: 'text',
                  label: {
                    ru: 'Ключ',
                  },
                },
                {
                  name: 'value',
                  type: 'text',
                  label: {
                    ru: 'Значение',
                  },
                },
              ],
            },
            {
              type: 'richText',
              name: 'specification',
              label: {
                ru: 'Технические характеристики',
              },
            },
          ],
        },
        {
          label: {
            ru: 'Правый блок',
          },
          fields: [
            {
              name: 'variations',
              type: 'textarea',
              admin: {
                description: 'Введите каждую вариацию с новой строки',
              },
              label: {
                ru: 'Доступные вариации',
              },
            },
            {
              name: 'volumes',
              type: 'textarea',
              admin: {
                description:
                  'Предназначается для раздела "Технические газы". Введите каждый объем с новой строки',
              },
              label: {
                ru: 'Доступные объемы баллонов',
              },
            },
            {
              name: 'shortSpecification',
              type: 'textarea',
              admin: {
                description: 'Введите каждую характеристику с новой строки',
              },
              label: {
                ru: 'Характеристики',
              },
            },
          ],
        },
      ],
    },
  ],
}
