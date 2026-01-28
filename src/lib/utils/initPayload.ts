import { getPayload } from 'payload'
import config from '@/payload.config'

export async function initPayload() {
  return getPayload({ config })
}
