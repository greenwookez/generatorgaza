import type { CollectionConfig } from 'payload'
import { isAdmin } from './Users'
import { SendNotificationInTelegram } from '@/runtime/telegram/SendNotificationInTelegram'
import { Callback as TCallback } from '@/payload-types'
import { FormatCallbackNotificationMessage } from '@/runtime/callbacks/FormatFeedbackNotificationMessage'
import { SendSimpleEmail } from '@/runtime/email/SendSimpleEmail'

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
      async ({ operation, doc, req }) => {
        if (operation === 'create') {
          const text = FormatCallbackNotificationMessage(doc as TCallback)

          const notifications = [SendNotificationInTelegram(text)]
          if (process.env.EMAIL_NOTIFICATION_TO) {
            notifications.push(
              SendSimpleEmail({
                payload: req.payload,
                to: process.env.EMAIL_NOTIFICATION_TO,
                subject: 'Новый запрос на обратный звонок с сайта',
                text,
              }),
            )
          }

          await Promise.allSettled(notifications)
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
