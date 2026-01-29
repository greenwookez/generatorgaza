import { Callback } from '@/payload-types'

/**
 * Formats a Callback object into a notification message string in Russian.
 *
 * @param Callback - The Callback object containing details such as id, name, phone, page URL, and creation date.
 * @returns A formatted string with Callback details for notification purposes.
 */
export function FormatCallbackNotificationMessage(Callback: Callback): string {
  return (
    '☎️ Заказан обратный звонок!\n' +
    `Имя: ${Callback.name}\n` +
    `Телефон: ${Callback.phone || 'Не указан'}\n` +
    `URL страницы: ${Callback.page_url}\n` +
    `Дата создания: ${new Date(Callback.createdAt).toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
    })} МСК\n` +
    `Идентификатор запроса: ${Callback.id}\n`
  )
}
