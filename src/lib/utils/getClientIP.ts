import { headers } from 'next/headers'

/**
 * Retrieves the client's IP address from HTTP headers.
 *
 * @returns The IP address from `x-forwarded-for`, `x-real-ip`, or `'unknown'` if unavailable.
 */
export async function getClientIp() {
  const h = await headers()

  const forwardedFor = h.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIp = h.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  return 'unknown'
}
