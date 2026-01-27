import { initPayload } from '@/lib/initPayload'
import { NextRequest, NextResponse } from 'next/server'
import { CollectionSlug } from 'payload'

type QueryStats = {
  times: string[]
  min: string
  max: string
  average: string
}

const measureCollection = async (
  payload: Awaited<ReturnType<typeof initPayload>>,
  collection: CollectionSlug,
  iterations: number,
): Promise<QueryStats> => {
  const durations: number[] = []

  for (let i = 0; i < iterations; i += 1) {
    const start = Date.now()
    await payload.find({ collection, pagination: false })
    durations.push(Date.now() - start)
  }

  const min = Math.min(...durations)
  const max = Math.max(...durations)
  const average = durations.reduce((sum, time) => sum + time, 0) / durations.length

  return {
    times: durations.map((time) => `${time} ms`),
    min: `${min} ms`,
    max: `${max} ms`,
    average: `${average} ms`,
  }
}

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const iterations = Number(searchParams.get('iterations')) || 5

  const payload = await initPayload()

  const targets = [
    { collection: 'users', key: 'users' },
    { collection: 'media', key: 'media' },
    { collection: 'catalog-categories', key: 'catalog_categories' },
    { collection: 'catalog-items', key: 'catalog_items' },
    { collection: 'feedback', key: 'feedback' },
  ] as const

  const results = {} as Record<(typeof targets)[number]['key'], QueryStats>

  const now = Date.now()
  for (const { collection, key } of targets) {
    results[key] = await measureCollection(payload, collection, iterations)
  }

  return NextResponse.json(
    { status: 'OK', results, total_execution_time: `${Date.now() - now} ms` },
    { status: 200 },
  )
}
