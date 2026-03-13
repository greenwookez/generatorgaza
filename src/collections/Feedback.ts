import type { CollectionConfig } from 'payload'
import { isAdmin } from './Users'
import { SendNotificationInTelegram } from '@/runtime/telegram/SendNotificationInTelegram'
import { FormatFeedbackNotificationMessage } from '@/runtime/feedback/FormatFeedbackNotificationMessage'
import { Feedback as TFeeback } from '@/payload-types'
import { SendSimpleEmail } from '@/runtime/email/SendSimpleEmail'

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  admin: {
    group: 'CRM',
    defaultColumns: ['id', 'message', 'name', 'phone', 'email'],
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
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
  },
  hooks: {
    afterChange: [
      async ({ operation, doc, req }) => {
        if (operation === 'create') {
          const text = FormatFeedbackNotificationMessage(doc as TFeeback)

          const notifications = [SendNotificationInTelegram(text)]
          if (process.env.EMAIL_NOTIFICATION_TO) {
            notifications.push(
              SendSimpleEmail({
                payload: req.payload,
                to: process.env.EMAIL_NOTIFICATION_TO,
                subject: 'Новая обратная связь с сайта',
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
