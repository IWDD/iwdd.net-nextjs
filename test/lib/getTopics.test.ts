import { describe, expect, it, vi } from 'vitest'

import { getTopicsFromEvents, shuffle } from '@/lib/getTopics'
import type { DataEvent } from '@/types/DataEvents'

describe('shuffle', () => {
  it('元の配列と同じ要素を含む', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffle(input)

    expect(result).toHaveLength(input.length)
    expect(result.sort()).toEqual(input.sort())
  })

  it('元の配列を変更しない', () => {
    const input = [1, 2, 3, 4, 5]
    const original = [...input]
    shuffle(input)

    expect(input).toEqual(original)
  })

  it('空配列は空配列を返す', () => {
    expect(shuffle([])).toEqual([])
  })

  it('1要素の配列は同じ配列を返す', () => {
    expect(shuffle([1])).toEqual([1])
  })
})

describe('getTopicsFromEvents', () => {
  const createEvent = (
    start_at: string,
    topics: string[],
    cancelled = false,
  ): DataEvent => ({
    vol: 1,
    event_url: 'https://example.com',
    start_at,
    end_at: start_at,
    place: 'Test Place',
    price: { general: 500, student: 0 },
    hash_tags: ['test'],
    topics,
    cancelled,
  })

  it('「募集中」を除外する', () => {
    const events = [
      createEvent('2024-01-01T00:00:00.000Z', ['Topic1', '募集中', 'Topic2']),
    ]

    const result = getTopicsFromEvents(events)

    expect(result).not.toContain('募集中')
    expect(result).toContain('Topic1')
    expect(result).toContain('Topic2')
  })

  it('重複するtopicをユニーク化する', () => {
    const events = [
      createEvent('2024-02-01T00:00:00.000Z', ['Topic1', 'Topic2']),
      createEvent('2024-01-01T00:00:00.000Z', ['Topic2', 'Topic3']),
    ]

    const result = getTopicsFromEvents(events)
    const topic2Count = result.filter((t) => t === 'Topic2').length

    expect(topic2Count).toBe(1)
  })

  it('新しいイベントのtopicsが先に表示される', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    const events = [
      createEvent('2024-01-01T00:00:00.000Z', ['OldTopic']),
      createEvent('2024-03-01T00:00:00.000Z', ['NewTopic']),
    ]

    const result = getTopicsFromEvents(events)

    expect(result.indexOf('NewTopic')).toBeLessThan(result.indexOf('OldTopic'))

    vi.restoreAllMocks()
  })

  it('start_atがないイベントを除外する', () => {
    const events = [
      createEvent('2024-01-01T00:00:00.000Z', ['ValidTopic']),
      { ...createEvent('', ['InvalidTopic']), start_at: '' },
    ]

    const result = getTopicsFromEvents(events)

    expect(result).toContain('ValidTopic')
    expect(result).not.toContain('InvalidTopic')
  })

  it('空のイベント配列は空配列を返す', () => {
    expect(getTopicsFromEvents([])).toEqual([])
  })

  it('topicsが空のイベントをスキップする', () => {
    const events = [
      createEvent('2024-01-01T00:00:00.000Z', []),
      createEvent('2024-02-01T00:00:00.000Z', ['Topic1']),
    ]

    const result = getTopicsFromEvents(events)

    expect(result).toEqual(['Topic1'])
  })
})
