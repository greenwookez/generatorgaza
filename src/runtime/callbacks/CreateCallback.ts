'use server'

import { RateLimiterMemory } from 'rate-limiter-flexible'
import { initPayload } from '@/lib/utils/initPayload'
import { getClientIp } from '@/lib/utils/getClientIP'
import {
  CreateCallbackInput,
  CreateCallbackOutputInvalidParams,
  CreateCallbackOutputOK,
  CreateCallbackOutputTooManyRequests,
} from './model'
import { isValidPhoneNumber } from '@/lib/helpers/isValidPhoneNumber'

const RateLimiter = new RateLimiterMemory({
  points: 2,
  duration: 10,
}) // 2 calls each 10 seconds at max

/**
 * Creates a new Callback entry in the 'Callback' collection using the provided input data.
 *
 * @param Input - The input data required to create a Callback entry.
 * @returns A promise that resolves when the Callback entry has been created.
 */
export async function CreateCallback(Input: CreateCallbackInput): Promise<number> {
  const ipAddress = await getClientIp()
  try {
    await RateLimiter.consume(ipAddress)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (res) {
    return CreateCallbackOutputTooManyRequests
  }

  if (!validateCreateCallbackInput(Input)) {
    return CreateCallbackOutputInvalidParams
  }

  const payload = await initPayload()
  payload.create({
    collection: 'callbacks',
    data: Input,
  })

  return CreateCallbackOutputOK
}

function validateCreateCallbackInput(input: CreateCallbackInput): boolean {
  if (input.name.trim() === '') return false
  if (!isValidPhoneNumber(input.phone)) return false

  return true
}
