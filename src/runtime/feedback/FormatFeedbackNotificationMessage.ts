import { Feedback } from '@/payload-types'

/**
 * Formats a feedback object into a notification message string in Russian.
 *
 * @param Feedback - The feedback object containing details such as id, name, phone, email, message, page URL, and creation date.
 * @returns A formatted string with feedback details for notification purposes.
 */
export function FormatFeedbackNotificationMessage(Feedback: Feedback): string {
  return (
    'Новая обратная связь!\n' +
    `ID: ${Feedback.id}\n` +
    `Имя: ${Feedback.name}\n` +
    `Телефон: ${Feedback.phone || 'Не указан'}\n` +
    `Email: ${Feedback.email || 'Не указан'}\n` +
    `Сообщение: ${Feedback.message || 'Не указано'}\n` +
    `URL страницы: ${Feedback.page_url}\n` +
    `Дата создания: ${new Date(Feedback.createdAt).toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
    })} МСК\n`
  )
}
