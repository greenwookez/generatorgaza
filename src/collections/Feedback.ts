import type { CollectionConfig } from 'payload'
import { UserRoleAdmin, UserRoleDefault } from './Users'
import { SendNotificationInTelegram } from '@/actions/SendNotificationInTelegram'
import { FormatFeedbackNotificationMessage } from '@/runtime/FormatFeedbackNotificationMessage'
import { Feedback as TFeeback } from '@/payload-types'

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  admin: {
    group: 'CRM',
  },
  labels: {
    singular: {
      ru: 'Обратная связь',
    },
    plural: {
      ru: 'Обратная связь',
    },
  },
  access: {
    admin: ({ req: { user } }) => {
      return user?.role === UserRoleDefault || user?.role === UserRoleAdmin
    },
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        if (operation === 'create') {
          const text = FormatFeedbackNotificationMessage(doc as TFeeback)
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
      name: 'email',
      required: true,
      label: {
        ru: 'Email',
      },
    },
    {
      type: 'textarea',
      name: 'message',
      required: true,
      label: {
        ru: 'Сообщение',
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
