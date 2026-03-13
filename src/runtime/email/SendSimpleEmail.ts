import type { Payload } from 'payload'

type SendNotificationByEmailParams = {
  payload: Payload
  to: string
  subject: string
  text: string
}

/**
 * Sends a plain-text email using the email adapter configured in Payload.
 */
export async function SendSimpleEmail({
  payload,
  to,
  subject,
  text,
}: SendNotificationByEmailParams): Promise<void> {
  try {
    await payload.sendEmail({
      to,
      subject,
      text,
    })
  } catch (error) {
    payload.logger.error({ error, subject, to }, 'Failed to send notification email')
  }
}
