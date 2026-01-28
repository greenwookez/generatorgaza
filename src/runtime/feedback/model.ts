import { Feedback } from '@/payload-types'

export type CreateFeedbackInput = Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>
export const CreateFeedbackOutputOK = 0
export const CreateFeedbackOutputTooManyRequests = 429
export const CreateFeedbackOutputInvalidParams = 400
