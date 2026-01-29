import type { CollectionConfig } from 'payload'
import { isAdmin } from './Users'
import { SendNotificationInTelegram } from '@/runtime/telegram/SendNotificationInTelegram'
import { Callback as TCallback } from '@/payload-types'
import { FormatCallbackNotificationMessage } from '@/runtime/callbacks/FormatFeedbackNotificationMessage'

export const Callbacks: CollectionConfig = {
  slug: 'callbacks',
  admin: {
    group: 'CRM',
    defaultColumns: ['id', 'name', 'phone'],
  },
  labels: {
    singular: {
      ru: 'Обратный звонок',
    },
    plural: {
      ru: 'Обратные звонки',
    },
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        if (operation === 'create') {
          const text = FormatCallbackNotificationMessage(doc as TCallback)
          SendNotificationInTelegram(text)
        }
      },
    ],
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      required: true,
      label: {
        ru: 'Имя',
      },
    },
    {
      type: 'text',
      name: 'phone',
      required: true,
      label: {
        ru: 'Телефон',
      },
    },
    {
      type: 'text',
      name: 'page_url',
      required: true,
      index: true,
      label: {
        ru: 'URL страницы',
      },
    },
  ],
}
