'use server'

import { RateLimiterMemory } from 'rate-limiter-flexible'
import { initPayload } from '@/lib/utils/initPayload'
import { getClientIp } from '@/lib/utils/getClientIP'
import {
  CreateFeedbackInput,
  CreateFeedbackOutputInvalidParams,
  CreateFeedbackOutputOK,
  CreateFeedbackOutputTooManyRequests,
} from './model'
import { isValidEmail } from '@/lib/helpers/isValidEmail'
import { isValidPhoneNumber } from '@/lib/helpers/isValidPhoneNumber'

const RateLimiter = new RateLimiterMemory({
  points: 2,
  duration: 10,
}) // 2 calls each 10 seconds at max

/**
 * Creates a new feedback entry in the 'feedback' collection using the provided input data.
 *
 * @param Input - The input data required to create a feedback entry.
 * @returns A promise that resolves when the feedback entry has been created.
 */
export async function CreateFeedback(Input: CreateFeedbackInput): Promise<number> {
  const ipAddress = await getClientIp()
  try {
    await RateLimiter.consume(ipAddress)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (res) {
    return CreateFeedbackOutputTooManyRequests
  }

  if (!validateCreateFeedbackInput(Input)) {
    return CreateFeedbackOutputInvalidParams
  }

  const payload = await initPayload()
  payload.create({
    collection: 'feedback',
    data: Input,
  })

  return CreateFeedbackOutputOK
}

function validateCreateFeedbackInput(input: CreateFeedbackInput): boolean {
  if (input.name.trim() === '') return false
  if (!isValidEmail(input.email)) return false
  if (!isValidPhoneNumber(input.phone)) return false
  if (input.message.trim() === '') return false

  return true
}
