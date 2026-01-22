'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { Feedback } from '@/payload-types'

export type CreateFeedbackInput = Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>

/**
 * Creates a new feedback entry in the 'feedback' collection using the provided input data.
 *
 * @param Input - The input data required to create a feedback entry.
 * @returns A promise that resolves when the feedback entry has been created.
 */
export async function CreateFeedback(Input: CreateFeedbackInput) {
  const payload = await getPayload({ config })
  payload.create({
    collection: 'feedback',
    data: Input,
  })
}
