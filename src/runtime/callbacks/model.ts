import { Callback } from '@/payload-types'

export type CreateCallbackInput = Omit<Callback, 'id' | 'createdAt' | 'updatedAt'>
export const CreateCallbackOutputOK = 0
export const CreateCallbackOutputTooManyRequests = 429
export const CreateCallbackOutputInvalidParams = 400
