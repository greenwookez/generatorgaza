'use server'

/**
 * Sends a notification message to a specified Telegram chat using the Telegram Bot API.
 *
 * @param Text - The message text to send. Supports HTML formatting.
 * @returns A promise that resolves when the message has been sent.
 *
 * @remarks
 * - Requires the environment variables `TG_BOT_TOKEN` (Telegram bot token) and `TG_CHAT_ID` (target chat ID) to be set.
 * - If either environment variable is missing or invalid, the function will return early and not send a message.
 */
export async function SendNotificationInTelegram(Text: string) {
  const token = process.env.TG_BOT_TOKEN
  const chatID = parseInt(process.env.TG_CHAT_ID || '')
  if (!token || isNaN(chatID)) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      parse_mode: 'HTML',
      chat_id: chatID,
      text: Text,
    }),
  })
}
