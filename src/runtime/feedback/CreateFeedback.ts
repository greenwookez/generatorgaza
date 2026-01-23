'use server'

import { Feedback } from '@/payload-types'
import { initPayload } from '@/lib/initPayload'

export type CreateFeedbackInput = Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>

/**
 * Creates a new feedback entry in the 'feedback' collection using the provided input data.
 *
 * @param Input - The input data required to create a feedback entry.
 * @returns A promise that resolves when the feedback entry has been created.
 */
export async function CreateFeedback(Input: CreateFeedbackInput) {
  const payload = await initPayload()
  payload.create({
    collection: 'feedback',
    data: Input,
  })
}
